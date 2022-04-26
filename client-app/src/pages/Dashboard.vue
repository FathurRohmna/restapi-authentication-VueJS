<template>
  <div class="bg-white relative w-full block px-6">
    <div class="relative z-1 mt-10 py-20 px-6 sm:py-6 md:pb-20 mx-auto md:w-11/12 lg:max-w-7xl">
      <div class="text-gray-100 flex w-full relative items-center">
        <div class="flex-1">
          <h1 class="text-gray-800">Welcome to dashboard Private Router</h1>

          <button @click="logout" class="text-white font-bold px-3 py-2 rounded outline-none focus:outline-none mr-1 mb-1 bg-yellow-700 active:bg-yellow-500 text-sm shadow hover:shadow-lg ease-linear transition-all duration-150">
            Logout
          </button>
          <router-link class="text-blue-600 underline" to="/">Landing Page</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { router } from '../router'
  import { tokenStorage } from '../store/User/actions'

  const logout = () => {
    tokenStorage.remove()

    setTimeout(() => {
      router.push({ name: 'public' })
    }, 2000)
  }
</script>
