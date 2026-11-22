import { ref, watch } from 'vue'

const theme = ref(localStorage.getItem('theme') || 'system') // 'light' | 'dark' | 'system'
const media = window.matchMedia('(prefers-color-scheme: dark)')

function apply() {
  const dark = theme.value === 'dark' || (theme.value === 'system' && media.matches)
  document.documentElement.classList.toggle('dark', dark)
}

watch(theme, (value) => {
  localStorage.setItem('theme', value)
  apply()
}, { immediate: true })

media.addEventListener('change', apply) // follow the OS when set to 'system'

export function useTheme() {
  return { theme }
}