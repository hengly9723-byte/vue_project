import { computed } from 'vue'
import { useAuth } from './useAuth.js'
import { avatarColor } from '../utils/avatarColor.js'

export function useProfile() {
  const { user } = useAuth()
  const profile = computed(() => {
    if (!user.value) return { name: '', avatar: '', color: '#999' }
    return { ...user.value, color: avatarColor(user.value.email) }
  })
  return { profile }
}