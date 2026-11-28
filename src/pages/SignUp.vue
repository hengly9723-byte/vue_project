<script setup>
import { ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useAuth } from '../composables/useAuth.js'

const router = useRouter()
const route = useRoute()
const { signUp } = useAuth()

const name = ref('')
const email = ref('')
const password = ref('')
const error = ref('')
const loading = ref(false)

async function submit() {
  error.value = ''
  loading.value = true
  try {
    await signUp(name.value, email.value, password.value)
    // go back to the page they wanted (only allow paths inside our own site)
    const target = String(route.query.redirect || '/')
    router.push(target.startsWith('/') && !target.startsWith('//') ? target : '/')
  } catch (e) {
    error.value = e.message
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="w-full min-h-screen flex items-center justify-center bg-background-2 px-4">
    <form class="w-full max-w-sm flex flex-col gap-4 rounded-xl border border-line bg-background p-8" @submit.prevent="submit">
      <h1 class="text-2xl font-medium text-primary">Create account</h1>

      <input v-model="name" type="text" placeholder="Name" required
        class="rounded-lg border border-line bg-background px-3 py-2 text-primary outline-none focus:border-primary-2" />
      <input v-model="email" type="email" placeholder="Email" required
        class="rounded-lg border border-line bg-background px-3 py-2 text-primary outline-none focus:border-primary-2" />
      <input v-model="password" type="password" placeholder="Password (min 8 characters)" required minlength="8"
        class="rounded-lg border border-line bg-background px-3 py-2 text-primary outline-none focus:border-primary-2" />

      <p v-if="error" class="text-sm text-red-500">{{ error }}</p>

      <button type="submit" :disabled="loading"
        class="cursor-pointer rounded-full bg-btn py-2 font-medium text-black disabled:opacity-50">
        {{ loading ? 'Creating...' : 'Sign up' }}
      </button>

      <p class="text-sm text-primary-2">
        Already have an account?
        <RouterLink to="/signin" class="text-primary underline">Sign in</RouterLink>
      </p>
    </form>
  </div>
</template>