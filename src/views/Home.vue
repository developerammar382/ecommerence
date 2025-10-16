<template>
  <div>
    <HeroBanner />

    <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <div class="text-center mb-12">
        <h2 class="text-4xl font-display font-bold mb-4 gradient-text">Shop by Category</h2>
        <p class="text-gray-600 text-lg">Browse through our wide range of products</p>
      </div>
      <div class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-6">
        <router-link 
          v-for="category in categories" 
          :key="category.id" 
          :to="`/products?category=${category.id}`"
          class="group relative card-hover text-center"
        >
          <div class="bg-gradient-to-br from-primary-50 to-purple-50 rounded-full w-20 h-20 mx-auto mb-4 flex items-center justify-center group-hover:from-primary-100 group-hover:to-purple-100 transition-all duration-300">
            <component :is="category.iconComponent" class="w-10 h-10 text-primary-600" />
          </div>
          <h3 class="font-semibold text-gray-900 group-hover:text-primary-600 transition-colors">{{ category.name }}</h3>
        </router-link>
      </div>
    </section>

    <section class="bg-gradient-to-br from-gray-50 to-purple-50/30 py-20">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-12">
          <h2 class="text-4xl font-display font-bold mb-4 gradient-text">Featured Products</h2>
          <p class="text-gray-600 text-lg">Handpicked products just for you</p>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
          <div v-for="product in featuredProducts" :key="product.id" class="card-hover group">
            <div class="relative overflow-hidden rounded-xl mb-4">
              <img :src="product.image" :alt="product.name" class="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500" />
              <div class="absolute top-2 right-2 bg-primary-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                New
              </div>
            </div>
            <h3 class="font-semibold text-lg mb-2 text-gray-900">{{ product.name }}</h3>
            <p class="text-gray-600 text-sm mb-4 line-clamp-2">{{ product.description }}</p>
            <div class="flex items-center justify-between">
              <span class="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary-600 to-purple-600">${{ product.price }}</span>
              <router-link :to="`/products/${product.id}`" class="btn-primary text-sm">View Details</router-link>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div class="text-center group">
          <div class="bg-gradient-to-br from-primary-50 to-purple-50 rounded-full w-24 h-24 mx-auto mb-6 flex items-center justify-center group-hover:from-primary-100 group-hover:to-purple-100 transition-all duration-300">
            <svg class="w-12 h-12 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"/>
            </svg>
          </div>
          <h3 class="text-xl font-semibold mb-2 text-gray-900">Free Shipping</h3>
          <p class="text-gray-600">On orders over $50</p>
        </div>
        <div class="text-center group">
          <div class="bg-gradient-to-br from-primary-50 to-purple-50 rounded-full w-24 h-24 mx-auto mb-6 flex items-center justify-center group-hover:from-primary-100 group-hover:to-purple-100 transition-all duration-300">
            <svg class="w-12 h-12 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/>
            </svg>
          </div>
          <h3 class="text-xl font-semibold mb-2 text-gray-900">Secure Payment</h3>
          <p class="text-gray-600">100% secure transactions</p>
        </div>
        <div class="text-center group">
          <div class="bg-gradient-to-br from-primary-50 to-purple-50 rounded-full w-24 h-24 mx-auto mb-6 flex items-center justify-center group-hover:from-primary-100 group-hover:to-purple-100 transition-all duration-300">
            <svg class="w-12 h-12 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/>
            </svg>
          </div>
          <h3 class="text-xl font-semibold mb-2 text-gray-900">Easy Returns</h3>
          <p class="text-gray-600">30-day return policy</p>
        </div>
      </div>
    </section>

    <section class="bg-gradient-to-r from-primary-600 to-purple-600 text-white py-20">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 class="text-4xl font-display font-bold mb-6">Join Our Community</h2>
            <p class="text-xl text-purple-100 mb-8">Get exclusive deals, early access to new products, and special offers delivered to your inbox.</p>
            <div class="flex gap-4">
              <input 
                type="email" 
                placeholder="Enter your email" 
                class="flex-1 px-6 py-4 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-purple-300"
              />
              <button class="bg-white text-primary-600 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                Subscribe
              </button>
            </div>
          </div>
          <div class="grid grid-cols-2 gap-6">
            <div class="text-center">
              <div class="text-5xl font-bold mb-2">10K+</div>
              <div class="text-purple-200">Happy Customers</div>
            </div>
            <div class="text-center">
              <div class="text-5xl font-bold mb-2">50K+</div>
              <div class="text-purple-200">Products Sold</div>
            </div>
            <div class="text-center">
              <div class="text-5xl font-bold mb-2">100+</div>
              <div class="text-purple-200">Brand Partners</div>
            </div>
            <div class="text-center">
              <div class="text-5xl font-bold mb-2">4.9★</div>
              <div class="text-purple-200">Average Rating</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { useProductStore } from '@/stores/products'
import { h } from 'vue'
import HeroBanner from '@/components/HeroBanner.vue'

const productStore = useProductStore()
const categories = productStore.categories
const featuredProducts = productStore.featuredProducts
</script>
