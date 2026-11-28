<script setup>
import { computed, ref } from 'vue'

const draft = ref('')
const messages = ref([])
const canSend = computed(() => draft.value.trim().length > 0)
let nextMessageId = 1

function sendMessage() {
  const content = draft.value.trim()
  if (!content) return

  messages.value.push({
    id: nextMessageId,
    role: 'user',
    content,
  })
  nextMessageId += 1
  draft.value = ''
}
</script>

<template>
  <main class="chat-page">
    <header>
      <h1>青竹对话助手</h1>
      <p>本地练习。你发出的消息会留在当前页面。</p>
    </header>

    <section class="transcript" aria-label="对话消息" aria-live="polite">
      <p v-if="messages.length === 0" class="empty">发一条消息试试。</p>
      <ol v-else class="messages">
        <li v-for="message in messages" :key="message.id" class="message">
          <span class="message-role">{{ message.role === 'user' ? '我' : '助手' }}</span>
          <p>{{ message.content }}</p>
        </li>
      </ol>
    </section>

    <form class="composer" @submit.prevent="sendMessage">
      <label for="b02-draft">消息内容</label>
      <input id="b02-draft" v-model="draft" type="text" autocomplete="off" />
      <button type="submit" :disabled="!canSend">发送</button>
    </form>
  </main>
</template>

<style scoped>
.chat-page {
  width: min(92%, 42rem);
  margin: clamp(1rem, 6vw, 4rem) auto;
  overflow: hidden;
  border: 1px solid #e7d9c8;
  border-radius: 1rem;
  background: #fffaf3;
  color: #3b281d;
}

header,
.transcript,
.composer {
  padding: 1.1rem clamp(1rem, 4vw, 1.75rem);
}

h1 {
  margin: 0 0 0.4rem;
  font-size: clamp(1.5rem, 4vw, 2rem);
}

header p,
.empty {
  margin: 0;
  color: #624e40;
}

.transcript {
  min-height: 11rem;
  background: #f8f1e7;
}

.messages {
  display: grid;
  justify-items: end;
  gap: 0.85rem;
  margin: 0;
  padding: 0;
  list-style: none;
}

.message {
  box-sizing: border-box;
  width: fit-content;
  max-width: 100%;
  padding: 0.65rem 0.95rem;
  border: 1px solid #ebd6c0;
  border-radius: 0.75rem;
  background: #f4e4d2;
}

.message-role {
  color: #624e40;
  font-size: 0.82rem;
  font-weight: 600;
}

.message p {
  margin: 0.25rem 0 0;
  overflow-wrap: anywhere;
  white-space: pre-wrap;
}

.composer {
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto;
  align-items: end;
  gap: 0.5rem 0.65rem;
}

label {
  grid-column: 1 / -1;
  font-weight: 650;
}

input,
button {
  min-height: 2.6rem;
  padding: 0.55rem 0.8rem;
  border: 1px solid #90735f;
  border-radius: 0.5rem;
  font: inherit;
}

input {
  min-width: 0;
  background: #fff;
  color: inherit;
}

button {
  background: #79472e;
  color: #fff;
  cursor: pointer;
}

button:disabled {
  background: #f6ede0;
  color: #635447;
  cursor: default;
}
</style>
