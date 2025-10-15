<template>
  <div>
    <section class="bg-gradient-to-r from-primary-600 to-primary-800 text-white py-20">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center">
          <h1 class="text-5xl font-bold mb-4">Welcome to ShopHub</h1>
          <p class="text-xl mb-8">Discover amazing products at unbeatable prices</p>
          <router-link to="/products" class="bg-white text-primary-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 inline-block">
            Shop Now
          </router-link>
        </div>
      </div>
    </section>

    <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <h2 class="text-3xl font-bold mb-8">Shop by Category</h2>
      <div class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
        <router-link 
          v-for="category in categories" 
          :key="category.id" 
          :to="`/products?category=${category.id}`"
          class="card text-center hover:shadow-lg transition-shadow cursor-pointer"
        >
          <div class="text-4xl mb-2">{{ category.icon }}</div>
          <h3 class="font-semibold">{{ category.name }}</h3>
        </router-link>
      </div>
    </section>

    <section class="bg-gray-100 py-16">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 class="text-3xl font-bold mb-8">Featured Products</h2>
        <div class="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
          <div v-for="product in featuredProducts" :key="product.id" class="card hover:shadow-lg transition-shadow">
            <img :src="product.image" :alt="product.name" class="w-full h-48 object-cover rounded-lg mb-4" />
            <h3 class="font-semibold mb-2">{{ product.name }}</h3>
            <p class="text-gray-600 text-sm mb-2">{{ product.description }}</p>
            <div class="flex items-center justify-between">
              <span class="text-2xl font-bold text-primary-600">${{ product.price }}</span>
              <router-link :to="`/products/${product.id}`" class="btn-primary text-sm">View</router-link>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div class="text-center">
          <svg class="w-16 h-16 mx-auto mb-4 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"/>
          </svg>
          <h3 class="text-xl font-semibold mb-2">Free Shipping</h3>
          <p class="text-gray-600">On orders over $50</p>
        </div>
        <div class="text-center">
          <svg class="w-16 h-16 mx-auto mb-4 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/>
          </svg>
          <h3 class="text-xl font-semibold mb-2">Secure Payment</h3>
          <p class="text-gray-600">100% secure transactions</p>
        </div>
        <div class="text-center">
          <svg class="w-16 h-16 mx-auto mb-4 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6"/>
          </svg>
          <h3 class="text-xl font-semibold mb-2">Easy Returns</h3>
          <p class="text-gray-600">30-day return policy</p>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { useProductStore } from '@/stores/products'

const productStore = useProductStore()
const categories = productStore.categories
const featuredProducts = productStore.featuredProducts
</script>
