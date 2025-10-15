<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <h1 class="text-3xl font-bold mb-8">My Orders</h1>

    <div v-if="orderStore.orders.length === 0" class="text-center py-16">
      <p class="text-gray-600 text-lg">No orders yet</p>
      <router-link to="/products" class="btn-primary mt-4">Start Shopping</router-link>
    </div>

    <div v-else class="space-y-6">
      <div v-for="order in orderStore.orders" :key="order.id" class="card">
        <div class="flex justify-between items-start mb-4">
          <div>
            <h3 class="font-semibold text-lg">Order {{ order.id }}</h3>
            <p class="text-gray-600 text-sm">Placed on {{ order.date }}</p>
          </div>
          <span :class="['px-3 py-1 rounded-full text-sm font-medium', getStatusClass(order.status)]">
            {{ order.status }}
          </span>
        </div>

        <div class="space-y-3 mb-4">
          <div v-for="item in order.items" :key="item.id" class="flex items-center gap-4 pb-3 border-b last:border-0">
            <div class="flex-1">
              <p class="font-semibold">{{ item.name }}</p>
              <p class="text-gray-600 text-sm">Quantity: {{ item.quantity }}</p>
            </div>
            <p class="font-semibold">${{ (item.price * item.quantity).toFixed(2) }}</p>
          </div>
        </div>

        <div class="flex justify-between items-center pt-4 border-t">
          <div class="text-sm text-gray-600">
            <p>{{ order.shipping.address }}</p>
            <p>{{ order.shipping.method }}</p>
          </div>
          <div class="text-right">
            <p class="text-sm text-gray-600">Total</p>
            <p class="text-2xl font-bold text-primary-600">${{ order.total.toFixed(2) }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useOrderStore } from '@/stores/orders'

const orderStore = useOrderStore()

function getStatusClass(status) {
  switch (status) {
    case 'Delivered':
      return 'bg-green-100 text-green-800'
    case 'In Transit':
      return 'bg-blue-100 text-blue-800'
    case 'Processing':
      return 'bg-yellow-100 text-yellow-800'
    default:
      return 'bg-gray-100 text-gray-800'
  }
}
</script>
