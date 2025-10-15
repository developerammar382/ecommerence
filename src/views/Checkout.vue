<template>
  <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <h1 class="text-3xl font-bold mb-8">Checkout</h1>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
      <div>
        <div class="card mb-6">
          <h2 class="text-xl font-semibold mb-4">Shipping Information</h2>
          <div class="space-y-4">
            <input type="text" v-model="shipping.name" placeholder="Full Name" class="input-field" />
            <input type="email" v-model="shipping.email" placeholder="Email" class="input-field" />
            <input type="text" v-model="shipping.address" placeholder="Address" class="input-field" />
            <div class="grid grid-cols-2 gap-4">
              <input type="text" v-model="shipping.city" placeholder="City" class="input-field" />
              <input type="text" v-model="shipping.zip" placeholder="ZIP Code" class="input-field" />
            </div>
          </div>
        </div>

        <div class="card">
          <h2 class="text-xl font-semibold mb-4">Payment Method</h2>
          <div class="space-y-4">
            <label class="flex items-center p-4 border rounded-lg cursor-pointer hover:bg-gray-50">
              <input type="radio" v-model="paymentMethod" value="card" class="mr-3" />
              <span class="flex-1">Credit/Debit Card</span>
              <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"/>
              </svg>
            </label>
            <label class="flex items-center p-4 border rounded-lg cursor-pointer hover:bg-gray-50">
              <input type="radio" v-model="paymentMethod" value="paypal" class="mr-3" />
              <span class="flex-1">PayPal</span>
              <svg class="w-8 h-8 text-blue-500" fill="currentColor" viewBox="0 0 24 24">
                <path d="M7.076 21.337H2.47a.641.641 0 0 1-.633-.74L4.944 3.72a.773.773 0 0 1 .763-.656h8.82c2.142 0 4.09.824 5.488 2.318 1.398 1.495 2.046 3.475 1.824 5.575-.24 2.27-1.472 4.338-3.472 5.826-2 1.488-4.515 2.306-7.084 2.306h-1.81a.773.773 0 0 0-.764.656l-.868 2.592z"/>
              </svg>
            </label>
            <label class="flex items-center p-4 border rounded-lg cursor-pointer hover:bg-gray-50">
              <input type="radio" v-model="paymentMethod" value="cod" class="mr-3" />
              <span class="flex-1">Cash on Delivery</span>
              <svg class="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"/>
              </svg>
            </label>
          </div>
        </div>
      </div>

      <div>
        <div class="card sticky top-24">
          <h2 class="text-xl font-semibold mb-4">Order Summary</h2>
          <div class="space-y-3 mb-4 max-h-64 overflow-y-auto">
            <div v-for="item in cartStore.items" :key="item.id" class="flex items-center gap-3 pb-3 border-b">
              <img :src="item.image" :alt="item.name" class="w-16 h-16 object-cover rounded" />
              <div class="flex-1">
                <p class="font-semibold text-sm">{{ item.name }}</p>
                <p class="text-gray-600 text-xs">Qty: {{ item.quantity }}</p>
              </div>
              <p class="font-semibold">${{ (item.price * item.quantity).toFixed(2) }}</p>
            </div>
          </div>
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
          <button @click="placeOrder" class="btn-primary w-full">Place Order</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useCartStore } from '@/stores/cart'
import { useOrderStore } from '@/stores/orders'

const router = useRouter()
const cartStore = useCartStore()
const orderStore = useOrderStore()

const shipping = ref({
  name: '',
  email: '',
  address: '',
  city: '',
  zip: ''
})

const paymentMethod = ref('card')

function placeOrder() {
  const order = {
    items: cartStore.items,
    total: cartStore.totalPrice + 5 + cartStore.totalPrice * 0.1,
    shipping: {
      address: `${shipping.value.address}, ${shipping.value.city} ${shipping.value.zip}`,
      method: 'Standard Shipping'
    }
  }
  
  orderStore.createOrder(order)
  cartStore.clearCart()
  alert('Order placed successfully!')
  router.push('/orders')
}
</script>
