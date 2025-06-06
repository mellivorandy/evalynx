<template>
  <div class="p-4">
    <h2 class="text-xl font-semibold mb-4">Your Feedback</h2>
    <div v-if="feedback.length === 0">No feedback available yet.</div>
    <div v-else class="space-y-4">
      <div v-for="f in feedback" :key="f.id" class="p-4 bg-gray-100 rounded">
        <h3 class="font-semibold">{{ f.title }}</h3>
        <p>{{ f.feedback.comment }}</p>
        <p class="text-sm text-gray-500">Score: {{ f.feedback.score }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'

const feedback = ref([])

onMounted(async () => {
  const res = await axios.get('/student/feedback')
  feedback.value = res.data.feedback || []
})
</script>
