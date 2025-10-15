<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <div class="flex justify-between items-center mb-8">
      <h1 class="text-3xl font-bold">Products</h1>
      <div class="flex items-center space-x-4">
        <select v-model="sortBy" class="input-field w-48">
          <option value="">Sort by</option>
          <option value="price-low">Price: Low to High</option>
          <option value="price-high">Price: High to Low</option>
          <option value="rating">Rating</option>
        </select>
      </div>
    </div>

    <div class="flex gap-8">
      <aside class="w-64 flex-shrink-0">
        <div class="card">
          <h3 class="font-semibold mb-4">Categories</h3>
          <div class="space-y-2">
            <label v-for="category in categories" :key="category.id" class="flex items-center">
              <input 
                type="radio" 
                :value="category.id" 
                v-model="selectedCategory"
                class="mr-2"
              />
              {{ category.icon }} {{ category.name }}
            </label>
          </div>

          <h3 class="font-semibold mt-6 mb-4">Price Range</h3>
          <div class="space-y-2">
            <label class="flex items-center">
              <input type="radio" value="all" v-model="priceRange" class="mr-2" />
              All Prices
            </label>
            <label class="flex items-center">
              <input type="radio" value="0-50" v-model="priceRange" class="mr-2" />
              Under $50
            </label>
            <label class="flex items-center">
              <input type="radio" value="50-100" v-model="priceRange" class="mr-2" />
              $50 - $100
            </label>
            <label class="flex items-center">
              <input type="radio" value="100-200" v-model="priceRange" class="mr-2" />
              $100 - $200
            </label>
            <label class="flex items-center">
              <input type="radio" value="200+" v-model="priceRange" class="mr-2" />
              Over $200
            </label>
          </div>
        </div>
      </aside>

      <div class="flex-1">
        <div v-if="filteredProducts.length === 0" class="text-center py-16">
          <p class="text-gray-600 text-lg">No products found</p>
        </div>
        <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div v-for="product in filteredProducts" :key="product.id" class="card hover:shadow-lg transition-shadow">
            <img :src="product.image" :alt="product.name" class="w-full h-48 object-cover rounded-lg mb-4" />
            <h3 class="font-semibold mb-2">{{ product.name }}</h3>
            <p class="text-gray-600 text-sm mb-2 line-clamp-2">{{ product.description }}</p>
            <div class="flex items-center mb-2">
              <span class="text-yellow-400">★</span>
              <span class="ml-1 text-sm">{{ product.rating }} ({{ product.reviews }} reviews)</span>
            </div>
            <div class="flex items-center justify-between">
              <span class="text-2xl font-bold text-primary-600">${{ product.price }}</span>
              <div class="flex space-x-2">
                <button @click="addToWishlist(product)" class="p-2 hover:bg-gray-100 rounded-lg">
                  <svg class="w-5 h-5 text-red-500" :fill="wishlistStore.isInWishlist(product.id) ? 'currentColor' : 'none'" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>
                  </svg>
                </button>
                <router-link :to="`/products/${product.id}`" class="btn-primary text-sm">View</router-link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useProductStore } from '@/stores/products'
import { useWishlistStore } from '@/stores/wishlist'

const route = useRoute()
const productStore = useProductStore()
const wishlistStore = useWishlistStore()

const categories = [{ id: null, name: 'All Categories', icon: '🛍️' }, ...productStore.categories]
const selectedCategory = ref(null)
const priceRange = ref('all')
const sortBy = ref('')

const filteredProducts = computed(() => {
  let products = [...productStore.products]

  if (route.query.search) {
    products = productStore.searchProducts(route.query.search)
  }

  if (selectedCategory.value) {
    products = products.filter(p => p.categoryId === selectedCategory.value)
  }

  if (priceRange.value !== 'all') {
    if (priceRange.value === '0-50') {
      products = products.filter(p => p.price < 50)
    } else if (priceRange.value === '50-100') {
      products = products.filter(p => p.price >= 50 && p.price < 100)
    } else if (priceRange.value === '100-200') {
      products = products.filter(p => p.price >= 100 && p.price < 200)
    } else if (priceRange.value === '200+') {
      products = products.filter(p => p.price >= 200)
    }
  }

  if (sortBy.value === 'price-low') {
    products.sort((a, b) => a.price - b.price)
  } else if (sortBy.value === 'price-high') {
    products.sort((a, b) => b.price - a.price)
  } else if (sortBy.value === 'rating') {
    products.sort((a, b) => b.rating - a.rating)
  }

  return products
})

function addToWishlist(product) {
  if (wishlistStore.isInWishlist(product.id)) {
    wishlistStore.removeFromWishlist(product.id)
  } else {
    wishlistStore.addToWishlist(product)
  }
}

onMounted(() => {
  if (route.query.category) {
    selectedCategory.value = parseInt(route.query.category)
  }
})
</script>
