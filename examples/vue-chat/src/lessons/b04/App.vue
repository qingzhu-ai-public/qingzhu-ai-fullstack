<script setup>
import { ref } from 'vue'
import { requestChat } from '../../chat-api.js'

const draft = ref('')
const turns = ref([])
const currentQuestion = ref('')
const requestId = ref('')
const pending = ref(false)
const error = ref('')
let nextTurnId = 1

async function send() {
  const content = draft.value.trim()
  if (!content || pending.value) return

  const user = { role: 'user', content }
  const messages = turns.value.flatMap(({ user, assistant }) => [user, assistant])
  messages.push(user)

  currentQuestion.value = content
  error.value = ''
  requestId.value = ''
  pending.value = true

  try {
    const result = await requestChat(messages)
    const assistant = { role: 'assistant', content: result.message.content }

    turns.value.push({ id: nextTurnId++, user, assistant })
    currentQuestion.value = ''
    draft.value = ''
    requestId.value = result.requestId
  } catch (cause) {
    error.value = cause.message
    requestId.value = cause.requestId || ''
  } finally {
    pending.value = false
  }
}
</script>

<template>
  <section class="app-shell">
    <header>
      <h1>AI 对话助手</h1>
      <p>发完第一句，再追问刚才提到的内容。</p>
    </header>

    <div class="messages chat-transcript" :aria-busy="pending" aria-label="对话">
      <p v-if="!turns.length && !currentQuestion" class="empty-chat">发一条消息开始。</p>
      <template v-for="turn in turns" :key="turn.id">
        <article class="message user" data-role="user">
          <strong>你</strong>
          <p>{{ turn.user.content }}</p>
        </article>
        <article class="message assistant" data-role="assistant">
          <strong>助手</strong>
          <p>{{ turn.assistant.content }}</p>
        </article>
      </template>
      <article v-if="currentQuestion" class="message user" data-role="user">
        <strong>你</strong>
        <p>{{ currentQuestion }}</p>
      </article>
    </div>

    <form class="composer chat-composer" @submit.prevent="send">
      <label for="b04-draft">你的消息</label>
      <input
        id="b04-draft"
        v-model="draft"
        placeholder="例如，把第二点写短一点"
        autocomplete="off"
        :disabled="pending"
      >
      <button type="submit" :disabled="pending || !draft.trim()">发送</button>
    </form>

    <p v-if="error" class="status request-error" role="alert">{{ error }}</p>
    <p v-else-if="pending" class="status" role="status">正在等待回复…</p>
    <p v-if="requestId" class="status request-id">请求编号 <code>{{ requestId }}</code></p>
  </section>
</template>

<style scoped>
.chat-transcript {
  display: grid;
  align-content: start;
  gap: 12px;
  min-height: 10rem;
}

.empty-chat {
  margin: 0;
  color: #665a4d;
}

.message {
  width: fit-content;
  max-width: min(90%, 48rem);
  overflow-wrap: anywhere;
}

.message p {
  margin: 0.4rem 0 0;
  white-space: pre-wrap;
}

.message.user {
  justify-self: end;
  background: #f1e1cc;
}

.message.assistant {
  justify-self: start;
  background: #fffaf0;
}

.chat-composer {
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto;
}

.chat-composer label {
  grid-column: 1 / -1;
  font-weight: 600;
}

.chat-composer input {
  min-width: 0;
}

.request-error {
  color: #8c2825;
}

.request-id {
  overflow-wrap: anywhere;
}
</style>
