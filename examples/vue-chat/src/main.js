import { createApp } from 'vue'
import './styles.css'

const entries = import.meta.glob('./lessons/*/App.vue', { import: 'default' })
const requestedLesson = new URLSearchParams(window.location.search).get('lesson') || 'b07'
const loadLesson = entries['./lessons/' + requestedLesson + '/App.vue'] || entries['./lessons/b07/App.vue']

const App = await loadLesson()
createApp(App).mount('#app')
