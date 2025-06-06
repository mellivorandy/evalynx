<template>
  <div class="p-4">
    <h2 class="text-xl font-semibold mb-4">Submit Your Project</h2>
    <form @submit.prevent="submitForm" class="space-y-4">
      <input v-model="title" type="text" placeholder="Project Title" class="input" required />
      <input ref="fileInput" type="file" class="input" required />
      <button class="btn-primary">Upload</button>
      <p v-if="message" class="text-green-600 mt-2">{{ message }}</p>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import axios from 'axios'

const title = ref('')
const fileInput = ref(null)
const message = ref('')

const submitForm = async () => {
  const formData = new FormData()
  formData.append('title', title.value)
  formData.append('file', fileInput.value.files[0])

  const res = await axios.post('/student/submission', formData)
  message.value = res.data.message || 'Uploaded successfully.'
}
</script>
