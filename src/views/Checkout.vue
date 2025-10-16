<template>
  <div class="min-h-screen bg-gradient-to-br from-gray-50 to-purple-50/30 py-12">
    <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="mb-8">
        <h1 class="text-4xl font-display font-bold mb-2 gradient-text">Checkout</h1>
        <p class="text-gray-600">Complete your purchase securely</p>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div class="lg:col-span-2 space-y-6">
          <div class="card">
            <div class="flex items-center gap-3 mb-6">
              <div class="w-10 h-10 rounded-full bg-gradient-to-r from-primary-600 to-purple-600 text-white flex items-center justify-center font-bold">
                1
              </div>
              <h2 class="text-2xl font-display font-semibold">Shipping Information</h2>
            </div>
            <div class="space-y-4">
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input type="text" v-model="shipping.firstName" placeholder="First Name *" class="input-field" />
                <input type="text" v-model="shipping.lastName" placeholder="Last Name *" class="input-field" />
              </div>
              <input type="email" v-model="shipping.email" placeholder="Email Address *" class="input-field" />
              <input type="tel" v-model="shipping.phone" placeholder="Phone Number *" class="input-field" />
              <input type="text" v-model="shipping.address" placeholder="Street Address *" class="input-field" />
              <input type="text" v-model="shipping.apartment" placeholder="Apartment, suite, etc. (optional)" class="input-field" />
              <div class="grid grid-cols-2 gap-4">
                <input type="text" v-model="shipping.city" placeholder="City *" class="input-field" />
                <input type="text" v-model="shipping.state" placeholder="State *" class="input-field" />
              </div>
              <div class="grid grid-cols-2 gap-4">
                <input type="text" v-model="shipping.zip" placeholder="ZIP Code *" class="input-field" />
                <input type="text" v-model="shipping.country" placeholder="Country *" class="input-field" />
              </div>
            </div>
          </div>

          <div class="card">
            <div class="flex items-center gap-3 mb-6">
              <div class="w-10 h-10 rounded-full bg-gradient-to-r from-primary-600 to-purple-600 text-white flex items-center justify-center font-bold">
                2
              </div>
              <h2 class="text-2xl font-display font-semibold">Shipping Method</h2>
            </div>
            <div class="space-y-3">
              <label class="flex items-center gap-4 p-4 border-2 rounded-xl cursor-pointer hover:border-primary-500 hover:bg-primary-50/50 transition-all" :class="shippingMethod === 'standard' ? 'border-primary-600 bg-primary-50' : 'border-gray-200'">
                <input type="radio" v-model="shippingMethod" value="standard" class="text-primary-600 focus:ring-primary-500" />
                <div class="flex-1">
                  <p class="font-semibold text-gray-900">Standard Shipping</p>
                  <p class="text-sm text-gray-600">5-7 business days</p>
                </div>
                <span class="font-bold text-green-600">FREE</span>
              </label>
              <label class="flex items-center gap-4 p-4 border-2 rounded-xl cursor-pointer hover:border-primary-500 hover:bg-primary-50/50 transition-all" :class="shippingMethod === 'express' ? 'border-primary-600 bg-primary-50' : 'border-gray-200'">
                <input type="radio" v-model="shippingMethod" value="express" class="text-primary-600 focus:ring-primary-500" />
                <div class="flex-1">
                  <p class="font-semibold text-gray-900">Express Shipping</p>
                  <p class="text-sm text-gray-600">2-3 business days</p>
                </div>
                <span class="font-bold text-gray-900">$15.00</span>
              </label>
            </div>
          </div>

          <div class="card">
            <div class="flex items-center gap-3 mb-6">
              <div class="w-10 h-10 rounded-full bg-gradient-to-r from-primary-600 to-purple-600 text-white flex items-center justify-center font-bold">
                3
              </div>
              <h2 class="text-2xl font-display font-semibold">Payment Method</h2>
            </div>
            <div class="space-y-3">
              <label class="flex items-center gap-4 p-4 border-2 rounded-xl cursor-pointer hover:border-primary-500 hover:bg-primary-50/50 transition-all" :class="paymentMethod === 'card' ? 'border-primary-600 bg-primary-50' : 'border-gray-200'">
                <input type="radio" v-model="paymentMethod" value="card" class="text-primary-600 focus:ring-primary-500" />
                <div class="flex-1">
                  <p class="font-semibold text-gray-900">Credit/Debit Card</p>
                  <p class="text-sm text-gray-600">Visa, Mastercard, Amex</p>
                </div>
                <div class="flex gap-2">
                  <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"/>
                  </svg>
                </div>
              </label>
              
              <label class="flex items-center gap-4 p-4 border-2 rounded-xl cursor-pointer hover:border-primary-500 hover:bg-primary-50/50 transition-all" :class="paymentMethod === 'paypal' ? 'border-primary-600 bg-primary-50' : 'border-gray-200'">
                <input type="radio" v-model="paymentMethod" value="paypal" class="text-primary-600 focus:ring-primary-500" />
                <div class="flex-1">
                  <p class="font-semibold text-gray-900">PayPal</p>
                  <p class="text-sm text-gray-600">Fast and secure</p>
                </div>
                <svg class="w-16 h-8 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M7.076 21.337H2.47a.641.641 0 0 1-.633-.74L4.944 3.72a.773.773 0 0 1 .763-.656h8.82c2.142 0 4.09.824 5.488 2.318 1.398 1.495 2.046 3.475 1.824 5.575-.24 2.27-1.472 4.338-3.472 5.826-2 1.488-4.515 2.306-7.084 2.306h-1.81a.773.773 0 0 0-.764.656l-.868 2.592z"/>
                </svg>
              </label>
              
              <label class="flex items-center gap-4 p-4 border-2 rounded-xl cursor-pointer hover:border-primary-500 hover:bg-primary-50/50 transition-all" :class="paymentMethod === 'cod' ? 'border-primary-600 bg-primary-50' : 'border-gray-200'">
                <input type="radio" v-model="paymentMethod" value="cod" class="text-primary-600 focus:ring-primary-500" />
                <div class="flex-1">
                  <p class="font-semibold text-gray-900">Cash on Delivery</p>
                  <p class="text-sm text-gray-600">Pay when you receive</p>
                </div>
                <svg class="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"/>
                </svg>
              </label>
            </div>
          </div>
        </div>

        <div class="lg:col-span-1">
          <div class="card sticky top-24 bg-gradient-to-br from-white to-purple-50/50">
            <h2 class="text-2xl font-display font-bold mb-6 gradient-text">Order Summary</h2>
            
            <div class="space-y-3 mb-6 max-h-64 overflow-y-auto">
              <div v-for="item in cartStore.items" :key="item.id" class="flex items-center gap-3 pb-3 border-b border-gray-200">
                <div class="relative">
                  <img :src="item.image" :alt="item.name" class="w-16 h-16 object-cover rounded-lg" />
                  <span class="absolute -top-2 -right-2 bg-gradient-to-r from-primary-600 to-purple-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold">
                    {{ item.quantity }}
                  </span>
                </div>
                <div class="flex-1 min-w-0">
                  <p class="font-semibold text-sm text-gray-900 truncate">{{ item.name }}</p>
                  <p class="text-gray-600 text-xs">${{ item.price.toFixed(2) }} each</p>
                </div>
                <p class="font-bold text-gray-900">${{ (item.price * item.quantity).toFixed(2) }}</p>
              </div>
            </div>
            
            <div class="space-y-3 mb-6">
              <div class="flex justify-between text-gray-600">
                <span>Subtotal</span>
                <span class="font-semibold text-gray-900">${{ cartStore.totalPrice.toFixed(2) }}</span>
              </div>
              <div class="flex justify-between text-gray-600">
                <span>Shipping</span>
                <span class="font-semibold" :class="shippingMethod === 'standard' ? 'text-green-600' : 'text-gray-900'">
                  {{ shippingMethod === 'standard' ? 'FREE' : '$15.00' }}
                </span>
              </div>
              <div class="flex justify-between text-gray-600">
                <span>Tax (10%)</span>
                <span class="font-semibold text-gray-900">${{ (cartStore.totalPrice * 0.1).toFixed(2) }}</span>
              </div>
              <div class="border-t-2 border-dashed border-gray-300 pt-4 flex justify-between items-center">
                <span class="text-xl font-semibold text-gray-900">Total</span>
                <span class="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary-600 to-purple-600">
                  ${{ finalTotal }}
                </span>
              </div>
            </div>
            
            <button @click="placeOrder" class="btn-primary w-full py-4 text-lg mb-4">
              <svg class="w-6 h-6 inline mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.40A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/>
              </svg>
              Place Order
            </button>
            
            <div class="flex items-center justify-center gap-2 text-sm text-gray-600">
              <svg class="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
              </svg>
              <span>Secure SSL encrypted checkout</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useCartStore } from '@/stores/cart'
import { useOrderStore } from '@/stores/orders'

const router = useRouter()
const cartStore = useCartStore()
const orderStore = useOrderStore()

const shipping = ref({
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  address: '',
  apartment: '',
  city: '',
  state: '',
  zip: '',
  country: ''
})

const shippingMethod = ref('standard')
const paymentMethod = ref('card')

const finalTotal = computed(() => {
  const subtotal = cartStore.totalPrice
  const shippingCost = shippingMethod.value === 'standard' ? 0 : 15
  const tax = subtotal * 0.1
  return (subtotal + shippingCost + tax).toFixed(2)
})

function placeOrder() {
  const order = {
    items: cartStore.items,
    total: parseFloat(finalTotal.value),
    shipping: {
      address: `${shipping.value.address}, ${shipping.value.apartment ? shipping.value.apartment + ', ' : ''}${shipping.value.city}, ${shipping.value.state} ${shipping.value.zip}, ${shipping.value.country}`,
      method: shippingMethod.value === 'standard' ? 'Standard Shipping' : 'Express Shipping'
    },
    paymentMethod: paymentMethod.value
  }
  
  orderStore.createOrder(order)
  cartStore.clearCart()
  alert('Order placed successfully!')
  router.push('/orders')
}
</script>
