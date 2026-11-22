<script setup>
import { ref } from 'vue'
import Modal from './Modal.vue'
import {useRoute} from 'vue-router'
import {motion} from 'motion-v'

const open = ref(false)
const route = useRoute()

const links = [
  { to: '/', label: 'Home', icon: 'bi-house' },
  { to: '/products', label: 'AI Plans', icon: 'bi-stars' },
  { to: '/about', label: 'My Orders', icon: 'bi-bag-check'},
  { to: '/profile', label: 'Help & Warranty', icon: 'bi-shield-check'},
]
</script>

<template>
  <aside class="w-64 h-screen z-50 border-line border-r-[1px] bg-background-2">
    <div class="flex px-4 items-center h-14 w-64 border-line border-b-[1px]">

    </div>
    <nav class="p-4">
      <ul class="flex flex-col gap-4 text-primary font-sans">
        <motion.li v-for="(link, index) in links" :key="link.to" :initial="{ opacity: 0, y: -10 }" :animate="{ opacity: 1, y: 0 }" :transition="{ duration: 0.7, delay: index * 0.1 }">
          <motion.div class="relative" :whileHover="{ scale: 1.05 }" :whilePress="{ scale: 0.95 }" :transition="{ type: 'spring', stiffness: 400, damping: 20 }">
            <RouterLink :to="link.to" class="relative z-10 block py-1.5 px-3" :class="route.path === link.to ? 'text-background' : 'text-primary'">
              <i class="bi" :class="link.icon"></i>
              {{ link.label }}
            </RouterLink>
            <motion.div v-if="route.path === link.to" layout-id="active-pill" class="absolute inset-0 rounded-full bg-btn" :transition="{ type: 'spring', stiffness: 400, damping: 30 }"/>
          </motion.div>
        </motion.li>
      </ul>
    </nav>

    <div class="flex px-4 items-center h-16 w-64 border-line border-t-[1px] fixed bottom-0 left-0">
      <motion.button :initial="{ opacity: 0, y: -10 }" :animate="{ opacity: 1, y: 0 }" :transition="{ duration: 0.7, delay: index * 0.1 }" class="flex w-full rounded-full transform-gpu hover:scale-105 transition ease-in-out duration-300 hover:bg-hover cursor-pointer px-3 py-2 items-center gap-2" @click="open = true">
        <i class="bi bi-gear-wide-connected text-xl leading-none text-primary"></i>
        <span class="text-primary">Setting</span>
      </motion.button>
    </div>
  </aside>

  <Modal :open="open" @close="open = false"></Modal>
</template>