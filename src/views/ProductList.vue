<template>
  <div class="page-container">
    <div class="mb-8">
      <h1 class="section-title">{{ pageTitle }}</h1>
      <p class="text-gray-600 text-lg">{{ filteredProducts.length }} products found</p>
    </div>

    <div class="flex flex-col lg:flex-row gap-8">
      <aside class="lg:w-64 flex-shrink-0">
        <div class="card sticky top-24">
          <h3 class="text-lg font-semibold mb-4">Filters</h3>
          
          <div class="mb-6">
            <label class="block text-sm font-medium text-gray-700 mb-2">Categories</label>
            <div class="space-y-2">
              <label v-for="category in categories" :key="category.id" class="flex items-center cursor-pointer">
                <input 
                  type="checkbox" 
                  :value="category.id" 
                  v-model="selectedCategories"
                  class="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                />
                <span class="ml-2 text-sm text-gray-700">{{ category.icon }} {{ category.name }}</span>
              </label>
            </div>
          </div>

          <div class="mb-6">
            <label class="block text-sm font-medium text-gray-700 mb-2">
              Price Range: ${{ priceRange[0] }} - ${{ priceRange[1] }}
            </label>
            <div class="space-y-2">
              <input 
                type="range" 
                min="0" 
                max="1000" 
                v-model.number="priceRange[0]"
                class="w-full"
              />
              <input 
                type="range" 
                min="0" 
                max="1000" 
                v-model.number="priceRange[1]"
                class="w-full"
              />
            </div>
          </div>

          <div class="mb-6">
            <label class="block text-sm font-medium text-gray-700 mb-2">Rating</label>
            <div class="space-y-2">
              <label v-for="rating in [5, 4, 3, 2, 1]" :key="rating" class="flex items-center cursor-pointer">
                <input 
                  type="radio" 
                  :value="rating" 
                  v-model.number="selectedRating"
                  name="rating"
                  class="border-gray-300 text-primary-600 focus:ring-primary-500"
                />
                <div class="ml-2 flex items-center">
                  <svg v-for="i in 5" :key="i" class="w-4 h-4" 
                    :class="i <= rating ? 'text-yellow-400' : 'text-gray-300'"
                    fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                  </svg>
                  <span class="ml-1 text-sm text-gray-600">& Up</span>
                </div>
              </label>
            </div>
          </div>

          <div class="mb-6">
            <label class="flex items-center cursor-pointer">
              <input 
                type="checkbox" 
                v-model="inStockOnly"
                class="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
              />
              <span class="ml-2 text-sm text-gray-700">In Stock Only</span>
            </label>
          </div>

          <button @click="clearFilters" class="w-full btn-outline text-sm">
            Clear All Filters
          </button>
        </div>
      </aside>

      <div class="flex-1">
        <div class="flex items-center justify-between mb-6 flex-wrap gap-4">
          <div class="flex items-center gap-4">
            <select v-model="sortBy" class="input-field w-auto">
              <option value="featured">Featured</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
              <option value="newest">Newest</option>
            </select>

            <select v-model="perPage" class="input-field w-auto">
              <option :value="12">12 per page</option>
              <option :value="24">24 per page</option>
              <option :value="48">48 per page</option>
            </select>
          </div>

          <div class="flex gap-2">
            <button 
              @click="viewMode = 'grid'"
              class="p-2 rounded-lg transition-colors"
              :class="viewMode === 'grid' ? 'bg-primary-100 text-primary-600' : 'bg-gray-100 text-gray-600'"
            >
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"/>
              </svg>
            </button>
            <button 
              @click="viewMode = 'list'"
              class="p-2 rounded-lg transition-colors"
              :class="viewMode === 'list' ? 'bg-primary-100 text-primary-600' : 'bg-gray-100 text-gray-600'"
            >
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clip-rule="evenodd"/>
              </svg>
            </button>
          </div>
        </div>

        <LoadingSpinner v-if="loading" text="Loading products..." />
        
        <EmptyState 
          v-else-if="paginatedProducts.length === 0"
          title="No products found"
          description="Try adjusting your filters or search criteria to find what you're looking for."
          actionText="Clear Filters"
          @action="clearFilters"
        />

        <div v-else>
          <div 
            class="grid gap-6 mb-8"
            :class="viewMode === 'grid' ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'"
          >
            <ProductCard 
              v-for="product in paginatedProducts" 
              :key="product.id" 
              :product="product"
              @try-on="openTryOnModal"
            />
          </div>

          <Pagination 
            v-if="totalPages > 1"
            :current-page="currentPage"
            :total-pages="totalPages"
            :total-items="sortedProducts.length"
            :per-page="perPage"
            @update:current-page="currentPage = $event"
          />
        </div>
      </div>
    </div>

    <Modal 
      v-model="showTryOnModal" 
      title="Virtual Try-On" 
      size="xl"
      :close-on-backdrop="false"
    >
      <VirtualTryOn 
        v-if="selectedProductForTryOn" 
        :product="selectedProductForTryOn"
        @close="showTryOnModal = false"
      />
    </Modal>
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useProductStore } from '@/stores/products'
import ProductCard from '@/components/ui/ProductCard.vue'
import LoadingSpinner from '@/components/ui/LoadingSpinner.vue'
import EmptyState from '@/components/ui/EmptyState.vue'
import Pagination from '@/components/ui/Pagination.vue'
import Modal from '@/components/ui/Modal.vue'
import VirtualTryOn from '@/components/VirtualTryOn.vue'

const route = useRoute()
const productStore = useProductStore()

const loading = ref(true)
const viewMode = ref('grid')
const sortBy = ref('featured')
const perPage = ref(12)
const currentPage = ref(1)
const selectedCategories = ref([])
const priceRange = ref([0, 1000])
const selectedRating = ref(0)
const inStockOnly = ref(false)
const showTryOnModal = ref(false)
const selectedProductForTryOn = ref(null)

const categories = productStore.categories

const pageTitle = computed(() => {
  const categoryId = parseInt(route.query.category)
  if (categoryId) {
    const category = categories.find(c => c.id === categoryId)
    return category ? category.name : 'Products'
  }
  return route.query.search ? `Search Results for "${route.query.search}"` : 'All Products'
})

const filteredProducts = computed(() => {
  let products = productStore.products

  if (route.query.search) {
    products = productStore.searchProducts(route.query.search)
  }

  if (route.query.category) {
    const categoryId = parseInt(route.query.category)
    products = products.filter(p => p.categoryId === categoryId)
  }

  if (selectedCategories.value.length > 0) {
    products = products.filter(p => selectedCategories.value.includes(p.categoryId))
  }

  products = products.filter(p => p.price >= priceRange.value[0] && p.price <= priceRange.value[1])

  if (selectedRating.value > 0) {
    products = products.filter(p => p.rating >= selectedRating.value)
  }

  if (inStockOnly.value) {
    products = products.filter(p => p.stock > 0)
  }

  return products
})

const sortedProducts = computed(() => {
  const products = [...filteredProducts.value]
  
  switch (sortBy.value) {
    case 'price-asc':
      return products.sort((a, b) => a.price - b.price)
    case 'price-desc':
      return products.sort((a, b) => b.price - a.price)
    case 'rating':
      return products.sort((a, b) => b.rating - a.rating)
    case 'newest':
      return products.sort((a, b) => b.id - a.id)
    default:
      return products.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0))
  }
})

const totalPages = computed(() => Math.ceil(sortedProducts.value.length / perPage.value))

const paginatedProducts = computed(() => {
  const start = (currentPage.value - 1) * perPage.value
  const end = start + perPage.value
  return sortedProducts.value.slice(start, end)
})

function clearFilters() {
  selectedCategories.value = []
  priceRange.value = [0, 1000]
  selectedRating.value = 0
  inStockOnly.value = false
  sortBy.value = 'featured'
}

function openTryOnModal(product) {
  selectedProductForTryOn.value = product
  showTryOnModal.value = true
}

watch([selectedCategories, priceRange, selectedRating, inStockOnly, sortBy], () => {
  currentPage.value = 1
})

watch(perPage, () => {
  currentPage.value = 1
})

onMounted(() => {
  setTimeout(() => {
    loading.value = false
  }, 500)
})
</script>
