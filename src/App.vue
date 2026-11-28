<script setup>
import { useRoute } from 'vue-router'
import Header from './components/Header.vue'
import Sidebar from './components/Sidebar.vue'
import Footer from './components/Footer.vue'
import { useSidebar } from './composables/useSidebar.js'

const route = useRoute()
const { collapsed} = useSidebar()
</script>

<template>
  <!-- Sign in / sign up pages: no header, sidebar or footer -->
  <RouterView v-if="route.meta.guest" />

  <template v-else>
    <Header/>
    <div class="flex min-h-screen">
      <Sidebar/>
      <div class="flex pt-14 flex-col flex-1 transition-[padding] duration-300" :class="collapsed ? 'pl-0' : 'pl-64' ">
        <main class="flex flex-1 flex-col">
          <RouterView />
        </main>
        <Footer/>
      </div>
    </div>
  </template>
</template>