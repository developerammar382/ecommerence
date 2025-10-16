<template>
  <div class="min-h-screen bg-gradient-to-br from-gray-50 to-purple-50/30 py-12">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <h1 class="text-4xl font-display font-bold mb-2 gradient-text">Shopping Cart</h1>
      <p class="text-gray-600 mb-8">{{ cartStore.items.length }} {{ cartStore.items.length === 1 ? 'item' : 'items' }} in your cart</p>

      <div v-if="cartStore.items.length === 0" class="text-center py-20">
        <div class="bg-white rounded-2xl shadow-soft p-12 max-w-md mx-auto">
          <div class="bg-gradient-to-br from-primary-50 to-purple-50 rounded-full w-32 h-32 mx-auto mb-6 flex items-center justify-center">
            <svg class="w-16 h-16 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"/>
            </svg>
          </div>
          <p class="text-gray-900 text-xl font-semibold mb-2">Your cart is empty</p>
          <p class="text-gray-600 mb-6">Looks like you haven't added anything to your cart yet</p>
          <router-link to="/products" class="btn-primary inline-block">Start Shopping</router-link>
        </div>
      </div>

      <div v-else class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div class="lg:col-span-2 space-y-4">
          <div v-for="item in cartStore.items" :key="item.id" class="card group hover:shadow-xl transition-all">
            <div class="flex gap-6">
              <div class="relative flex-shrink-0">
                <img :src="item.image" :alt="item.name" class="w-32 h-32 object-cover rounded-xl" />
              </div>
              <div class="flex-1 min-w-0">
                <div class="flex justify-between items-start mb-2">
                  <div>
                    <h3 class="font-semibold text-lg text-gray-900 mb-1">{{ item.name }}</h3>
                    <p class="text-gray-600 text-sm">{{ item.category }}</p>
                  </div>
                  <button @click="removeItem(item.id)" class="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors group/delete">
                    <svg class="w-5 h-5 group-hover/delete:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
                    </svg>
                  </button>
                </div>
                <p class="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary-600 to-purple-600 mb-4">${{ item.price.toFixed(2) }}</p>
                <div class="flex items-center justify-between">
                  <div class="flex items-center gap-3 bg-gray-100 rounded-lg p-1">
                    <button 
                      @click="updateQuantity(item.id, item.quantity - 1)" 
                      class="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-white transition-colors font-bold text-gray-700"
                      :disabled="item.quantity <= 1"
                    >
                      -
                    </button>
                    <span class="px-4 font-semibold text-gray-900">{{ item.quantity }}</span>
                    <button 
                      @click="updateQuantity(item.id, item.quantity + 1)" 
                      class="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-white transition-colors font-bold text-gray-700"
                    >
                      +
                    </button>
                  </div>
                  <div class="text-right">
                    <p class="text-sm text-gray-500">Subtotal</p>
                    <p class="text-xl font-bold text-gray-900">${{ (item.price * item.quantity).toFixed(2) }}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div class="card bg-gradient-to-r from-primary-50 to-purple-50 border-2 border-primary-200">
            <div class="flex items-center gap-4">
              <div class="bg-white rounded-full p-3">
                <svg class="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7"/>
                </svg>
              </div>
              <div class="flex-1">
                <h3 class="font-semibold text-gray-900 mb-1">Have a coupon code?</h3>
                <p class="text-sm text-gray-600">Enter your code to get a discount</p>
              </div>
              <input type="text" placeholder="Enter code" class="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none" />
              <button class="btn-primary">Apply</button>
            </div>
          </div>
        </div>

        <div class="lg:col-span-1">
          <div class="card sticky top-24 bg-gradient-to-br from-white to-purple-50/50">
            <h2 class="text-2xl font-display font-bold mb-6 gradient-text">Order Summary</h2>
            <div class="space-y-4 mb-6">
              <div class="flex justify-between text-gray-600">
                <span>Subtotal ({{ cartStore.totalItems }} items)</span>
                <span class="font-semibold text-gray-900">${{ cartStore.totalPrice.toFixed(2) }}</span>
              </div>
              <div class="flex justify-between text-gray-600">
                <span>Shipping</span>
                <span class="font-semibold text-green-600">Free</span>
              </div>
              <div class="flex justify-between text-gray-600">
                <span>Tax (10%)</span>
                <span class="font-semibold text-gray-900">${{ (cartStore.totalPrice * 0.1).toFixed(2) }}</span>
              </div>
              <div class="border-t-2 border-dashed border-gray-300 pt-4 flex justify-between items-center">
                <span class="text-xl font-semibold text-gray-900">Total</span>
                <span class="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary-600 to-purple-600">
                  ${{ (cartStore.totalPrice + cartStore.totalPrice * 0.1).toFixed(2) }}
                </span>
              </div>
            </div>
            
            <div class="space-y-3">
              <router-link to="/checkout" class="btn-primary w-full block text-center py-4 text-lg">
                Proceed to Checkout
              </router-link>
              <router-link to="/products" class="btn-outline w-full block text-center py-3">
                Continue Shopping
              </router-link>
            </div>
            
            <div class="mt-6 pt-6 border-t border-gray-200">
              <div class="flex items-center gap-3 text-sm text-gray-600">
                <svg class="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
                </svg>
                <span>Secure checkout guaranteed</span>
              </div>
            </div>
          </div>
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
  if (quantity > 0) {
    cartStore.updateQuantity(id, quantity)
  }
}
</script>
