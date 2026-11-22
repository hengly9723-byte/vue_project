<script setup>
import { useTheme } from '../../composables/useTheme.js'

const { theme } = useTheme()

const options = [
  { id: 'light', label: 'Light' },
  { id: 'dark', label: 'Dark' },
  { id: 'system', label: 'System' },
]
</script>

<template>
  <div>
    <h3 class="text-primary text-lg font-medium mb-4">Appearance</h3>

    <p class="text-primary-2 mb-2">Theme</p>
    <div class="flex gap-2">
      <button
        v-for="option in options"
        :key="option.id"
        class="rounded-lg border border-line px-3 py-1 text-primary hover:bg-hover"
        :class="{ 'bg-hover font-medium': theme === option.id }"
        @click="theme = option.id"
      >
        {{ option.label }}
      </button>
    </div>
  </div>
</template>