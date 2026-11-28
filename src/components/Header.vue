<script setup>
import { useProfile } from '../composables/useProfile.js'
import { useAuth } from '../composables/useAuth.js'
import { ref } from 'vue'
import Modal from './Modal.vue'

const open = ref(false)
const { profile } = useProfile()
const { user } = useAuth()
</script>

<template>
  <header class="fixed top-0 left-0 z-50 flex justify-center items-center h-14 w-full bg-background border-b-[1px] border-line">
    <div class="fixed right-0 z-50 h-16 flex items-center gap-2 px-4">
      <!-- signed in: avatar button -->
      <button v-if="user" class="cursor-pointer relative group w-10 h-10 overflow-hidden rounded-full border-[1.5px] border-line transition-color duration-200" @click="open = true">
        <img v-if="profile.avatar" :src="profile.avatar" :alt="profile.name" class="block h-full w-full object-cover">
        <span v-else class="flex h-full w-full items-center justify-center font-medium text-white" :style="{ backgroundColor: profile.color }">{{ profile.name?.[0]?.toUpperCase() }}</span>
        <div class="absolute inset-0 bg-overlay rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>
      </button>

      <!-- signed out: two buttons -->
      <template v-else>
        <RouterLink to="/signin" class="rounded-full px-4 py-1.5 text-primary hover:bg-hover">Sign in</RouterLink>
        <RouterLink to="/signup" class="rounded-full bg-btn px-4 py-1.5 font-medium text-black">Sign up</RouterLink>
      </template>
    </div>
  </header>
  <Modal :open="open" @close="open = false"></Modal>
</template>