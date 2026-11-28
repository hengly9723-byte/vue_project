<script setup>
import { ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useAuth } from '../composables/useAuth.js'

const router = useRouter()
const route = useRoute()
const { signIn } = useAuth()

const email = ref('')
const password = ref('')
const error = ref('')
const loading = ref(false)

async function submit() {
  error.value = ''
  loading.value = true
  try {
    await signIn(email.value, password.value)
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
      <h1 class="text-2xl font-medium text-primary">Sign in</h1>

      <input v-model="email" type="email" placeholder="Email" required
        class="rounded-lg border border-line bg-background px-3 py-2 text-primary outline-none focus:border-primary-2" />
      <input v-model="password" type="password" placeholder="Password" required
        class="rounded-lg border border-line bg-background px-3 py-2 text-primary outline-none focus:border-primary-2" />

      <p v-if="error" class="text-sm text-red-500">{{ error }}</p>

      <button type="submit" :disabled="loading"
        class="cursor-pointer rounded-full bg-btn py-2 font-medium text-black disabled:opacity-50">
        {{ loading ? 'Signing in...' : 'Sign in' }}
      </button>

      <p class="text-sm text-primary-2">
        No account yet?
        <RouterLink to="/signup" class="text-primary underline">Sign up</RouterLink>
      </p>
    </form>
  </div>
</template>