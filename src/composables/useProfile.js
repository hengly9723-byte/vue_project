import { ref, watch } from 'vue'
import defaultProfile from '../data/profile.json'

let saved = null
try {
  saved = JSON.parse(localStorage.getItem('profile'))
} catch (e) {}

const profile = ref(saved || structuredClone(defaultProfile))

watch(profile, (newVal) => {
  try {
    localStorage.setItem('profile', JSON.stringify(newVal))
  } catch (e) {
    console.warn('Could not save profile (image may be too large)')
  }
}, { deep: true })

export function useProfile() {
  return { profile }
}