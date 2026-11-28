<script setup>
import { ref } from 'vue'
import Modal from './Modal.vue'
import {useRoute} from 'vue-router'
import {motion} from 'motion-v'
import logo from '../assets/romduol.png'
import {useSidebar} from '../composables/useSidebar.js'

const open = ref(false)
const { collapsed, toggle } = useSidebar()
const route = useRoute()

const links = [
  { to: '/', label: 'Home', icon: 'bi-house' },
  { to: '/AI_Plans', label: 'AI Plans', icon: 'bi-stars' },
  { to: '/My_Orders', label: 'My Orders', icon: 'bi-bag-check'},
  { to: '/HelpWarranty', label: 'Help & Warranty', icon: 'bi-shield-check'},
]
</script>

<template>
  <aside
    class="fixed top-0 left-0 flex flex-col h-screen z-50 border-line border-r-[1px] bg-background-2 transition-[width] duration-300"
    :class="collapsed ? 'w-0 overflow-hidden' : 'w-64'"
  >
    <div class="flex gap-3 items-center h-14 border-b border-line px-8">
      <button @click="toggle" class="fixed left-4 cursor-pointer">
        <i class="bi text-primary text-lg" :class="collapsed ? 'bi-layout-sidebar-inset' : 'bi-layout-sidebar-inset-reverse'"></i>
      </button>
      <RouterLink to="/" v-show="!collapsed">
        <img :src="logo" alt="logo" class="w-40 h-auto object-contain">
      </RouterLink>
    </div>
    <nav class="p-2 mt-2 flex-1">
      <ul class="flex flex-col gap-2 text-primary font-sans">
        <motion.li v-for="(link, index) in links" :key="link.to" :initial="{ opacity: 0, y: -10 }" :animate="{ opacity: 1, y: 0 }" :transition="{ duration: 0.7, delay: index * 0.1 }">
          <motion.div class="relative" :whileHover="{ scale: 1.05 }" :whilePress="{ scale: 0.95 }" :transition="{ type: 'spring', stiffness: 400, damping: 20 }">
            <RouterLink :to="link.to" class="relative z-10 flex items-center gap-3 py-1.5 px-3 rounded-full" :class="route.path === link.to ? 'text-background' : 'text-primary'">
              <i class="bi flex-shrink-0" :class="link.icon"></i>
              <span v-show="!collapsed" class="whitespace-nowrap">{{ link.label }}</span>
            </RouterLink>
            <motion.div v-if="route.path === link.to" layout-id="active-pill" class="absolute inset-0 rounded-full bg-btn" :transition="{ type: 'spring', stiffness: 400, damping: 30 }"/>
          </motion.div>
        </motion.li>
      </ul>
    </nav>

    <div class="flex px-2 items-center h-16 border-line border-t-[1px]">
      <motion.button :initial="{ opacity: 0, y: -10 }" :animate="{ opacity: 1, y: 0 }" :transition="{ duration: 0.7, delay: 0.4 }" class="flex w-full rounded-full transform-gpu hover:scale-105 transition ease-in-out duration-300 hover:bg-hover cursor-pointer px-3 py-2 items-center gap-2" @click="open = true">
        <i class="bi bi-gear text-xl leading-none text-primary flex-shrink-0"></i>
        <span v-show="!collapsed" class="text-primary whitespace-nowrap">Settings</span>
      </motion.button>
    </div>
  </aside>

  <Modal :open="open" @close="open = false"></Modal>
</template>

