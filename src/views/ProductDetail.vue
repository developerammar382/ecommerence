<template>
  <div v-if="product" class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
      <div>
        <img :src="product.image" :alt="product.name" class="w-full rounded-lg shadow-lg" />
      </div>

      <div>
        <h1 class="text-3xl font-bold mb-4">{{ product.name }}</h1>
        <div class="flex items-center mb-4">
          <span class="text-yellow-400 text-xl">★</span>
          <span class="ml-2 text-lg">{{ product.rating }} ({{ product.reviews }} reviews)</span>
        </div>
        <p class="text-4xl font-bold text-primary-600 mb-6">${{ product.price }}</p>
        <p class="text-gray-600 mb-6">{{ product.description }}</p>

        <div class="mb-6">
          <p class="text-sm text-gray-600 mb-2">Category: <span class="font-semibold">{{ product.category }}</span></p>
          <p class="text-sm text-gray-600">Stock: <span :class="product.stock > 50 ? 'text-green-600' : 'text-orange-600'" class="font-semibold">{{ product.stock }} available</span></p>
        </div>

        <div class="flex items-center space-x-4 mb-6">
          <div class="flex items-center space-x-2">
            <button @click="decreaseQuantity" class="px-3 py-1 border rounded-lg hover:bg-gray-100">-</button>
            <span class="px-4 py-1 border rounded-lg">{{ quantity }}</span>
            <button @click="increaseQuantity" class="px-3 py-1 border rounded-lg hover:bg-gray-100">+</button>
          </div>
        </div>

        <div class="flex space-x-4">
          <button @click="addToCart" class="flex-1 btn-primary">Add to Cart</button>
          <button @click="toggleWishlist" class="p-3 border border-gray-300 rounded-lg hover:bg-gray-100">
            <svg class="w-6 h-6 text-red-500" :fill="wishlistStore.isInWishlist(product.id) ? 'currentColor' : 'none'" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>
            </svg>
          </button>
        </div>

        <div class="mt-8 border-t pt-8">
          <h3 class="font-semibold text-lg mb-4">Product Features</h3>
          <ul class="space-y-2 text-gray-600">
            <li class="flex items-start">
              <svg class="w-5 h-5 text-green-500 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
              </svg>
              High quality materials
            </li>
            <li class="flex items-start">
              <svg class="w-5 h-5 text-green-500 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
              </svg>
              30-day return policy
            </li>
            <li class="flex items-start">
              <svg class="w-5 h-5 text-green-500 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
              </svg>
              Fast and free shipping
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
  <div v-else class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <p>Product not found</p>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useProductStore } from '@/stores/products'
import { useCartStore } from '@/stores/cart'
import { useWishlistStore } from '@/stores/wishlist'

const route = useRoute()
const router = useRouter()
const productStore = useProductStore()
const cartStore = useCartStore()
const wishlistStore = useWishlistStore()

const quantity = ref(1)
const product = computed(() => productStore.getProductById(route.params.id))

function increaseQuantity() {
  if (quantity.value < product.value.stock) {
    quantity.value++
  }
}

function decreaseQuantity() {
  if (quantity.value > 1) {
    quantity.value--
  }
}

function addToCart() {
  cartStore.addToCart(product.value, quantity.value)
  alert('Added to cart!')
}

function toggleWishlist() {
  if (wishlistStore.isInWishlist(product.value.id)) {
    wishlistStore.removeFromWishlist(product.value.id)
  } else {
    wishlistStore.addToWishlist(product.value)
  }
}
</script>
