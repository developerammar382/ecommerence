<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-md w-full">
      <div class="card">
        <h2 class="text-3xl font-bold text-center mb-8">Create Account</h2>
        
        <form @submit.prevent="handleRegister" class="space-y-4">
          <div>
            <label class="block text-sm font-medium mb-1">Full Name</label>
            <input 
              type="text" 
              v-model="formData.name" 
              required
              class="input-field" 
            />
          </div>

          <div>
            <label class="block text-sm font-medium mb-1">Email</label>
            <input 
              type="email" 
              v-model="formData.email" 
              required
              class="input-field" 
            />
          </div>
          
          <div>
            <label class="block text-sm font-medium mb-1">Password</label>
            <input 
              type="password" 
              v-model="formData.password" 
              required
              class="input-field" 
            />
          </div>

          <div>
            <label class="block text-sm font-medium mb-1">Confirm Password</label>
            <input 
              type="password" 
              v-model="confirmPassword" 
              required
              class="input-field" 
            />
          </div>

          <div class="flex items-start">
            <input type="checkbox" required class="mt-1 mr-2" />
            <span class="text-sm text-gray-600">
              I agree to the <a href="#" class="text-primary-600 hover:text-primary-700">Terms and Conditions</a>
            </span>
          </div>

          <button type="submit" class="btn-primary w-full">Create Account</button>
        </form>

        <div class="mt-6 text-center">
          <p class="text-gray-600">
            Already have an account? 
            <router-link to="/login" class="text-primary-600 hover:text-primary-700 font-medium">Sign in</router-link>
          </p>
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

const formData = ref({
  name: '',
  email: '',
  password: ''
})

const confirmPassword = ref('')

function handleRegister() {
  if (formData.value.password !== confirmPassword.value) {
    alert('Passwords do not match')
    return
  }
  
  authStore.register(formData.value)
  router.push('/')
}
</script>
