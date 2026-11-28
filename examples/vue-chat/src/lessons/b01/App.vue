<script setup>
const greeting = 'Hello, Vue!'

function logGreeting() {
  console.log(greeting)
}
</script>

<template>
  <main class="hello-page">
    <h1>{{ greeting }}</h1>
    <p>点击按钮，再到浏览器的 Console 查看输出。</p>
    <button type="button" @click="logGreeting">打印问候</button>
  </main>
</template>

<style scoped>
.hello-page {
  box-sizing: border-box;
  width: min(90%, 40rem);
  margin: clamp(2rem, 9vw, 7rem) auto;
  padding: clamp(1.25rem, 4vw, 2.5rem);
  border: 1px solid #e7d9c8;
  border-radius: 1rem;
  background: #fffaf3;
}

h1 {
  margin: 0 0 0.75rem;
  color: #3b281d;
}

p {
  margin: 0 0 1.5rem;
  color: #624e40;
}

button {
  padding: 0.65rem 1.1rem;
  border: 1px solid transparent;
  border-radius: 0.5rem;
  background: #79472e;
  color: #fff;
  font: inherit;
  cursor: pointer;
}
</style>
