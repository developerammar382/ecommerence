<template>
  <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <h1 class="text-3xl font-bold mb-8">My Account</h1>

    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div class="card text-center">
        <svg class="w-16 h-16 mx-auto mb-4 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
        </svg>
        <h3 class="font-semibold text-lg">{{ authStore.user?.name }}</h3>
        <p class="text-gray-600">{{ authStore.user?.email }}</p>
        <p class="text-sm text-gray-500 mt-2">{{ authStore.user?.role }}</p>
      </div>

      <router-link to="/orders" class="card hover:shadow-lg transition-shadow cursor-pointer">
        <svg class="w-12 h-12 mb-3 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"/>
        </svg>
        <h3 class="font-semibold mb-1">My Orders</h3>
        <p class="text-gray-600 text-sm">Track and manage orders</p>
      </router-link>

      <router-link to="/wishlist" class="card hover:shadow-lg transition-shadow cursor-pointer">
        <svg class="w-12 h-12 mb-3 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>
        </svg>
        <h3 class="font-semibold mb-1">Wishlist</h3>
        <p class="text-gray-600 text-sm">{{ wishlistStore.items.length }} items saved</p>
      </router-link>
    </div>

    <div class="card mt-8">
      <h2 class="text-xl font-semibold mb-4">Account Information</h2>
      <div class="space-y-4">
        <div>
          <label class="block text-sm font-medium mb-1">Full Name</label>
          <input type="text" v-model="userInfo.name" class="input-field" />
        </div>
        <div>
          <label class="block text-sm font-medium mb-1">Email</label>
          <input type="email" v-model="userInfo.email" class="input-field" />
        </div>
        <div>
          <label class="block text-sm font-medium mb-1">Phone</label>
          <input type="tel" v-model="userInfo.phone" placeholder="+1 (555) 123-4567" class="input-field" />
        </div>
        <button @click="updateProfile" class="btn-primary">Save Changes</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { useWishlistStore } from '@/stores/wishlist'

const authStore = useAuthStore()
const wishlistStore = useWishlistStore()

const userInfo = ref({
  name: authStore.user?.name || '',
  email: authStore.user?.email || '',
  phone: ''
})

function updateProfile() {
  alert('Profile updated successfully!')
}
</script>
