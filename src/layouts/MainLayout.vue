<template>
  <div class="min-h-screen flex flex-col">
    <header class="bg-white shadow-sm sticky top-0 z-50 border-b border-gray-100">
      <nav class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center h-16">
          <div class="flex items-center space-x-8">
            <router-link to="/" class="text-2xl font-display font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary-600 to-purple-600">
              ShopHub
            </router-link>
            
            <div class="hidden md:flex space-x-6">
              <router-link to="/" class="text-gray-700 hover:text-primary-600 font-medium transition-colors">Home</router-link>
              <router-link to="/products" class="text-gray-700 hover:text-primary-600 font-medium transition-colors">Products</router-link>
              <div class="relative group">
                <button class="text-gray-700 hover:text-primary-600 font-medium transition-colors flex items-center">
                  Categories
                  <svg class="w-4 h-4 ml-1 transition-transform group-hover:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
                  </svg>
                </button>
                <div class="absolute hidden group-hover:block bg-white shadow-xl rounded-xl mt-2 py-3 w-64 border border-gray-100">
                  <router-link 
                    v-for="category in categories" 
                    :key="category.id" 
                    :to="`/products?category=${category.id}`"
                    class="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gradient-to-r hover:from-primary-50 hover:to-purple-50 hover:text-primary-600 transition-all group/item"
                  >
                    <div class="w-8 h-8 rounded-lg bg-gradient-to-br from-primary-50 to-purple-50 flex items-center justify-center group-hover/item:from-primary-100 group-hover/item:to-purple-100 transition-all">
                      <component :is="category.iconComponent" class="w-5 h-5 text-primary-600" />
                    </div>
                    <span class="font-medium">{{ category.name }}</span>
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
                class="w-64 pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all duration-200 bg-white"
                v-model="searchQuery"
                @keyup.enter="searchProducts"
              />
              <svg class="w-5 h-5 absolute left-3 top-2.5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
              </svg>
            </div>

            <router-link to="/wishlist" class="relative p-2 rounded-lg text-gray-700 hover:text-primary-600 hover:bg-gray-100 transition-all group">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>
              </svg>
            </router-link>

            <router-link to="/cart" class="relative p-2 rounded-lg text-gray-700 hover:text-primary-600 hover:bg-gray-100 transition-all group">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"/>
              </svg>
              <span v-if="cartStore.totalItems > 0" class="absolute -top-1 -right-1 bg-gradient-to-r from-primary-600 to-purple-600 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold shadow-lg">
                {{ cartStore.totalItems }}
              </span>
            </router-link>

            <div v-if="authStore.isAuthenticated" class="relative group">
              <button class="flex items-center space-x-2 p-2 rounded-lg text-gray-700 hover:text-primary-600 hover:bg-gray-100 transition-all">
                <div class="w-8 h-8 rounded-full bg-gradient-to-br from-primary-500 to-purple-600 flex items-center justify-center text-white font-bold">
                  {{ authStore.user?.name?.[0] || 'U' }}
                </div>
              </button>
              <div class="absolute right-0 hidden group-hover:block bg-white shadow-xl rounded-xl mt-2 py-2 w-56 border border-gray-100">
                <div class="px-4 py-3 border-b border-gray-100">
                  <p class="text-sm font-semibold text-gray-900">{{ authStore.user?.name || 'User' }}</p>
                  <p class="text-xs text-gray-500">{{ authStore.user?.email || '' }}</p>
                </div>
                <router-link to="/account" class="flex items-center gap-3 px-4 py-2 text-gray-700 hover:bg-gradient-to-r hover:from-primary-50 hover:to-purple-50 hover:text-primary-600 transition-all">
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
                  </svg>
                  My Account
                </router-link>
                <router-link to="/orders" class="flex items-center gap-3 px-4 py-2 text-gray-700 hover:bg-gradient-to-r hover:from-primary-50 hover:to-purple-50 hover:text-primary-600 transition-all">
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"/>
                  </svg>
                  My Orders
                </router-link>
                <router-link to="/wishlist" class="flex items-center gap-3 px-4 py-2 text-gray-700 hover:bg-gradient-to-r hover:from-primary-50 hover:to-purple-50 hover:text-primary-600 transition-all">
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>
                  </svg>
                  Wishlist
                </router-link>
                <router-link v-if="authStore.isAdmin" to="/admin" class="flex items-center gap-3 px-4 py-2 text-gray-700 hover:bg-gradient-to-r hover:from-primary-50 hover:to-purple-50 hover:text-primary-600 transition-all">
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/>
                  </svg>
                  Admin Panel
                </router-link>
                <div class="border-t border-gray-100 mt-2 pt-2">
                  <button @click="logout" class="flex items-center gap-3 w-full px-4 py-2 text-red-600 hover:bg-red-50 transition-all">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"/>
                    </svg>
                    Logout
                  </button>
                </div>
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

    <footer class="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white mt-20">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div class="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div class="md:col-span-1">
            <h3 class="text-2xl font-display font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary-400 to-purple-400 mb-4">ShopHub</h3>
            <p class="text-gray-400 mb-6">Your one-stop shop for everything you need. Quality products, unbeatable prices.</p>
            <div class="flex gap-3">
              <a href="#" class="w-10 h-10 rounded-lg bg-white/10 hover:bg-white/20 flex items-center justify-center transition-all hover:-translate-y-1">
                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
              <a href="#" class="w-10 h-10 rounded-lg bg-white/10 hover:bg-white/20 flex items-center justify-center transition-all hover:-translate-y-1">
                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                </svg>
              </a>
              <a href="#" class="w-10 h-10 rounded-lg bg-white/10 hover:bg-white/20 flex items-center justify-center transition-all hover:-translate-y-1">
                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678c-3.405 0-6.162 2.76-6.162 6.162 0 3.405 2.76 6.162 6.162 6.162 3.405 0 6.162-2.76 6.162-6.162 0-3.405-2.76-6.162-6.162-6.162zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405c0 .795-.646 1.44-1.44 1.44-.795 0-1.44-.646-1.44-1.44 0-.794.646-1.439 1.44-1.439.793-.001 1.44.645 1.44 1.439z"/>
                </svg>
              </a>
            </div>
          </div>
          <div>
            <h4 class="font-semibold text-lg mb-4">Shop</h4>
            <ul class="space-y-3 text-gray-400">
              <li><router-link to="/products" class="hover:text-white transition-colors hover:translate-x-1 inline-block">All Products</router-link></li>
              <li><router-link to="/products?category=1" class="hover:text-white transition-colors hover:translate-x-1 inline-block">Clothing</router-link></li>
              <li><router-link to="/products?category=4" class="hover:text-white transition-colors hover:translate-x-1 inline-block">Electronics</router-link></li>
              <li><router-link to="/products?category=6" class="hover:text-white transition-colors hover:translate-x-1 inline-block">Home & Kitchen</router-link></li>
            </ul>
          </div>
          <div>
            <h4 class="font-semibold text-lg mb-4">Support</h4>
            <ul class="space-y-3 text-gray-400">
              <li><a href="#" class="hover:text-white transition-colors hover:translate-x-1 inline-block">Help Center</a></li>
              <li><a href="#" class="hover:text-white transition-colors hover:translate-x-1 inline-block">Contact Us</a></li>
              <li><a href="#" class="hover:text-white transition-colors hover:translate-x-1 inline-block">Shipping Info</a></li>
              <li><a href="#" class="hover:text-white transition-colors hover:translate-x-1 inline-block">Track Order</a></li>
            </ul>
          </div>
          <div>
            <h4 class="font-semibold text-lg mb-4">Company</h4>
            <ul class="space-y-3 text-gray-400">
              <li><a href="#" class="hover:text-white transition-colors hover:translate-x-1 inline-block">About Us</a></li>
              <li><a href="#" class="hover:text-white transition-colors hover:translate-x-1 inline-block">Privacy Policy</a></li>
              <li><a href="#" class="hover:text-white transition-colors hover:translate-x-1 inline-block">Terms of Service</a></li>
              <li><a href="#" class="hover:text-white transition-colors hover:translate-x-1 inline-block">Careers</a></li>
            </ul>
          </div>
        </div>
        <div class="border-t border-gray-700 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p class="text-gray-400 text-sm">&copy; 2025 ShopHub. All rights reserved.</p>
          <div class="flex items-center gap-6 text-sm text-gray-400">
            <img src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg" alt="Visa" class="h-6 opacity-70" />
            <img src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" alt="Mastercard" class="h-6 opacity-70" />
            <img src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg" alt="PayPal" class="h-6 opacity-70" />
          </div>
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
