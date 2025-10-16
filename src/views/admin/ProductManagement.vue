<template>
  <div class="space-y-6">
    <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
      <div>
        <h1 class="text-4xl font-display font-bold gradient-text">Product Management</h1>
        <p class="text-gray-600 mt-2">Manage your product catalog with AI-powered tools</p>
      </div>
      <button @click="showAddModal = true" class="btn-primary flex items-center gap-2">
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/>
        </svg>
        Add Product
      </button>
    </div>

    <div class="card">
      <div class="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div class="md:col-span-2">
          <div class="relative">
            <svg class="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
            </svg>
            <input v-model="searchQuery" type="search" placeholder="Search products by name, SKU, or category..." class="input-field pl-10" />
          </div>
        </div>
        <select v-model="filterCategory" class="input-field">
          <option value="">All Categories</option>
          <option v-for="cat in categories" :key="cat.id" :value="cat.id">{{ cat.name }}</option>
        </select>
        <select v-model="filterStock" class="input-field">
          <option value="">All Stock</option>
          <option value="in-stock">In Stock</option>
          <option value="low-stock">Low Stock</option>
          <option value="out-of-stock">Out of Stock</option>
        </select>
      </div>

      <div class="flex items-center justify-between mb-4">
        <div class="flex items-center gap-3">
          <button @click="selectAll" class="text-sm text-gray-600 hover:text-gray-900">
            {{ selectedProducts.length === filteredProducts.length ? 'Deselect All' : 'Select All' }}
          </button>
          <span v-if="selectedProducts.length > 0" class="text-sm text-gray-600">
            {{ selectedProducts.length }} selected
          </span>
        </div>
        <div v-if="selectedProducts.length > 0" class="flex gap-2">
          <button class="btn-secondary text-sm flex items-center gap-2">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
            </svg>
            Bulk Edit
          </button>
          <button class="btn-secondary text-sm flex items-center gap-2 text-red-600 hover:bg-red-50">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
            </svg>
            Delete Selected
          </button>
        </div>
      </div>

      <div class="overflow-x-auto">
        <table class="w-full">
          <thead>
            <tr class="border-b-2 border-gray-200">
              <th class="text-left py-4 px-2">
                <input type="checkbox" @change="selectAll" :checked="selectedProducts.length === filteredProducts.length && filteredProducts.length > 0" class="rounded" />
              </th>
              <th class="text-left py-4 px-3 text-sm font-semibold text-gray-700">Product</th>
              <th class="text-left py-4 px-3 text-sm font-semibold text-gray-700">Category</th>
              <th class="text-left py-4 px-3 text-sm font-semibold text-gray-700">Price</th>
              <th class="text-left py-4 px-3 text-sm font-semibold text-gray-700">Stock</th>
              <th class="text-left py-4 px-3 text-sm font-semibold text-gray-700">Rating</th>
              <th class="text-left py-4 px-3 text-sm font-semibold text-gray-700">Status</th>
              <th class="text-left py-4 px-3 text-sm font-semibold text-gray-700">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="product in paginatedProducts" :key="product.id" class="border-b hover:bg-gray-50 transition-colors">
              <td class="py-4 px-2">
                <input type="checkbox" :value="product.id" v-model="selectedProducts" class="rounded" />
              </td>
              <td class="py-4 px-3">
                <div class="flex items-center gap-3">
                  <img :src="product.image" :alt="product.name" class="w-12 h-12 object-cover rounded-lg shadow-sm" />
                  <div>
                    <p class="font-semibold text-sm">{{ product.name }}</p>
                    <p class="text-xs text-gray-500">SKU: {{ product.id }}</p>
                  </div>
                </div>
              </td>
              <td class="py-4 px-3">
                <span class="badge-secondary text-xs">{{ product.category }}</span>
              </td>
              <td class="py-4 px-3">
                <p class="font-semibold">${{ product.price }}</p>
              </td>
              <td class="py-4 px-3">
                <span :class="getStockClass(product.stock)" class="font-medium">
                  {{ product.stock }}
                </span>
              </td>
              <td class="py-4 px-3">
                <div class="flex items-center gap-1">
                  <svg class="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                  </svg>
                  <span class="text-sm">{{ product.rating }}</span>
                </div>
              </td>
              <td class="py-4 px-3">
                <span :class="product.stock > 0 ? 'badge-success' : 'badge-danger'" class="text-xs">
                  {{ product.stock > 0 ? 'Active' : 'Inactive' }}
                </span>
              </td>
              <td class="py-4 px-3">
                <div class="flex items-center gap-2">
                  <button @click="editProduct(product)" class="p-2 hover:bg-blue-50 rounded-lg transition-colors group">
                    <svg class="w-4 h-4 text-gray-600 group-hover:text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
                    </svg>
                  </button>
                  <button @click="generateAIDescription(product)" class="p-2 hover:bg-purple-50 rounded-lg transition-colors group" title="Generate AI Description">
                    <svg class="w-4 h-4 text-gray-600 group-hover:text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/>
                    </svg>
                  </button>
                  <button @click="deleteProduct(product.id)" class="p-2 hover:bg-red-50 rounded-lg transition-colors group">
                    <svg class="w-4 h-4 text-gray-600 group-hover:text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
                    </svg>
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="mt-6">
        <Pagination 
          :current-page="currentPage"
          :total-pages="totalPages"
          @update:current-page="currentPage = $event"
        />
      </div>
    </div>

    <Modal v-model="showAddModal" title="Add New Product" size="xl">
      <form @submit.prevent="addProduct" class="space-y-4">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label class="block text-sm font-semibold mb-2">Product Name</label>
            <input v-model="newProduct.name" type="text" required class="input-field" placeholder="Enter product name" />
          </div>
          <div>
            <label class="block text-sm font-semibold mb-2">Category</label>
            <select v-model="newProduct.categoryId" required class="input-field">
              <option value="">Select Category</option>
              <option v-for="cat in categories" :key="cat.id" :value="cat.id">{{ cat.name }}</option>
            </select>
          </div>
          <div>
            <label class="block text-sm font-semibold mb-2">Price ($)</label>
            <input v-model.number="newProduct.price" type="number" step="0.01" required class="input-field" placeholder="0.00" />
          </div>
          <div>
            <label class="block text-sm font-semibold mb-2">Stock Quantity</label>
            <input v-model.number="newProduct.stock" type="number" required class="input-field" placeholder="0" />
          </div>
        </div>
        <div>
          <label class="block text-sm font-semibold mb-2">Description</label>
          <textarea v-model="newProduct.description" rows="3" class="input-field" placeholder="Enter product description"></textarea>
          <button type="button" @click="generateAIDescriptionForNew" class="mt-2 text-sm text-primary-600 hover:text-primary-700 flex items-center gap-1">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/>
            </svg>
            Generate AI Description
          </button>
        </div>
        <div>
          <label class="block text-sm font-semibold mb-2">Image URL</label>
          <input v-model="newProduct.image" type="url" required class="input-field" placeholder="https://example.com/image.jpg" />
        </div>
        <div class="flex justify-end gap-3 pt-4 border-t">
          <button type="button" @click="showAddModal = false" class="btn-secondary">Cancel</button>
          <button type="submit" class="btn-primary">Add Product</button>
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
import Pagination from '@/components/ui/Pagination.vue'

const productStore = useProductStore()
const { success, error } = useToast()

const searchQuery = ref('')
const filterCategory = ref('')
const filterStock = ref('')
const selectedProducts = ref([])
const currentPage = ref(1)
const itemsPerPage = ref(10)
const showAddModal = ref(false)

const newProduct = ref({
  name: '',
  categoryId: '',
  price: 0,
  stock: 0,
  description: '',
  image: '',
  rating: 4.5
})

const categories = computed(() => productStore.categories)
const products = computed(() => productStore.products)

const filteredProducts = computed(() => {
  let result = products.value

  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    result = result.filter(p => 
      p.name.toLowerCase().includes(query) || 
      p.category.toLowerCase().includes(query) ||
      p.id.toString().includes(query)
    )
  }

  if (filterCategory.value) {
    result = result.filter(p => p.categoryId === parseInt(filterCategory.value))
  }

  if (filterStock.value) {
    if (filterStock.value === 'in-stock') {
      result = result.filter(p => p.stock > 50)
    } else if (filterStock.value === 'low-stock') {
      result = result.filter(p => p.stock > 0 && p.stock <= 50)
    } else if (filterStock.value === 'out-of-stock') {
      result = result.filter(p => p.stock === 0)
    }
  }

  return result
})

const totalPages = computed(() => Math.ceil(filteredProducts.value.length / itemsPerPage.value))

const paginatedProducts = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage.value
  const end = start + itemsPerPage.value
  return filteredProducts.value.slice(start, end)
})

function getStockClass(stock) {
  if (stock === 0) return 'text-red-600'
  if (stock <= 50) return 'text-orange-600'
  return 'text-green-600'
}

function selectAll() {
  if (selectedProducts.value.length === filteredProducts.value.length) {
    selectedProducts.value = []
  } else {
    selectedProducts.value = filteredProducts.value.map(p => p.id)
  }
}

function editProduct(product) {
  console.log('Editing product:', product)
  success(`Editing ${product.name}`)
}

function deleteProduct(id) {
  if (confirm('Are you sure you want to delete this product?')) {
    success('Product deleted successfully')
  }
}

function generateAIDescription(product) {
  success(`AI Description generated for ${product.name}! Enhanced with SEO keywords.`)
}

function generateAIDescriptionForNew() {
  newProduct.value.description = `Premium ${newProduct.value.name} - High quality product designed for ultimate satisfaction. Features advanced technology and superior craftsmanship. Perfect for daily use and special occasions.`
  success('AI Description generated!')
}

function addProduct() {
  productStore.addProduct(newProduct.value)
  success('Product added successfully!')
  showAddModal.value = false
  newProduct.value = {
    name: '',
    categoryId: '',
    price: 0,
    stock: 0,
    description: '',
    image: '',
    rating: 4.5
  }
}
</script>
