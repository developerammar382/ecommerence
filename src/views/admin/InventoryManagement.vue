<template>
  <div class="space-y-6">
    <div>
      <h1 class="text-4xl font-display font-bold gradient-text">Inventory Management</h1>
      <p class="text-gray-600 mt-2">Smart inventory tracking with AI-powered demand forecasting</p>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-4 gap-6">
      <div class="card gradient-bg-primary text-white hover-lift">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-white/80 text-sm mb-1">Total Stock Value</p>
            <p class="text-3xl font-bold">$284.5k</p>
          </div>
          <svg class="w-12 h-12 text-white/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
          </svg>
        </div>
      </div>

      <div class="card hover-lift">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-gray-600 text-sm mb-1">Low Stock Items</p>
            <p class="text-3xl font-bold text-orange-600">{{ lowStockCount }}</p>
          </div>
          <div class="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center">
            <svg class="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/>
            </svg>
          </div>
        </div>
      </div>

      <div class="card hover-lift">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-gray-600 text-sm mb-1">Out of Stock</p>
            <p class="text-3xl font-bold text-red-600">{{ outOfStockCount }}</p>
          </div>
          <div class="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center">
            <svg class="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
            </svg>
          </div>
        </div>
      </div>

      <div class="card hover-lift">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-gray-600 text-sm mb-1">AI Auto-Reorders</p>
            <p class="text-3xl font-bold text-green-600">12</p>
          </div>
          <div class="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
            <svg class="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/>
            </svg>
          </div>
        </div>
      </div>
    </div>

    <div class="card">
      <div class="flex justify-between items-center mb-6">
        <h2 class="text-2xl font-bold">AI Demand Forecast</h2>
        <button class="btn-primary flex items-center gap-2">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/>
          </svg>
          Run AI Analysis
        </button>
      </div>
      <div class="h-80">
        <Line :data="forecastChartData" :options="chartOptions" />
      </div>
    </div>

    <div class="card">
      <div class="flex justify-between items-center mb-6">
        <h2 class="text-2xl font-bold">Stock Levels</h2>
        <div class="flex gap-2">
          <input v-model="searchQuery" type="search" placeholder="Search products..." class="input-field w-64" />
          <select v-model="filterStatus" class="input-field">
            <option value="">All Status</option>
            <option value="in-stock">In Stock</option>
            <option value="low-stock">Low Stock</option>
            <option value="out-of-stock">Out of Stock</option>
          </select>
        </div>
      </div>

      <div class="overflow-x-auto">
        <table class="w-full">
          <thead>
            <tr class="border-b-2 border-gray-200">
              <th class="text-left py-4 px-3 text-sm font-semibold text-gray-700">Product</th>
              <th class="text-left py-4 px-3 text-sm font-semibold text-gray-700">SKU</th>
              <th class="text-left py-4 px-3 text-sm font-semibold text-gray-700">Current Stock</th>
              <th class="text-left py-4 px-3 text-sm font-semibold text-gray-700">Reorder Level</th>
              <th class="text-left py-4 px-3 text-sm font-semibold text-gray-700">AI Forecast</th>
              <th class="text-left py-4 px-3 text-sm font-semibold text-gray-700">Status</th>
              <th class="text-left py-4 px-3 text-sm font-semibold text-gray-700">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="product in filteredProducts" :key="product.id" class="border-b hover:bg-gray-50 transition-colors">
              <td class="py-4 px-3">
                <div class="flex items-center gap-3">
                  <img :src="product.image" :alt="product.name" class="w-10 h-10 object-cover rounded-lg" />
                  <span class="font-semibold text-sm">{{ product.name }}</span>
                </div>
              </td>
              <td class="py-4 px-3 text-gray-600 text-sm">SKU-{{ product.id.toString().padStart(4, '0') }}</td>
              <td class="py-4 px-3 font-semibold">{{ product.stock }}</td>
              <td class="py-4 px-3 text-sm">{{ Math.floor(product.stock * 0.2) }}</td>
              <td class="py-4 px-3">
                <div class="flex items-center gap-2">
                  <svg class="w-4 h-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"/>
                  </svg>
                  <span class="text-sm text-blue-600">{{ getForecast(product.stock) }} units/week</span>
                </div>
              </td>
              <td class="py-4 px-3">
                <span :class="['px-3 py-1 rounded-full text-xs font-medium', getStockStatus(product.stock)]">
                  {{ getStockLabel(product.stock) }}
                </span>
              </td>
              <td class="py-4 px-3">
                <div class="flex gap-2">
                  <button @click="updateStock(product)" class="p-2 hover:bg-blue-50 rounded-lg transition-colors group">
                    <svg class="w-4 h-4 text-gray-600 group-hover:text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
                    </svg>
                  </button>
                  <button @click="autoReorder(product)" class="p-2 hover:bg-green-50 rounded-lg transition-colors group">
                    <svg class="w-4 h-4 text-gray-600 group-hover:text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/>
                    </svg>
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { Line } from 'vue-chartjs'
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js'
import { useProductStore } from '@/stores/products'
import { useAdminStore } from '@/stores/admin'
import { useToast } from '@/composables/useToast'

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend)

const productStore = useProductStore()
const adminStore = useAdminStore()
const { success } = useToast()

const searchQuery = ref('')
const filterStatus = ref('')

const products = computed(() => productStore.products)
const lowStockCount = computed(() => products.value.filter(p => p.stock > 0 && p.stock <= 50).length)
const outOfStockCount = computed(() => products.value.filter(p => p.stock === 0).length)

const filteredProducts = computed(() => {
  let result = products.value

  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    result = result.filter(p => p.name.toLowerCase().includes(query))
  }

  if (filterStatus.value === 'in-stock') {
    result = result.filter(p => p.stock > 50)
  } else if (filterStatus.value === 'low-stock') {
    result = result.filter(p => p.stock > 0 && p.stock <= 50)
  } else if (filterStatus.value === 'out-of-stock') {
    result = result.filter(p => p.stock === 0)
  }

  return result.slice(0, 15)
})

const forecastChartData = computed(() => ({
  labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5 (Forecast)', 'Week 6 (Forecast)'],
  datasets: [
    {
      label: 'Actual Sales',
      data: [120, 150, 180, 200, null, null],
      borderColor: 'rgb(147, 51, 234)',
      backgroundColor: 'rgba(147, 51, 234, 0.1)',
      tension: 0.4
    },
    {
      label: 'AI Forecast',
      data: [null, null, null, 200, 220, 240],
      borderColor: 'rgb(59, 130, 246)',
      backgroundColor: 'rgba(59, 130, 246, 0.1)',
      borderDash: [5, 5],
      tension: 0.4
    }
  ]
}))

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: 'top'
    }
  }
}

function getStockStatus(stock) {
  if (stock > 50) return 'bg-green-100 text-green-800'
  if (stock > 20) return 'bg-yellow-100 text-yellow-800'
  if (stock > 0) return 'bg-orange-100 text-orange-800'
  return 'bg-red-100 text-red-800'
}

function getStockLabel(stock) {
  if (stock > 50) return 'In Stock'
  if (stock > 20) return 'Low Stock'
  if (stock > 0) return 'Critical'
  return 'Out of Stock'
}

function getForecast(stock) {
  return Math.floor(stock * 0.1 + Math.random() * 10)
}

function updateStock(product) {
  success(`Stock update initiated for ${product.name}`)
}

function autoReorder(product) {
  success(`Auto-reorder activated for ${product.name}. AI will reorder when stock reaches threshold.`)
}
</script>
