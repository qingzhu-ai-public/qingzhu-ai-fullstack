<script setup>
import { ref } from 'vue';
import ChatInput from './ChatInput.vue';
import MessageList from './MessageList.vue';
import { requestChat } from '../../chat-api.js';

const draft = ref('');
const messages = ref([]);
const isSending = ref(false);
const failedHistory = ref(null);
const simulateFailureOnce = ref(false);
const simulateSlowOnce = ref(false);
const status = ref('输入一句话，试着发送。');
let conversationRevision = 0;

async function sendHistory(history, scenario) {
  const requestRevision = conversationRevision;
  isSending.value = true;
  status.value = '正在等回复…';
  try {
    const { message, requestId } = await requestChat(history, { scenario });
    if (requestRevision !== conversationRevision) return;
    messages.value.push(message);
    failedHistory.value = null;
    status.value = `收到回复 · 请求编号 ${requestId}`;
  } catch {
    if (requestRevision !== conversationRevision) return;
    failedHistory.value = history;
    status.value = '这次没有收到回复，原提问已保留。';
  } finally {
    if (requestRevision === conversationRevision) {
      isSending.value = false;
    }
  }
}

function sendMessage() {
  const content = draft.value.trim();
  if (!content || isSending.value || failedHistory.value) return;

  let scenario;
  if (simulateFailureOnce.value) {
    scenario = 'error';
  } else if (simulateSlowOnce.value) {
    scenario = 'slow';
  }
  simulateFailureOnce.value = false;
  simulateSlowOnce.value = false;
  messages.value.push({ role: 'user', content });
  draft.value = '';
  void sendHistory([...messages.value], scenario);
}

function retryMessage() {
  if (isSending.value || !failedHistory.value) return;
  void sendHistory(failedHistory.value);
}

function startNewChat() {
  conversationRevision += 1;
  messages.value = [];
  draft.value = '';
  failedHistory.value = null;
  isSending.value = false;
  simulateFailureOnce.value = false;
  simulateSlowOnce.value = false;
  status.value = '已开始新对话。';
}
</script>

<template>
  <main class="app-shell">
    <h1>AI 对话助手</h1>
    <p>B07 · 拆出消息列表和输入组件</p>
    <div class="toolbar">
      <label>
        <input v-model="simulateFailureOnce" type="checkbox" :disabled="isSending || !!failedHistory">
        模拟下一次发送失败（仅模拟模式）
      </label>
      <label>
        <input v-model="simulateSlowOnce" type="checkbox" :disabled="isSending || !!failedHistory">
        模拟下一次慢回复（仅模拟模式）
      </label>
      <button type="button" @click="startNewChat">新对话</button>
    </div>
    <MessageList :messages="messages" />
    <ChatInput
      v-model="draft"
      :busy="isSending"
      :has-failure="!!failedHistory"
      @send="sendMessage"
      @retry="retryMessage"
    />
    <p class="status" role="status">{{ status }}</p>
  </main>
</template>
