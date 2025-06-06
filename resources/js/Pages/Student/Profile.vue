<template>
  <div class="p-4 max-w-md">
    <h2 class="text-xl font-semibold mb-4">Edit Profile</h2>
    <form @submit.prevent="updateProfile" class="space-y-4">
      <input v-model="form.name" type="text" placeholder="Name" class="input" required />
      <input v-model="form.email" type="email" placeholder="Email" class="input" required />
      <input v-model="form.phone" type="text" placeholder="Phone (optional)" class="input" />
      <button class="btn-primary">Save Changes</button>
      <p v-if="message" class="text-green-600 mt-2">{{ message }}</p>
    </form>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'

const form = ref({ name: '', email: '', phone: '' })
const message = ref('')

onMounted(async () => {
  const res = await axios.get('/api/user')
  form.value = res.data
})

const updateProfile = async () => {
  const res = await axios.post('/student/profile', form.value)
  message.value = res.data.message || 'Profile updated.'
}
</script>
