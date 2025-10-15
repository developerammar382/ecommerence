<template>
  <div>
    <h1 class="text-3xl font-bold mb-8">Dashboard</h1>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <div class="card">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-gray-600 text-sm">Total Revenue</p>
            <p class="text-3xl font-bold text-primary-600">${{ (adminStore.dashboardStats.revenue / 1000).toFixed(1) }}k</p>
            <p class="text-green-500 text-sm mt-1">+{{ adminStore.salesData.growthRate }}% this month</p>
          </div>
          <svg class="w-12 h-12 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
          </svg>
        </div>
      </div>

      <div class="card">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-gray-600 text-sm">Total Orders</p>
            <p class="text-3xl font-bold">{{ adminStore.dashboardStats.totalOrders }}</p>
            <p class="text-orange-500 text-sm mt-1">{{ adminStore.dashboardStats.pendingOrders }} pending</p>
          </div>
          <svg class="w-12 h-12 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"/>
          </svg>
        </div>
      </div>

      <div class="card">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-gray-600 text-sm">Total Products</p>
            <p class="text-3xl font-bold">{{ adminStore.dashboardStats.totalProducts }}</p>
            <p class="text-red-500 text-sm mt-1">{{ adminStore.dashboardStats.lowStockItems }} low stock</p>
          </div>
          <svg class="w-12 h-12 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"/>
          </svg>
        </div>
      </div>

      <div class="card">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-gray-600 text-sm">Total Customers</p>
            <p class="text-3xl font-bold">{{ adminStore.dashboardStats.totalCustomers }}</p>
            <p class="text-gray-500 text-sm mt-1">Active users</p>
          </div>
          <svg class="w-12 h-12 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"/>
          </svg>
        </div>
      </div>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
      <div class="card">
        <h2 class="text-xl font-semibold mb-4">Recent Orders</h2>
        <div class="overflow-x-auto">
          <table class="w-full">
            <thead>
              <tr class="border-b">
                <th class="text-left py-2">Order ID</th>
                <th class="text-left py-2">Customer</th>
                <th class="text-left py-2">Amount</th>
                <th class="text-left py-2">Status</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="order in adminStore.recentOrders" :key="order.id" class="border-b">
                <td class="py-3">{{ order.id }}</td>
                <td class="py-3">{{ order.customer }}</td>
                <td class="py-3">${{ order.amount }}</td>
                <td class="py-3">
                  <span :class="['px-2 py-1 rounded-full text-xs', getStatusClass(order.status)]">
                    {{ order.status }}
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div class="card">
        <h2 class="text-xl font-semibold mb-4">Top Products</h2>
        <div class="space-y-3">
          <div v-for="product in adminStore.topProducts" :key="product.id" class="flex items-center justify-between">
            <div>
              <p class="font-semibold">{{ product.name }}</p>
              <p class="text-sm text-gray-600">{{ product.sales }} sales</p>
            </div>
            <p class="font-bold text-primary-600">${{ product.revenue.toLocaleString() }}</p>
          </div>
        </div>
      </div>
    </div>

    <div class="card">
      <h2 class="text-xl font-semibold mb-4">Inventory Alerts</h2>
      <div class="space-y-3">
        <div v-for="alert in adminStore.inventoryAlerts" :key="alert.id" class="flex items-center justify-between p-3 bg-orange-50 rounded-lg">
          <div class="flex items-center">
            <svg class="w-6 h-6 text-orange-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/>
            </svg>
            <div>
              <p class="font-semibold">{{ alert.product }}</p>
              <p class="text-sm text-gray-600">Stock: {{ alert.stock }} (Threshold: {{ alert.threshold }})</p>
            </div>
          </div>
          <button class="btn-primary text-sm">Reorder</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useAdminStore } from '@/stores/admin'

const adminStore = useAdminStore()

function getStatusClass(status) {
  switch (status) {
    case 'Delivered':
      return 'bg-green-100 text-green-800'
    case 'Shipped':
      return 'bg-blue-100 text-blue-800'
    case 'Processing':
      return 'bg-yellow-100 text-yellow-800'
    default:
      return 'bg-gray-100 text-gray-800'
  }
}
</script>
