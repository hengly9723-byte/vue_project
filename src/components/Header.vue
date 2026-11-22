<script setup>
import { motion } from 'motion-v'
import { useRoute } from 'vue-router'
import { useProfile } from '../composables/useProfile.js'
import {ref} from 'vue'
import Modal from './Modal.vue'

const open = ref(false)
const route = useRoute()
const { profile } = useProfile()

const links = [
  { to: '/', label: 'Home' },
  { to: '/products', label: 'Products' },
  { to: '/about', label: 'About' },
  { to: '/profile', label: 'Profile' },
]
</script>

<template>
  <header class="fixed top-0 left-0 z-50 flex justify-center items-center h-14 w-full bg-background border-b-[1px] border-line">
    <div class="fixed right-0 z-50 h-16 flex items-center px-4">
      <button class="cursor-pointer relative group w-10 h-10 overflow-hidden rounded-full border-[1.5px] border-line transition-color duration-200" @click="open = true">
        <img v-if="profile.avatar" :src="profile.avatar" :alt="profile.name" class="block h-full w-full object-cover">
        <div class="absolute inset-0 bg-overlay rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>
      </button>
    </div>
  </header>
  <Modal :open="open" @close="open = false"></Modal>
</template>