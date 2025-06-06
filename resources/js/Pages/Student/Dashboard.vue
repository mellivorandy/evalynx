<template>
  <div class="p-4">
    <h1 class="text-2xl font-bold mb-4">Welcome, {{ user.name }}</h1>
    <p class="text-gray-600">Check your competition status, deadlines, and announcements.</p>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'

const user = ref({})

onMounted(async () => {
  const response = await axios.get('/api/user')
  user.value = response.data
})
</script>
