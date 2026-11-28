<script setup>
defineProps({
  messages: { type: Array, required: true },
});
</script>

<template>
  <ol class="messages" aria-label="会话消息">
    <li v-for="(message, index) in messages" :key="index" class="message">
      <strong>{{ message.role === 'user' ? '你' : '助手' }}</strong>
      <p>{{ message.content }}</p>
    </li>
  </ol>
</template>
