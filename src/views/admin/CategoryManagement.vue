<template>
  <div class="space-y-6">
    <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
      <div>
        <h1 class="text-4xl font-display font-bold gradient-text">Category Management</h1>
        <p class="text-gray-600 mt-2">Organize products with SEO-optimized categories</p>
      </div>
      <button @click="showAddModal = true" class="btn-primary flex items-center gap-2">
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/>
        </svg>
        Add Category
      </button>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div v-for="category in categories" :key="category.id" class="card hover-lift group">
        <div class="flex items-center justify-between mb-4">
          <div class="text-6xl">{{ category.icon }}</div>
          <div class="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
            <button @click="editCategory(category)" class="p-2 hover:bg-blue-50 rounded-lg transition-colors">
              <svg class="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
              </svg>
            </button>
            <button @click="deleteCategory(category)" class="p-2 hover:bg-red-50 rounded-lg transition-colors">
              <svg class="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
              </svg>
            </button>
          </div>
        </div>
        <h3 class="text-xl font-bold mb-2">{{ category.name }}</h3>
        <p class="text-gray-600 text-sm mb-1">Slug: <span class="font-mono text-primary-600">{{ category.slug }}</span></p>
        <p class="text-gray-600 text-sm mb-3">ID: {{ category.id }}</p>
        <div class="flex justify-between items-center pt-3 border-t">
          <span class="text-sm text-gray-600">{{ getProductCount(category.id) }} products</span>
          <router-link :to="`/products?category=${category.id}`" class="text-sm text-primary-600 hover:text-primary-700 font-medium flex items-center gap-1">
            View Products
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
            </svg>
          </router-link>
        </div>
      </div>
    </div>

    <div class="card">
      <h2 class="text-2xl font-bold mb-6">Category Performance</h2>
      <div class="overflow-x-auto">
        <table class="w-full">
          <thead>
            <tr class="border-b-2 border-gray-200">
              <th class="text-left py-4 px-3 text-sm font-semibold text-gray-700">Category</th>
              <th class="text-left py-4 px-3 text-sm font-semibold text-gray-700">Products</th>
              <th class="text-left py-4 px-3 text-sm font-semibold text-gray-700">Revenue</th>
              <th class="text-left py-4 px-3 text-sm font-semibold text-gray-700">Growth</th>
              <th class="text-left py-4 px-3 text-sm font-semibold text-gray-700">SEO Score</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="category in categories" :key="category.id" class="border-b hover:bg-gray-50 transition-colors">
              <td class="py-4 px-3">
                <div class="flex items-center gap-3">
                  <span class="text-3xl">{{ category.icon }}</span>
                  <span class="font-semibold">{{ category.name }}</span>
                </div>
              </td>
              <td class="py-4 px-3">{{ getProductCount(category.id) }}</td>
              <td class="py-4 px-3 font-semibold">${{ getCategoryRevenue(category.id).toLocaleString() }}</td>
              <td class="py-4 px-3">
                <span class="text-green-600 flex items-center gap-1">
                  <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M5.293 9.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 7.414V15a1 1 0 11-2 0V7.414L6.707 9.707a1 1 0 01-1.414 0z" clip-rule="evenodd"/>
                  </svg>
                  +{{ Math.floor(Math.random() * 30) }}%
                </span>
              </td>
              <td class="py-4 px-3">
                <div class="flex items-center gap-2">
                  <div class="w-24 bg-gray-200 rounded-full h-2">
                    <div class="bg-green-500 h-2 rounded-full" :style="{ width: (80 + Math.random() * 20) + '%' }"></div>
                  </div>
                  <span class="text-sm font-medium">{{ (80 + Math.floor(Math.random() * 20)) }}/100</span>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <Modal v-model="showAddModal" title="Add New Category">
      <form @submit.prevent="addCategory" class="space-y-4">
        <div>
          <label class="block text-sm font-semibold mb-2">Category Name</label>
          <input v-model="newCategory.name" type="text" required class="input-field" placeholder="Electronics" />
        </div>
        <div>
          <label class="block text-sm font-semibold mb-2">Category Icon (Emoji)</label>
          <input v-model="newCategory.icon" type="text" required class="input-field" placeholder="📱" maxlength="2" />
        </div>
        <div>
          <label class="block text-sm font-semibold mb-2">SEO-friendly Slug</label>
          <input v-model="newCategory.slug" type="text" required class="input-field" placeholder="electronics" />
        </div>
        <div>
          <label class="block text-sm font-semibold mb-2">Meta Description</label>
          <textarea v-model="newCategory.description" rows="3" class="input-field" placeholder="Browse our wide selection of electronics..."></textarea>
        </div>
        <div>
          <label class="block text-sm font-semibold mb-2">Meta Keywords</label>
          <input v-model="newCategory.keywords" type="text" class="input-field" placeholder="electronics, gadgets, devices" />
        </div>
        <div class="flex justify-end gap-3 pt-4 border-t">
          <button type="button" @click="showAddModal = false" class="btn-secondary">Cancel</button>
          <button type="submit" class="btn-primary">Add Category</button>
        </div>
      </form>
    </Modal>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useProductStore } from '@/stores/products'
import { useToast } from '@/composables/useToast'
import Modal from '@/components/ui/Modal.vue'

const productStore = useProductStore()
const { success } = useToast()

const showAddModal = ref(false)
const newCategory = ref({
  name: '',
  icon: '',
  slug: '',
  description: '',
  keywords: ''
})

const categories = computed(() => productStore.categories)

function getProductCount(categoryId) {
  return productStore.products.filter(p => p.categoryId === categoryId).length
}

function getCategoryRevenue(categoryId) {
  return productStore.products
    .filter(p => p.categoryId === categoryId)
    .reduce((sum, p) => sum + (p.price * Math.floor(Math.random() * 50)), 0)
}

function editCategory(category) {
  success(`Editing ${category.name} category`)
}

function deleteCategory(category) {
  if (confirm(`Are you sure you want to delete ${category.name}?`)) {
    success(`Category ${category.name} deleted successfully`)
  }
}

function addCategory() {
  success(`Category ${newCategory.value.name} added successfully!`)
  showAddModal.value = false
  newCategory.value = {
    name: '',
    icon: '',
    slug: '',
    description: '',
    keywords: ''
  }
}
</script>
