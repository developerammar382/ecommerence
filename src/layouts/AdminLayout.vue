<template>
  <div class="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
    <div class="flex">
      <aside class="w-72 bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 text-white min-h-screen shadow-2xl">
        <div class="p-6 border-b border-gray-700">
          <router-link to="/" class="block">
            <h2 class="text-3xl font-display font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary-400 to-purple-400">ShopHub</h2>
            <p class="text-sm text-gray-400 mt-1">Admin Dashboard</p>
          </router-link>
          <div class="mt-4 p-3 bg-white/10 backdrop-blur-sm rounded-lg">
            <div class="flex items-center gap-3">
              <div class="w-10 h-10 rounded-full bg-gradient-to-br from-primary-500 to-purple-600 flex items-center justify-center text-white font-bold">
                {{ authStore.user?.name?.[0] || 'A' }}
              </div>
              <div>
                <p class="text-sm font-semibold">{{ authStore.user?.name || 'Admin' }}</p>
                <p class="text-xs text-gray-400">{{ authStore.user?.role || 'Super Admin' }}</p>
              </div>
            </div>
          </div>
        </div>
        
        <nav class="mt-4 px-3">
          <div class="mb-6">
            <p class="px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Main</p>
            <router-link to="/admin" exact-active-class="bg-gradient-to-r from-primary-600 to-purple-600 shadow-lg" class="flex items-center px-4 py-3 text-gray-300 hover:bg-white/10 rounded-lg transition-all mb-1 group">
              <svg class="w-5 h-5 mr-3 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/>
              </svg>
              <span class="font-medium">Dashboard</span>
            </router-link>

            <router-link to="/admin/analytics" active-class="bg-gradient-to-r from-primary-600 to-purple-600 shadow-lg" class="flex items-center px-4 py-3 text-gray-300 hover:bg-white/10 rounded-lg transition-all mb-1 group">
              <svg class="w-5 h-5 mr-3 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/>
              </svg>
              <span class="font-medium">Analytics</span>
            </router-link>
          </div>

          <div class="mb-6">
            <p class="px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Products</p>
            <router-link to="/admin/products" active-class="bg-gradient-to-r from-primary-600 to-purple-600 shadow-lg" class="flex items-center px-4 py-3 text-gray-300 hover:bg-white/10 rounded-lg transition-all mb-1 group">
              <svg class="w-5 h-5 mr-3 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"/>
              </svg>
              <span class="font-medium">Products</span>
            </router-link>

            <router-link to="/admin/categories" active-class="bg-gradient-to-r from-primary-600 to-purple-600 shadow-lg" class="flex items-center px-4 py-3 text-gray-300 hover:bg-white/10 rounded-lg transition-all mb-1 group">
              <svg class="w-5 h-5 mr-3 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"/>
              </svg>
              <span class="font-medium">Categories</span>
            </router-link>

            <router-link to="/admin/inventory" active-class="bg-gradient-to-r from-primary-600 to-purple-600 shadow-lg" class="flex items-center px-4 py-3 text-gray-300 hover:bg-white/10 rounded-lg transition-all mb-1 group">
              <svg class="w-5 h-5 mr-3 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/>
              </svg>
              <span class="font-medium">Inventory</span>
            </router-link>
          </div>

          <div class="mb-6">
            <p class="px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Sales</p>
            <router-link to="/admin/orders" active-class="bg-gradient-to-r from-primary-600 to-purple-600 shadow-lg" class="flex items-center px-4 py-3 text-gray-300 hover:bg-white/10 rounded-lg transition-all mb-1 group">
              <svg class="w-5 h-5 mr-3 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"/>
              </svg>
              <span class="font-medium">Orders</span>
            </router-link>

            <router-link to="/admin/users" active-class="bg-gradient-to-r from-primary-600 to-purple-600 shadow-lg" class="flex items-center px-4 py-3 text-gray-300 hover:bg-white/10 rounded-lg transition-all mb-1 group">
              <svg class="w-5 h-5 mr-3 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"/>
              </svg>
              <span class="font-medium">Users</span>
            </router-link>
          </div>

          <div class="mb-6">
            <p class="px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Content</p>
            <router-link to="/admin/content" active-class="bg-gradient-to-r from-primary-600 to-purple-600 shadow-lg" class="flex items-center px-4 py-3 text-gray-300 hover:bg-white/10 rounded-lg transition-all mb-1 group">
              <svg class="w-5 h-5 mr-3 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
              </svg>
              <span class="font-medium">Content CMS</span>
            </router-link>
          </div>

          <div class="border-t border-gray-700 pt-4">
            <router-link to="/" class="flex items-center px-4 py-3 text-gray-300 hover:bg-white/10 rounded-lg transition-all group">
              <svg class="w-5 h-5 mr-3 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/>
              </svg>
              <span class="font-medium">Back to Store</span>
            </router-link>
          </div>
        </nav>

        <div class="absolute bottom-6 left-6 right-6">
          <div class="bg-gradient-to-r from-primary-600 to-purple-600 p-4 rounded-lg">
            <div class="flex items-center gap-2 mb-2">
              <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/>
              </svg>
              <p class="text-sm font-semibold text-white">AI Assistant</p>
            </div>
            <p class="text-xs text-white/80 mb-3">Get AI-powered insights and recommendations</p>
            <button class="bg-white text-primary-600 px-3 py-1.5 rounded-lg text-sm font-medium w-full hover:bg-gray-100 transition-colors">
              Ask AI
            </button>
          </div>
        </div>
      </aside>

      <main class="flex-1 p-8 overflow-y-auto">
        <router-view />
      </main>
    </div>
  </div>
</template>

<script setup>
import { useAuthStore } from '@/stores/auth'

const authStore = useAuthStore()
</script>
