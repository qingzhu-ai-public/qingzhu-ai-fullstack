<script setup>
import { ref } from 'vue'
import { requestChat } from '../../chat-api.js'

const draft = ref('')
const question = ref('')
const answer = ref('')
const requestId = ref('')
const pending = ref(false)
const error = ref('')

async function send() {
  const content = draft.value.trim()
  if (!content || pending.value) return

  question.value = content
  answer.value = ''
  requestId.value = ''
  error.value = ''
  pending.value = true

  try {
    const result = await requestChat([{ role: 'user', content }])
    answer.value = result.message.content
    requestId.value = result.requestId
    draft.value = ''
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
      <p>输入一句话，查看接口返回的回答。</p>
    </header>

    <div class="messages chat-transcript" :aria-busy="pending" aria-label="对话">
      <p v-if="!question" class="empty-chat">发一条消息开始。</p>
      <article v-if="question" class="message user" data-role="user">
        <strong>你</strong>
        <p>{{ question }}</p>
      </article>
      <article v-if="answer" class="message assistant" data-role="assistant">
        <strong>助手</strong>
        <p>{{ answer }}</p>
      </article>
    </div>

    <form class="composer chat-composer" @submit.prevent="send">
      <label for="b03-draft">你的消息</label>
      <input
        id="b03-draft"
        v-model="draft"
        placeholder="例如，把这三条工作记录整理成周报"
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
