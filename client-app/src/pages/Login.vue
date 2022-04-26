<template>
  <div class="relative w-full min-h-screen">
    <div class="max-w-md px-2 md:px-4 py-20 mx-auto text-gray-700">
      <div class='w-full relative items-center'>
        <div class="relative max-w-xl mx-auto px-4 md:px-12 py-6 text-center rounded-2xl border border-gray-500 my-8">
          <h1 class="text-xl font-semibold mt-4 mb-8">Authentication</h1>
          <p class="text-red-600">
            {{error ? error : ""}}
          </p>
          <div class="text-left">
            <form 
              ref="formRef"
              @submit.prevent="login"
            >
              <div class="my-4">
                <label class="text-xs" for="username">Username <span class="text-red-700">*</span></label>
                <fieldset class="relative w-full border border-gray-300">
                  <input v-model="form.email" id="username" class="w-full px-6 py-4" placeholder="example@gmail.com" required type="email">
                </fieldset>
              </div>
              <div class="my-4">
                <label class="text-xs" for="password">Password <span class="text-red-700">*</span></label>
                <fieldset class="relative w-full border border-gray-300">
                  <input v-model="form.password" id="passsword" class="w-full px-6 py-4" placeholder="********" required type="password">
                </fieldset>
              </div>
              <div class="my-8">
                <button class="w-full bg-blue-600 px-6 py-4 rounded text-white font-bold">
                  Sign in
                </button>
              </div>
            </form>
          </div>

          <span>No have Account ? <router-link class="text-blue-700 hover:no-underline underline" to="/register">Register</router-link></span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { ref, reactive } from 'vue'
  import { router } from '../router'
  import { store } from '../store'

  const formRef = ref<HTMLFormElement | null>(null)
  const form = reactive({
    email: '',
    password: ''
  })

  const error = ref()
  
  const login = async () => {
    const response = await store.dispatch('user/LOGIN_AUTHENTICATION', JSON.parse(JSON.stringify(form)))

    if (response.error) {
      error.value = response.error
    } else {
      router.go(0)
    }
  }
</script>
