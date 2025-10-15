<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <h1 class="text-3xl font-bold mb-8">My Wishlist</h1>

    <div v-if="wishlistStore.items.length === 0" class="text-center py-16">
      <svg class="w-24 h-24 mx-auto mb-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>
      </svg>
      <p class="text-gray-600 text-lg mb-4">Your wishlist is empty</p>
      <router-link to="/products" class="btn-primary">Browse Products</router-link>
    </div>

    <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <div v-for="product in wishlistStore.items" :key="product.id" class="card hover:shadow-lg transition-shadow">
        <button @click="removeFromWishlist(product.id)" class="absolute top-4 right-4 p-2 bg-white rounded-full shadow hover:bg-gray-100">
          <svg class="w-5 h-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
          </svg>
        </button>
        <img :src="product.image" :alt="product.name" class="w-full h-48 object-cover rounded-lg mb-4" />
        <h3 class="font-semibold mb-2">{{ product.name }}</h3>
        <div class="flex items-center mb-2">
          <span class="text-yellow-400">★</span>
          <span class="ml-1 text-sm">{{ product.rating }}</span>
        </div>
        <div class="flex items-center justify-between">
          <span class="text-2xl font-bold text-primary-600">${{ product.price }}</span>
          <button @click="addToCart(product)" class="btn-primary text-sm">Add to Cart</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useWishlistStore } from '@/stores/wishlist'
import { useCartStore } from '@/stores/cart'

const wishlistStore = useWishlistStore()
const cartStore = useCartStore()

function removeFromWishlist(id) {
  wishlistStore.removeFromWishlist(id)
}

function addToCart(product) {
  cartStore.addToCart(product)
  alert('Added to cart!')
}
</script>
