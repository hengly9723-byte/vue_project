<script setup>
import Header from './components/Header.vue'
import Sidebar from './components/Sidebar.vue'
import Footer from './components/Footer.vue'
</script>

<template>
  <Header/>
  <div class="flex">
    <Sidebar/>
    <main class="w-full h-screen">
      <RouterView />
    </main>
  </div>
  <Footer/>
</template>