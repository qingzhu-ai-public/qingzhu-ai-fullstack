export async function requestChat(messages, { signal, scenario } = {}) {
  const headers = { 'Content-Type': 'application/json' }
  if (scenario) headers['X-Demo-Scenario'] = scenario

  const response = await fetch('/api/chat', {
    method: 'POST',
    headers,
    signal,
    body: JSON.stringify({ messages }),
  })

  const data = await response.json().catch(() => null)
  if (!response.ok) {
    const error = new Error(data?.error?.message || '对话接口返回 HTTP ' + response.status)
    error.status = response.status
    error.code = data?.error?.code
    error.requestId = data?.requestId
    throw error
  }

  if (data?.message?.role !== 'assistant' || typeof data.message.content !== 'string' ||
      !data.message.content.trim() || typeof data.requestId !== 'string') {
    throw new Error('对话接口返回的数据格式有误')
  }
  return data
}
