<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-md w-full">
      <div class="card">
        <h2 class="text-3xl font-bold text-center mb-8">Sign In</h2>
        
        <form @submit.prevent="handleLogin" class="space-y-4">
          <div>
            <label class="block text-sm font-medium mb-1">Email</label>
            <input 
              type="email" 
              v-model="email" 
              required
              placeholder="admin@example.com"
              autocomplete="email"
              class="input-field" 
            />
          </div>
          
          <div>
            <label class="block text-sm font-medium mb-1">Password</label>
            <input 
              type="password" 
              v-model="password" 
              required
              placeholder="password"
              autocomplete="current-password"
              class="input-field" 
            />
          </div>

          <div class="flex items-center justify-between">
            <label class="flex items-center">
              <input type="checkbox" class="mr-2" />
              <span class="text-sm">Remember me</span>
            </label>
            <a href="#" class="text-sm text-primary-600 hover:text-primary-700">Forgot password?</a>
          </div>

          <button type="submit" class="btn-primary w-full">Sign In</button>
        </form>

        <div class="mt-6 text-center">
          <p class="text-gray-600">
            Don't have an account? 
            <router-link to="/register" class="text-primary-600 hover:text-primary-700 font-medium">Sign up</router-link>
          </p>
        </div>

        <div class="mt-6 p-4 bg-blue-50 rounded-lg">
          <p class="text-sm text-gray-700 font-semibold mb-2">Demo Accounts:</p>
          <p class="text-xs text-gray-600">Admin: admin@example.com</p>
          <p class="text-xs text-gray-600">Manager: manager@example.com</p>
          <p class="text-xs text-gray-600">User: user@example.com</p>
          <p class="text-xs text-gray-500 mt-1">Password: admin123</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const router = useRouter()
const authStore = useAuthStore()

const email = ref('admin@example.com')
const password = ref('admin123')

async function handleLogin() {
  const result = await authStore.login(email.value, password.value)
  if (result.success) {
    const redirect = router.currentRoute.value.query.redirect || '/'
    router.push(redirect)
  } else {
    alert('Invalid credentials: ' + (result.error || 'Login failed'))
  }
}
</script>
