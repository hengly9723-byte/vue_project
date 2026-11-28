import { ref } from 'vue'

const user = ref(null)
let loaded = false

async function request(url, method = 'GET', body) {
  const res = await fetch(url, {
    method,
    headers: body ? { 'Content-Type': 'application/json' } : undefined,
    body: body ? JSON.stringify(body) : undefined,
  })
  const data = await res.json().catch(() => ({}))
  if (!res.ok) throw new Error(data.error || 'Something went wrong')
  return data
}

export function useAuth() {
  async function loadUser() {
    if (loaded) return
    try { user.value = await request('/api/auth/me') } catch { user.value = null }
    loaded = true
  }
  async function signUp(name, email, password) {
    user.value = await request('/api/auth/signup', 'POST', { name, email, password })
  }
  async function signIn(email, password) {
    user.value = await request('/api/auth/signin', 'POST', { email, password })
  }
  async function signOut() {
    await request('/api/auth/signout', 'POST')
    user.value = null
  }
  async function updateProfile(changes) {
    user.value = await request('/api/profile', 'PUT', changes)
  }
  return { user, loadUser, signUp, signIn, signOut, updateProfile }
}