<template>
  <div class="min-h-screen flex flex-col">
    <header class="bg-white shadow-sm sticky top-0 z-50">
      <nav class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center h-16">
          <div class="flex items-center space-x-8">
            <router-link to="/" class="text-2xl font-bold text-primary-600">ShopHub</router-link>
            
            <div class="hidden md:flex space-x-6">
              <router-link to="/" class="text-gray-700 hover:text-primary-600">Home</router-link>
              <router-link to="/products" class="text-gray-700 hover:text-primary-600">Products</router-link>
              <div class="relative group">
                <button class="text-gray-700 hover:text-primary-600 flex items-center">
                  Categories
                  <svg class="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
                  </svg>
                </button>
                <div class="absolute hidden group-hover:block bg-white shadow-lg rounded-lg mt-2 py-2 w-48">
                  <router-link 
                    v-for="category in categories" 
                    :key="category.id" 
                    :to="`/products?category=${category.id}`"
                    class="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                  >
                    {{ category.icon }} {{ category.name }}
                  </router-link>
                </div>
              </div>
            </div>
          </div>

          <div class="flex items-center space-x-4">
            <div class="relative">
              <input 
                type="search" 
                placeholder="Search products..." 
                class="w-64 pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                v-model="searchQuery"
                @keyup.enter="searchProducts"
              />
              <svg class="w-5 h-5 absolute left-3 top-2.5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
              </svg>
            </div>

            <router-link to="/wishlist" class="text-gray-700 hover:text-primary-600">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>
              </svg>
            </router-link>

            <router-link to="/cart" class="relative text-gray-700 hover:text-primary-600">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"/>
              </svg>
              <span v-if="cartStore.totalItems > 0" class="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                {{ cartStore.totalItems }}
              </span>
            </router-link>

            <div v-if="authStore.isAuthenticated" class="relative group">
              <button class="flex items-center space-x-2 text-gray-700 hover:text-primary-600">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
                </svg>
              </button>
              <div class="absolute right-0 hidden group-hover:block bg-white shadow-lg rounded-lg mt-2 py-2 w-48">
                <router-link to="/account" class="block px-4 py-2 text-gray-700 hover:bg-gray-100">My Account</router-link>
                <router-link to="/orders" class="block px-4 py-2 text-gray-700 hover:bg-gray-100">My Orders</router-link>
                <router-link to="/wishlist" class="block px-4 py-2 text-gray-700 hover:bg-gray-100">Wishlist</router-link>
                <router-link v-if="authStore.isAdmin" to="/admin" class="block px-4 py-2 text-gray-700 hover:bg-gray-100">Admin Panel</router-link>
                <button @click="logout" class="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100">Logout</button>
              </div>
            </div>
            <router-link v-else to="/login" class="btn-primary">Login</router-link>
          </div>
        </div>
      </nav>
    </header>

    <main class="flex-1">
      <router-view />
    </main>

    <footer class="bg-gray-900 text-white mt-16">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 class="text-xl font-bold mb-4">ShopHub</h3>
            <p class="text-gray-400">Your one-stop shop for everything you need.</p>
          </div>
          <div>
            <h4 class="font-semibold mb-4">Shop</h4>
            <ul class="space-y-2 text-gray-400">
              <li><router-link to="/products" class="hover:text-white">All Products</router-link></li>
              <li><router-link to="/products?category=1" class="hover:text-white">Clothing</router-link></li>
              <li><router-link to="/products?category=4" class="hover:text-white">Electronics</router-link></li>
            </ul>
          </div>
          <div>
            <h4 class="font-semibold mb-4">Support</h4>
            <ul class="space-y-2 text-gray-400">
              <li><a href="#" class="hover:text-white">Help Center</a></li>
              <li><a href="#" class="hover:text-white">Contact Us</a></li>
              <li><a href="#" class="hover:text-white">Shipping Info</a></li>
            </ul>
          </div>
          <div>
            <h4 class="font-semibold mb-4">Company</h4>
            <ul class="space-y-2 text-gray-400">
              <li><a href="#" class="hover:text-white">About Us</a></li>
              <li><a href="#" class="hover:text-white">Privacy Policy</a></li>
              <li><a href="#" class="hover:text-white">Terms of Service</a></li>
            </ul>
          </div>
        </div>
        <div class="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2025 ShopHub. All rights reserved.</p>
        </div>
      </div>
    </footer>

    <ChatBot />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { useCartStore } from '@/stores/cart'
import { useProductStore } from '@/stores/products'
import ChatBot from '@/components/ChatBot.vue'

const router = useRouter()
const authStore = useAuthStore()
const cartStore = useCartStore()
const productStore = useProductStore()

const searchQuery = ref('')
const categories = productStore.categories

function searchProducts() {
  if (searchQuery.value.trim()) {
    router.push({ path: '/products', query: { search: searchQuery.value } })
  }
}

function logout() {
  authStore.logout()
  router.push('/')
}
</script>
