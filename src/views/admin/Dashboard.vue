<template>
  <div class="space-y-8">
    <div class="flex justify-between items-center">
      <div>
        <h1 class="text-4xl font-display font-bold gradient-text">Dashboard Overview</h1>
        <p class="text-gray-600 mt-2">Welcome back! Here's what's happening with your store today.</p>
      </div>
      <div class="flex items-center gap-3">
        <select v-model="timeRange" class="input-field">
          <option value="today">Today</option>
          <option value="week">This Week</option>
          <option value="month">This Month</option>
          <option value="year">This Year</option>
        </select>
        <button @click="refreshData" class="btn-secondary flex items-center gap-2">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/>
          </svg>
          Refresh
        </button>
      </div>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <div class="card gradient-bg-primary text-white relative overflow-hidden">
        <div class="absolute top-0 right-0 w-32 h-32 bg-white opacity-10 rounded-full -mr-8 -mt-8"></div>
        <div class="relative z-10">
          <div class="flex items-center justify-between mb-3">
            <p class="text-white/80 text-sm font-medium">Total Revenue</p>
            <svg class="w-10 h-10 text-white/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
            </svg>
          </div>
          <p class="text-4xl font-bold mb-2">${{ (adminStore.dashboardStats.revenue / 1000).toFixed(1) }}k</p>
          <div class="flex items-center text-sm">
            <svg class="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M5.293 9.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 7.414V15a1 1 0 11-2 0V7.414L6.707 9.707a1 1 0 01-1.414 0z" clip-rule="evenodd"/>
            </svg>
            +{{ adminStore.salesData.growthRate }}% from last period
          </div>
        </div>
      </div>

      <div class="card hover-lift">
        <div class="flex items-center justify-between mb-3">
          <p class="text-gray-600 text-sm font-medium">Total Orders</p>
          <div class="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
            <svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"/>
            </svg>
          </div>
        </div>
        <p class="text-4xl font-bold mb-2">{{ adminStore.dashboardStats.totalOrders }}</p>
        <p class="text-orange-600 text-sm font-medium">{{ adminStore.dashboardStats.pendingOrders }} pending orders</p>
      </div>

      <div class="card hover-lift">
        <div class="flex items-center justify-between mb-3">
          <p class="text-gray-600 text-sm font-medium">Total Products</p>
          <div class="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
            <svg class="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"/>
            </svg>
          </div>
        </div>
        <p class="text-4xl font-bold mb-2">{{ adminStore.dashboardStats.totalProducts }}</p>
        <p class="text-red-600 text-sm font-medium">{{ adminStore.dashboardStats.lowStockItems }} low stock items</p>
      </div>

      <div class="card hover-lift">
        <div class="flex items-center justify-between mb-3">
          <p class="text-gray-600 text-sm font-medium">Total Customers</p>
          <div class="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center">
            <svg class="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"/>
            </svg>
          </div>
        </div>
        <p class="text-4xl font-bold mb-2">{{ adminStore.dashboardStats.totalCustomers }}</p>
        <p class="text-gray-600 text-sm font-medium">Active this month</p>
      </div>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div class="lg:col-span-2 card">
        <div class="flex justify-between items-center mb-6">
          <h2 class="text-2xl font-bold">Sales Overview</h2>
          <div class="flex gap-2">
            <button @click="chartType = 'revenue'" :class="chartType === 'revenue' ? 'badge-primary' : 'badge-secondary'">Revenue</button>
            <button @click="chartType = 'orders'" :class="chartType === 'orders' ? 'badge-primary' : 'badge-secondary'">Orders</button>
          </div>
        </div>
        <div class="h-80">
          <Line :data="chartData" :options="chartOptions" />
        </div>
      </div>

      <div class="card">
        <h2 class="text-2xl font-bold mb-6">Category Performance</h2>
        <div class="h-80">
          <Doughnut :data="categoryChartData" :options="doughnutOptions" />
        </div>
      </div>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div class="card">
        <div class="flex justify-between items-center mb-6">
          <h2 class="text-2xl font-bold">Recent Orders</h2>
          <router-link to="/admin/orders" class="text-primary-600 hover:text-primary-700 text-sm font-medium">View All →</router-link>
        </div>
        <div class="overflow-x-auto">
          <table class="w-full">
            <thead>
              <tr class="border-b-2 border-gray-200">
                <th class="text-left py-3 text-sm font-semibold text-gray-700">Order ID</th>
                <th class="text-left py-3 text-sm font-semibold text-gray-700">Customer</th>
                <th class="text-left py-3 text-sm font-semibold text-gray-700">Amount</th>
                <th class="text-left py-3 text-sm font-semibold text-gray-700">Status</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="order in adminStore.recentOrders.slice(0, 5)" :key="order.id" class="border-b hover:bg-gray-50 transition-colors">
                <td class="py-4 font-medium text-sm">#{{ order.id }}</td>
                <td class="py-4 text-sm">{{ order.customer }}</td>
                <td class="py-4 text-sm font-semibold">${{ order.amount }}</td>
                <td class="py-4">
                  <span :class="['px-3 py-1 rounded-full text-xs font-medium', getStatusClass(order.status)]">
                    {{ order.status }}
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div class="card">
        <div class="flex justify-between items-center mb-6">
          <h2 class="text-2xl font-bold">Top Products</h2>
          <router-link to="/admin/analytics" class="text-primary-600 hover:text-primary-700 text-sm font-medium">View More →</router-link>
        </div>
        <div class="space-y-4">
          <div v-for="(product, index) in adminStore.topProducts" :key="product.id" class="flex items-center gap-4 p-3 rounded-lg hover:bg-gray-50 transition-colors">
            <div class="w-8 h-8 rounded-full gradient-bg-primary text-white flex items-center justify-center font-bold text-sm">
              {{ index + 1 }}
            </div>
            <div class="flex-1">
              <p class="font-semibold text-sm">{{ product.name }}</p>
              <p class="text-xs text-gray-600">{{ product.sales }} sales</p>
            </div>
            <div class="text-right">
              <p class="font-bold text-primary-600">${{ product.revenue.toLocaleString() }}</p>
              <p class="text-xs text-green-600">+{{ (product.growth || 12) }}%</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="card">
      <div class="flex justify-between items-center mb-6">
        <div>
          <h2 class="text-2xl font-bold">AI Inventory Alerts</h2>
          <p class="text-sm text-gray-600 mt-1">Smart forecasting detected these items need attention</p>
        </div>
        <button class="btn-primary flex items-center gap-2">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/>
          </svg>
          AI Insights
        </button>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div v-for="alert in adminStore.inventoryAlerts" :key="alert.id" class="flex items-center gap-4 p-4 bg-gradient-to-r from-orange-50 to-red-50 rounded-xl border border-orange-200">
          <div class="w-12 h-12 rounded-full bg-orange-500 flex items-center justify-center flex-shrink-0">
            <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/>
            </svg>
          </div>
          <div class="flex-1">
            <p class="font-semibold text-gray-900">{{ alert.product }}</p>
            <p class="text-sm text-gray-600">Current: {{ alert.stock }} | Min: {{ alert.threshold }}</p>
            <p class="text-xs text-orange-600 mt-1">AI Forecast: Stockout in {{ alert.daysUntilStockout || 3 }} days</p>
          </div>
          <button class="btn-primary text-sm whitespace-nowrap">Auto Reorder</button>
        </div>
      </div>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div class="card gradient-bg-secondary text-white">
        <div class="flex items-center gap-4">
          <div class="w-14 h-14 rounded-full bg-white/20 flex items-center justify-center">
            <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"/>
            </svg>
          </div>
          <div>
            <p class="text-white/80 text-sm">AI Recommendation</p>
            <p class="text-xl font-bold">Run Flash Sale</p>
            <p class="text-xs text-white/70 mt-1">Expected +25% revenue boost</p>
          </div>
        </div>
      </div>

      <div class="card gradient-bg-accent text-white">
        <div class="flex items-center gap-4">
          <div class="w-14 h-14 rounded-full bg-white/20 flex items-center justify-center">
            <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"/>
            </svg>
          </div>
          <div>
            <p class="text-white/80 text-sm">Conversion Rate</p>
            <p class="text-xl font-bold">3.8%</p>
            <p class="text-xs text-white/70 mt-1">+0.5% from last week</p>
          </div>
        </div>
      </div>

      <div class="card bg-gradient-to-br from-green-500 to-emerald-600 text-white">
        <div class="flex items-center gap-4">
          <div class="w-14 h-14 rounded-full bg-white/20 flex items-center justify-center">
            <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
            </svg>
          </div>
          <div>
            <p class="text-white/80 text-sm">Customer Satisfaction</p>
            <p class="text-xl font-bold">4.7/5.0</p>
            <p class="text-xs text-white/70 mt-1">Based on 1,234 reviews</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { Line, Doughnut } from 'vue-chartjs'
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, ArcElement, Title, Tooltip, Legend, Filler } from 'chart.js'
import { useAdminStore } from '@/stores/admin'

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, ArcElement, Title, Tooltip, Legend, Filler)

const adminStore = useAdminStore()
const timeRange = ref('month')
const chartType = ref('revenue')

const chartData = computed(() => ({
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
  datasets: [
    {
      label: chartType.value === 'revenue' ? 'Revenue' : 'Orders',
      data: chartType.value === 'revenue' 
        ? [12000, 19000, 15000, 25000, 22000, 30000, 28000, 35000, 32000, 40000, 38000, 45000]
        : [120, 190, 150, 250, 220, 300, 280, 350, 320, 400, 380, 450],
      borderColor: 'rgb(147, 51, 234)',
      backgroundColor: 'rgba(147, 51, 234, 0.1)',
      tension: 0.4,
      fill: true
    }
  ]
}))

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: false
    },
    tooltip: {
      mode: 'index',
      intersect: false,
    }
  },
  scales: {
    y: {
      beginAtZero: true,
      ticks: {
        callback: function(value) {
          return chartType.value === 'revenue' ? '$' + value.toLocaleString() : value
        }
      }
    }
  }
}

const categoryChartData = computed(() => ({
  labels: ['Clothing', 'Electronics', 'Shoes', 'Accessories', 'Groceries', 'Home & Kitchen', 'Health & Beauty'],
  datasets: [
    {
      data: [30, 20, 15, 12, 10, 8, 5],
      backgroundColor: [
        'rgba(147, 51, 234, 0.8)',
        'rgba(59, 130, 246, 0.8)',
        'rgba(16, 185, 129, 0.8)',
        'rgba(245, 158, 11, 0.8)',
        'rgba(239, 68, 68, 0.8)',
        'rgba(139, 92, 246, 0.8)',
        'rgba(236, 72, 153, 0.8)'
      ]
    }
  ]
}))

const doughnutOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: 'bottom'
    }
  }
}

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

function refreshData() {
  console.log('Refreshing dashboard data...')
}
</script>
