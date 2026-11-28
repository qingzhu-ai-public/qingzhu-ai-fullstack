import { createServer } from 'node:http'
import { randomUUID } from 'node:crypto'
import { setTimeout as wait } from 'node:timers/promises'

const mode = process.env.CHAT_MODE || 'mock'
const host = '127.0.0.1'
const port = Number(process.env.CHAT_PORT || 8787)
const maxBodyBytes = 128 * 1024

const modelName = process.env.MODEL_NAME
const modelKey = process.env.MODEL_API_KEY
const modelBaseUrl = process.env.MODEL_BASE_URL
let modelEndpoint

if (!['mock', 'real'].includes(mode)) throw new Error('CHAT_MODE 只能是 mock 或 real')
if (mode === 'real') {
  if (!modelName || !modelKey || !modelBaseUrl) {
    throw new Error('real 模式需要 MODEL_BASE_URL、MODEL_API_KEY 和 MODEL_NAME')
  }
  const base = new URL(modelBaseUrl)
  if (!['http:', 'https:'].includes(base.protocol) || base.username || base.password || base.search || base.hash) {
    throw new Error('MODEL_BASE_URL 必须是服务商的 HTTP(S) API 基础地址')
  }
  modelEndpoint = new URL('chat/completions', base.href.replace(/\/?$/, '/'))
}

class ChatError extends Error {
  constructor(status, code, message) {
    super(message)
    this.status = status
    this.code = code
  }
}

async function readMessages(request) {
  let bytes = 0
  const chunks = []
  for await (const chunk of request) {
    bytes += chunk.length
    if (bytes <= maxBodyBytes) chunks.push(chunk)
  }
  if (bytes > maxBodyBytes) throw new ChatError(413, 'BODY_TOO_LARGE', '对话太长，请新建对话再试。')

  let data
  try {
    data = JSON.parse(Buffer.concat(chunks).toString('utf8'))
  } catch {
    throw new ChatError(400, 'INVALID_JSON', '请求体需要是 JSON。')
  }

  const messages = data?.messages
  if (!Array.isArray(messages) || !messages.length || messages.length > 99 || messages.length % 2 === 0) {
    throw new ChatError(400, 'INVALID_MESSAGES', '请提供已完成的对话和本轮用户消息。')
  }
  return messages.map((message, index) => {
    const role = index % 2 === 0 ? 'user' : 'assistant'
    if (message?.role !== role || typeof message.content !== 'string' ||
        !message.content.trim() || message.content.length > 8000) {
      throw new ChatError(400, 'INVALID_MESSAGE', '消息需要按用户、助手交替排列，且有有效文本。')
    }
    return { role, content: message.content }
  })
}

async function mockReply(messages, scenario) {
  await wait(scenario === 'slow' ? 1800 : 350)
  if (scenario === 'error') {
    throw new ChatError(502, 'MOCK_UPSTREAM_ERROR', '模拟上游暂时不可用，请重试。')
  }

  const latest = messages.at(-1).content
  if (latest.includes('第二点')) {
    const previousReply = messages.at(-2)
    const secondLine = previousReply?.content.split('\n').find(line => /^\s*2[.．、]/.test(line))
    return secondLine
      ? '【模拟】上一条回复的第二点是「' + secondLine.replace(/^\s*2[.．、]\s*/, '') +
        '」。可缩成「列表样式已修复」。本次收到 ' + messages.length + ' 条消息。'
      : '【模拟】这次请求没有带来上一条清单，请先发周报的三条工作记录。'
  }
  if (latest.includes('周报')) {
    return '【模拟周报】\n1. 完成消息页面\n2. 修复列表样式问题\n3. 验证接口'
  }
  return '【模拟】收到「' + latest + '」。本次收到 ' + messages.length + ' 条消息。'
}

async function realReply(messages) {
  let response
  try {
    response = await fetch(modelEndpoint, {
      method: 'POST',
      headers: { Authorization: 'Bearer ' + modelKey, 'Content-Type': 'application/json' },
      body: JSON.stringify({ model: modelName, messages, stream: false }),
      signal: AbortSignal.timeout(30_000),
    })
  } catch (error) {
    if (error?.name === 'TimeoutError') throw new ChatError(504, 'UPSTREAM_TIMEOUT', '模型响应超时，请重试。')
    throw new ChatError(502, 'UPSTREAM_UNAVAILABLE', '暂时无法连接模型服务，请检查后端配置。')
  }

  if (response.status === 429) {
    await response.body?.cancel()
    throw new ChatError(429, 'UPSTREAM_RATE_LIMIT', '模型服务暂时限流，请稍后再试。')
  }
  if (!response.ok) {
    await response.body?.cancel()
    throw new ChatError(502, 'UPSTREAM_ERROR', '模型服务未完成请求，请核对模型与凭据配置。')
  }
  const payload = await response.json().catch(() => null)
  const content = payload?.choices?.[0]?.message?.content
  if (typeof content !== 'string' || !content.trim()) {
    throw new ChatError(502, 'INVALID_UPSTREAM_REPLY', '模型服务没有返回可读的文本回复。')
  }
  return content
}

function send(response, status, data) {
  response.writeHead(status, {
    'Content-Type': 'application/json; charset=utf-8',
    'Cache-Control': 'no-store',
    'X-Course-Mode': mode,
  })
  response.end(JSON.stringify(data))
}

const server = createServer(async (request, response) => {
  const requestId = randomUUID()
  const startedAt = Date.now()
  let status = 200
  let code = 'OK'
  try {
    if (request.url !== '/api/chat') throw new ChatError(404, 'NOT_FOUND', '接口不存在。')
    if (request.method !== 'POST') throw new ChatError(405, 'METHOD_NOT_ALLOWED', '请用 POST 发送消息。')
    const messages = await readMessages(request)
    const scenario = request.headers['x-demo-scenario']
    const content = mode === 'mock' ? await mockReply(messages, scenario) : await realReply(messages)
    send(response, status, { message: { role: 'assistant', content }, requestId })
  } catch (error) {
    const failure = error instanceof ChatError
      ? error
      : new ChatError(500, 'SERVER_ERROR', '课程接口发生错误，请查看服务端终端。')
    status = failure.status
    code = failure.code
    if (!response.destroyed) send(response, status, { error: { code, message: failure.message }, requestId })
  } finally {
    console.log(JSON.stringify({ requestId, status, code, mode, durationMs: Date.now() - startedAt }))
  }
})

server.listen(port, host, () => {
  console.log('课程接口 http://' + host + ':' + port + ' · ' + mode)
})
