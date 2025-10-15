<template>
  <div>
    <div class="flex justify-between items-center mb-8">
      <h1 class="text-3xl font-bold">Category Management</h1>
      <button class="btn-primary">+ Add Category</button>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div v-for="category in categories" :key="category.id" class="card hover:shadow-lg transition-shadow">
        <div class="flex items-center justify-between mb-4">
          <div class="text-5xl">{{ category.icon }}</div>
          <div class="flex gap-2">
            <button class="p-2 hover:bg-gray-100 rounded">
              <svg class="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
              </svg>
            </button>
            <button class="p-2 hover:bg-gray-100 rounded">
              <svg class="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
              </svg>
            </button>
          </div>
        </div>
        <h3 class="text-xl font-semibold mb-2">{{ category.name }}</h3>
        <p class="text-gray-600 text-sm mb-3">Slug: {{ category.slug }}</p>
        <div class="flex justify-between text-sm">
          <span class="text-gray-600">{{ getProductCount(category.id) }} products</span>
          <span class="text-primary-600 font-medium">View Products →</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useProductStore } from '@/stores/products'

const productStore = useProductStore()
const categories = productStore.categories

function getProductCount(categoryId) {
  return productStore.products.filter(p => p.categoryId === categoryId).length
}
</script>
