<script setup>
  defineProps({modelValue: String})
  const emit = defineEmits(['update:modelValue'])

  const tabs = [
    {id: 'account', label:  'Account', icon: 'bi-person'},
    {id: 'appearance', label: 'Appearance', icon: 'bi-palette'},
  ]
</script>

<template>
  <aside class="flex flex-col gap-2 h-full w-[200px] border-r-[1px] border-line p-2 bg-background-2">
    <button v-for="tab in tabs" :key="tab.id" class="text-primary w-full rounded-lg px-3 py-2 text-left hover:bg-hover" :class="{ 'bg-hover font-medium': modelValue === tab.id }"
      @click="emit('update:modelValue', tab.id)">
      <i class="bi" :class="tab.icon"></i>
      {{ tab.label }}
    </button>
  </aside>
</template>

<style scoped>
</style>