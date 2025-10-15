<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <h1 class="text-3xl font-bold mb-8">Shopping Cart</h1>

    <div v-if="cartStore.items.length === 0" class="text-center py-16">
      <svg class="w-24 h-24 mx-auto mb-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"/>
      </svg>
      <p class="text-gray-600 text-lg mb-4">Your cart is empty</p>
      <router-link to="/products" class="btn-primary">Continue Shopping</router-link>
    </div>

    <div v-else class="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div class="lg:col-span-2">
        <div v-for="item in cartStore.items" :key="item.id" class="card mb-4">
          <div class="flex gap-4">
            <img :src="item.image" :alt="item.name" class="w-24 h-24 object-cover rounded-lg" />
            <div class="flex-1">
              <h3 class="font-semibold">{{ item.name }}</h3>
              <p class="text-gray-600 text-sm">{{ item.category }}</p>
              <p class="text-primary-600 font-bold mt-2">${{ item.price }}</p>
            </div>
            <div class="flex flex-col items-end justify-between">
              <button @click="removeItem(item.id)" class="text-red-500 hover:text-red-700">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
                </svg>
              </button>
              <div class="flex items-center space-x-2">
                <button @click="updateQuantity(item.id, item.quantity - 1)" class="px-2 py-1 border rounded hover:bg-gray-100">-</button>
                <span class="px-3">{{ item.quantity }}</span>
                <button @click="updateQuantity(item.id, item.quantity + 1)" class="px-2 py-1 border rounded hover:bg-gray-100">+</button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="lg:col-span-1">
        <div class="card sticky top-24">
          <h2 class="text-xl font-bold mb-4">Order Summary</h2>
          <div class="space-y-2 mb-4">
            <div class="flex justify-between">
              <span>Subtotal</span>
              <span>${{ cartStore.totalPrice.toFixed(2) }}</span>
            </div>
            <div class="flex justify-between">
              <span>Shipping</span>
              <span>$5.00</span>
            </div>
            <div class="flex justify-between">
              <span>Tax</span>
              <span>${{ (cartStore.totalPrice * 0.1).toFixed(2) }}</span>
            </div>
            <div class="border-t pt-2 flex justify-between font-bold text-lg">
              <span>Total</span>
              <span>${{ (cartStore.totalPrice + 5 + cartStore.totalPrice * 0.1).toFixed(2) }}</span>
            </div>
          </div>
          <router-link to="/checkout" class="btn-primary w-full block text-center">Proceed to Checkout</router-link>
          <router-link to="/products" class="btn-secondary w-full block text-center mt-2">Continue Shopping</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useCartStore } from '@/stores/cart'

const cartStore = useCartStore()

function removeItem(id) {
  cartStore.removeFromCart(id)
}

function updateQuantity(id, quantity) {
  cartStore.updateQuantity(id, quantity)
}
</script>
