<script setup>
const draft = defineModel({ type: String, required: true });

defineProps({
  busy: { type: Boolean, default: false },
  hasFailure: { type: Boolean, default: false },
});

const emit = defineEmits(['send', 'retry']);
</script>

<template>
  <form class="composer" @submit.prevent="emit('send')">
    <label for="b07-draft">要问的话</label>
    <input id="b07-draft" v-model="draft" autocomplete="off" placeholder="把这三条工作记录整理成周报">
    <button type="submit" :disabled="!draft.trim() || busy || hasFailure">发送</button>
    <button v-if="hasFailure" type="button" :disabled="busy" @click="emit('retry')">重试</button>
  </form>
</template>
