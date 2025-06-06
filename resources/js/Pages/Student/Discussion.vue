<template>
  <div class="p-4">
    <h2 class="text-xl font-semibold mb-4">Discussion Board</h2>
    <form @submit.prevent="postMessage" class="flex items-center space-x-2 mb-4">
      <input v-model="newMessage" placeholder="Write a message..." class="flex-1 input" />
      <button class="btn-primary">Send</button>
    </form>
    <div class="space-y-3">
      <div v-for="msg in messages" :key="msg.id" class="bg-gray-100 p-3 rounded">
        <p class="font-semibold">{{ msg.user.name }}</p>
        <p>{{ msg.message }}</p>
        <p class="text-xs text-gray-500">{{ formatTime(msg.created_at) }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'

const messages = ref([])
const newMessage = ref('')

const fetchMessages = async () => {
  const res = await axios.get('/student/discussion')
  messages.value = res.data.messages || []
}

const postMessage = async () => {
  if (!newMessage.value.trim()) return
  await axios.post('/student/discussion', { message: newMessage.value })
  newMessage.value = ''
  await fetchMessages()
}

const formatTime = (timestamp) => new Date(timestamp).toLocaleString()

onMounted(fetchMessages)
</script>
