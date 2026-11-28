<script setup>
import { ref } from 'vue';
import { requestChat } from '../../chat-api.js';

const draft = ref('');
const messages = ref([]);
const isSending = ref(false);
const failedHistory = ref(null);
const simulateFailureOnce = ref(false);
const status = ref('输入一句话，试着发送。');

async function sendHistory(history, scenario) {
  isSending.value = true;
  status.value = '正在等回复…';
  try {
    const { message, requestId } = await requestChat(history, { scenario });
    messages.value.push(message);
    failedHistory.value = null;
    status.value = `收到回复 · 请求编号 ${requestId}`;
  } catch {
    failedHistory.value = history;
    status.value = '这次没有收到回复，原提问已保留。';
  } finally {
    isSending.value = false;
  }
}

function sendMessage() {
  const content = draft.value.trim();
  if (!content || isSending.value || failedHistory.value) return;

  const scenario = simulateFailureOnce.value ? 'error' : undefined;
  simulateFailureOnce.value = false;
  messages.value.push({ role: 'user', content });
  draft.value = '';
  void sendHistory([...messages.value], scenario);
}

function retryMessage() {
  if (isSending.value || !failedHistory.value) return;
  void sendHistory(failedHistory.value);
}
</script>

<template>
  <main class="app-shell">
    <h1>AI 对话助手</h1>
    <p>B05 · 请求失败后重试</p>
    <div class="toolbar">
      <label>
        <input v-model="simulateFailureOnce" type="checkbox" :disabled="isSending || !!failedHistory">
        模拟下一次发送失败（仅模拟模式）
      </label>
    </div>
    <ol class="messages" aria-label="会话消息">
      <li v-for="(message, index) in messages" :key="index" class="message">
        <strong>{{ message.role === 'user' ? '你' : '助手' }}</strong>
        <p>{{ message.content }}</p>
      </li>
    </ol>
    <form class="composer" @submit.prevent="sendMessage">
      <label for="b05-draft">要问的话</label>
      <input id="b05-draft" v-model="draft" autocomplete="off" placeholder="把这三条工作记录整理成周报">
      <button type="submit" :disabled="!draft.trim() || isSending || !!failedHistory">发送</button>
      <button v-if="failedHistory" type="button" :disabled="isSending" @click="retryMessage">重试</button>
    </form>
    <p class="status" role="status">{{ status }}</p>
  </main>
</template>
