<template>
  <div class="card-hover group">
    <div class="relative overflow-hidden rounded-lg mb-4">
      <img 
        :src="product.image" 
        :alt="product.name" 
        class="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-110"
      />
      <div class="absolute top-2 right-2 space-y-2">
        <button 
          @click.stop="toggleWishlist"
          class="p-2 bg-white rounded-full shadow-md hover:bg-red-50 transition-colors"
          :class="{ 'text-red-500': isInWishlist, 'text-gray-400': !isInWishlist }"
        >
          <svg class="w-5 h-5" :fill="isInWishlist ? 'currentColor' : 'none'" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>
          </svg>
        </button>
        <button 
          v-if="canTryOn"
          @click.stop="$emit('try-on', product)"
          class="p-2 bg-white rounded-full shadow-md hover:bg-purple-50 transition-colors text-purple-600"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
          </svg>
        </button>
      </div>
      <div v-if="product.stock > 0 && product.stock < 10" class="absolute top-2 left-2">
        <span class="badge-warning">Only {{ product.stock }} left</span>
      </div>
      <div v-if="product.featured" class="absolute top-2 left-2">
        <span class="badge-primary">Featured</span>
      </div>
    </div>
    
    <router-link :to="`/products/${product.id}`" class="block">
      <h3 class="font-semibold text-lg mb-2 line-clamp-2 group-hover:text-primary-600 transition-colors">
        {{ product.name }}
      </h3>
      <p class="text-gray-600 text-sm mb-3 line-clamp-2">{{ product.description }}</p>
      
      <div class="flex items-center mb-3">
        <div class="flex items-center">
          <svg v-for="i in 5" :key="i" class="w-4 h-4" 
            :class="i <= Math.round(product.rating || 0) ? 'text-yellow-400' : 'text-gray-300'"
            fill="currentColor" viewBox="0 0 20 20">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
          </svg>
          <span class="ml-2 text-sm text-gray-600">({{ product.reviews || 0 }})</span>
        </div>
      </div>
      
      <div class="flex items-center justify-between">
        <div>
          <span class="text-2xl font-bold text-primary-600">${{ (product.price || 0).toFixed(2) }}</span>
        </div>
        <button 
          @click.stop="addToCart"
          class="btn-primary text-sm flex items-center gap-2"
          :disabled="product.stock === 0"
        >
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"/>
          </svg>
          {{ product.stock === 0 ? 'Out of Stock' : 'Add to Cart' }}
        </button>
      </div>
    </router-link>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useWishlistStore } from '@/stores/wishlist'
import { useCartStore } from '@/stores/cart'

const props = defineProps({
  product: {
    type: Object,
    required: true
  }
})

defineEmits(['try-on'])

const wishlistStore = useWishlistStore()
const cartStore = useCartStore()

const isInWishlist = computed(() => wishlistStore.isInWishlist(props.product.id))

const canTryOn = computed(() => {
  const tryOnCategories = [1, 2, 3]
  return tryOnCategories.includes(props.product.categoryId)
})

function toggleWishlist() {
  wishlistStore.toggleWishlist(props.product)
}

function addToCart() {
  if (props.product.stock > 0) {
    cartStore.addToCart(props.product)
  }
}
</script>
