<script setup>
  import { useRouter } from 'vue-router'
  import { useProfile} from '../../composables/useProfile.js'
  import { useAuth } from '../../composables/useAuth.js'
  
  const {profile} = useProfile()
  const { user, updateProfile, signOut } = useAuth()
  const router = useRouter()

  async function handleSignOut() {
    await signOut()
    router.push('/signin')
  }

  function onFileChange(event) {
    const file = event.target.files[0]
    if (!file) return

    // only allow PNG, JPEG, WebP
    const allowed = ['image/png', 'image/jpeg', 'image/webp']
    if (!allowed.includes(file.type)) {
      alert('Please choose a PNG, JPEG, or WebP image.')
      return
    }

    // read the file and turn it into a string the <img> can show
    const reader = new FileReader()
    reader.onload = () => {
      updateProfile({ avatar: reader.result }).catch((e) => alert(e.message))
    }
    reader.readAsDataURL(file)

    // lets you pick the same file again later
    event.target.value = ''
  }
</script>

<template>
  <main v-if="user" class="flex flex-col w-full h-full">
    <h2 class="text-lg font-medium text-primary">Profile</h2>
    <div class="flex justify-between w-full h-18 items-center border-b-[1px] border-line">
      <div class="flex flex-col">
        <h2 class="text-primary">Profile Photo</h2>
        <h2 class="text-primary-2">PNG, JPEG, or WebP.</h2>
      </div>

      <div class="flex items-center gap-3">
        <label class="relative cursor-pointer rounded-full border-[1px] border-line group">
          <img v-if="profile.avatar" :src="profile.avatar" :alt="profile.name" class="h-12 w-12 rounded-full border-[1px] border-line">
          <span v-else class="flex h-12 w-12 items-center justify-center rounded-full font-medium text-white" :style="{ backgroundColor: profile.color }">{{ profile.name?.[0]?.toUpperCase() }}</span>

          <input type="file" accept="image/png,image/jpeg,image/webp" class="hidden" @change="onFileChange"/>

          <div class="absolute inset-px flex items-center justify-center rounded-full bg-overlay opacity-0 transition-opacity duration-200 group-hover:opacity-100">
            <i class="bi bi-pencil-fill text-sm text-white"></i>
          </div>
        </label>
      </div>

    </div>

    <div class="flex justify-between w-full h-18 items-center border-b-[1px] border-line">
      <div class="flex flex-col">
        <h2 class="text-primary">{{ profile.name }}</h2>
        <h2 class="text-primary-2">{{ profile.email }}</h2>
      </div>
      <button class="cursor-pointer rounded-full border border-line px-4 py-1.5 text-primary hover:bg-hover" @click="handleSignOut">
        Sign out
      </button>
    </div>
  </main>

  <main v-else class="flex flex-col gap-3 text-primary">
    <h2 class="text-lg font-medium">Profile</h2>
    <p class="text-primary-2">Sign in to manage your profile.</p>
    <RouterLink to="/signin" class="w-fit rounded-full bg-btn px-4 py-1.5 font-medium text-black">Sign in</RouterLink>
  </main>
</template>

<style scoped>
</style>