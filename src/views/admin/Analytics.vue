<template>
  <div>
    <h1 class="text-3xl font-bold mb-8">Analytics & Insights</h1>

    <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
      <div class="card">
        <h3 class="text-gray-600 text-sm mb-2">Today's Sales</h3>
        <p class="text-2xl font-bold text-primary-600">${{ adminStore.salesData.today.toLocaleString() }}</p>
      </div>
      <div class="card">
        <h3 class="text-gray-600 text-sm mb-2">This Week</h3>
        <p class="text-2xl font-bold text-primary-600">${{ adminStore.salesData.thisWeek.toLocaleString() }}</p>
      </div>
      <div class="card">
        <h3 class="text-gray-600 text-sm mb-2">This Month</h3>
        <p class="text-2xl font-bold text-primary-600">${{ adminStore.salesData.thisMonth.toLocaleString() }}</p>
      </div>
      <div class="card">
        <h3 class="text-gray-600 text-sm mb-2">Growth Rate</h3>
        <p class="text-2xl font-bold text-green-600">+{{ adminStore.salesData.growthRate }}%</p>
      </div>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
      <div class="card">
        <h2 class="text-xl font-semibold mb-4">Sales by Category</h2>
        <div class="space-y-3">
          <div v-for="category in categories" :key="category.id" class="flex items-center justify-between">
            <span>{{ category.icon }} {{ category.name }}</span>
            <div class="flex items-center gap-3">
              <div class="w-32 bg-gray-200 rounded-full h-2">
                <div class="bg-primary-600 h-2 rounded-full" :style="{ width: `${Math.random() * 100}%` }"></div>
              </div>
              <span class="text-sm font-semibold">${{ (Math.random() * 50000).toFixed(0) }}</span>
            </div>
          </div>
        </div>
      </div>

      <div class="card">
        <h2 class="text-xl font-semibold mb-4">Customer Insights</h2>
        <div class="space-y-4">
          <div class="flex justify-between">
            <span class="text-gray-600">New Customers (This Month)</span>
            <span class="font-bold">1,247</span>
          </div>
          <div class="flex justify-between">
            <span class="text-gray-600">Returning Customers</span>
            <span class="font-bold">7,687</span>
          </div>
          <div class="flex justify-between">
            <span class="text-gray-600">Average Order Value</span>
            <span class="font-bold">$124.50</span>
          </div>
          <div class="flex justify-between">
            <span class="text-gray-600">Customer Lifetime Value</span>
            <span class="font-bold">$892.30</span>
          </div>
        </div>
      </div>
    </div>

    <div class="card">
      <h2 class="text-xl font-semibold mb-4">AI-Powered Insights</h2>
      <div class="space-y-4">
        <div class="p-4 bg-blue-50 rounded-lg">
          <div class="flex items-start">
            <svg class="w-6 h-6 text-blue-600 mr-3 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"/>
            </svg>
            <div>
              <h4 class="font-semibold mb-1">Demand Forecast</h4>
              <p class="text-sm text-gray-600">Electronics category expected to see 23% increase in demand next week based on trending patterns.</p>
            </div>
          </div>
        </div>
        <div class="p-4 bg-green-50 rounded-lg">
          <div class="flex items-start">
            <svg class="w-6 h-6 text-green-600 mr-3 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"/>
            </svg>
            <div>
              <h4 class="font-semibold mb-1">Revenue Optimization</h4>
              <p class="text-sm text-gray-600">Adjusting prices for high-demand items could potentially increase revenue by $15,200 this month.</p>
            </div>
          </div>
        </div>
        <div class="p-4 bg-purple-50 rounded-lg">
          <div class="flex items-start">
            <svg class="w-6 h-6 text-purple-600 mr-3 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"/>
            </svg>
            <div>
              <h4 class="font-semibold mb-1">Customer Behavior</h4>
              <p class="text-sm text-gray-600">Peak shopping hours: 7-9 PM. Consider targeted promotions during these times for maximum impact.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useAdminStore } from '@/stores/admin'
import { useProductStore } from '@/stores/products'

const adminStore = useAdminStore()
const productStore = useProductStore()
const categories = productStore.categories
</script>
