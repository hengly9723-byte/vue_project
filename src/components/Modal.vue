<script setup>
import { ref, watch } from 'vue'
import SettingsSidebar from './settings/SettingsSidebar.vue'
import AccountSettings from './settings/AccountSettings.vue'
import AppearanceSettings from './settings/AppearanceSettings.vue'

const props = defineProps({
  open: Boolean,
})

const emit = defineEmits(['close'])

const pages = {
  account: AccountSettings,
  appearance: AppearanceSettings,
}

const currentTab = ref('account')

watch(() => props.open, (isOpen) => {
  if (isOpen) currentTab.value = 'account'
})
</script>

<template>
  <Teleport to="body">
    <Transition
      enter-active-class="transition-opacity duration-[250ms] ease-[cubic-bezier(0.16,1,0.3,1)] [&>div]:transition-all [&>div]:duration-[250ms] [&>div]:ease-[cubic-bezier(0.16,1,0.3,1)]"
      leave-active-class="transition-opacity duration-150 ease-in [&>div]:transition-all [&>div]:duration-150 [&>div]:ease-in"
      enter-from-class="opacity-0 [&>div]:scale-95 [&>div]:translate-y-2"
      leave-to-class="opacity-0 [&>div]:scale-95 [&>div]:translate-y-2">
      <div v-if="open" class="fixed inset-0 z-[100] flex items-center justify-center bg-black/50" @click.self="emit('close')">
        <div class="relative w-[1000px] h-[700px] pl-[200px] max-h-[90%] max-w-[90%] overflow-hidden rounded-xl bg-background">
          <div class="absolute left-0 top-0 z-40 flex h-14 w-full items-center justify-between border-b-[1px] border-line bg-background px-4">
            <h2 class="text-primary text-lg font-medium">Setting</h2>
            <button class="h-8 w-8 flex justify-center items-center rounded-full hover:bg-hover " @click="emit('close')"><i class="bi bi-x text-2xl text-primary"></i></button>
          </div>
          
          <div class="absolute left-0 top-14 bottom-0 flex w-full">
            <SettingsSidebar v-model="currentTab"/>
            <div class="flex-1 overflow-y-auto p-5">
              <component :is="pages[currentTab]" />
              <slot />
            </div>
          </div>

        </div>
      </div>
    </Transition>
  </Teleport>
</template>