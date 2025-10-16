<template>
  <div class="space-y-8">
    <div>
      <h1 class="text-4xl font-display font-bold gradient-text">Analytics & Insights</h1>
      <p class="text-gray-600 mt-2">Comprehensive data analytics with AI-powered recommendations</p>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-4 gap-6">
      <div class="card hover-lift">
        <div class="flex items-center justify-between mb-3">
          <p class="text-gray-600 text-sm font-medium">Today's Sales</p>
          <div class="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
            <svg class="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
            </svg>
          </div>
        </div>
        <p class="text-3xl font-bold mb-1">${{ adminStore.salesData.today.toLocaleString() }}</p>
        <p class="text-sm text-green-600 flex items-center gap-1">
          <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M5.293 9.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 7.414V15a1 1 0 11-2 0V7.414L6.707 9.707a1 1 0 01-1.414 0z" clip-rule="evenodd"/>
          </svg>
          +12% from yesterday
        </p>
      </div>

      <div class="card hover-lift">
        <div class="flex items-center justify-between mb-3">
          <p class="text-gray-600 text-sm font-medium">This Week</p>
          <div class="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
            <svg class="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/>
            </svg>
          </div>
        </div>
        <p class="text-3xl font-bold mb-1">${{ adminStore.salesData.thisWeek.toLocaleString() }}</p>
        <p class="text-sm text-green-600 flex items-center gap-1">
          <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M5.293 9.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 7.414V15a1 1 0 11-2 0V7.414L6.707 9.707a1 1 0 01-1.414 0z" clip-rule="evenodd"/>
          </svg>
          +18% from last week
        </p>
      </div>

      <div class="card hover-lift">
        <div class="flex items-center justify-between mb-3">
          <p class="text-gray-600 text-sm font-medium">This Month</p>
          <div class="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center">
            <svg class="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"/>
            </svg>
          </div>
        </div>
        <p class="text-3xl font-bold mb-1">${{ adminStore.salesData.thisMonth.toLocaleString() }}</p>
        <p class="text-sm text-green-600 flex items-center gap-1">
          <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M5.293 9.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 7.414V15a1 1 0 11-2 0V7.414L6.707 9.707a1 1 0 01-1.414 0z" clip-rule="evenodd"/>
          </svg>
          +{{ adminStore.salesData.growthRate }}% growth
        </p>
      </div>

      <div class="card gradient-bg-accent text-white hover-lift">
        <div class="flex items-center justify-between mb-3">
          <p class="text-white/90 text-sm font-medium">Conversion Rate</p>
          <svg class="w-10 h-10 text-white/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
          </svg>
        </div>
        <p class="text-3xl font-bold mb-1">3.8%</p>
        <p class="text-sm text-white/80">+0.5% improvement</p>
      </div>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div class="card">
        <div class="flex justify-between items-center mb-6">
          <h2 class="text-2xl font-bold">Revenue Trend</h2>
          <select class="input-field w-32">
            <option>Last 7 days</option>
            <option>Last 30 days</option>
            <option>Last 90 days</option>
          </select>
        </div>
        <div class="h-80">
          <Line :data="revenueChartData" :options="chartOptions" />
        </div>
      </div>

      <div class="card">
        <h2 class="text-2xl font-bold mb-6">Sales by Category</h2>
        <div class="h-80">
          <Doughnut :data="categoryChartData" :options="doughnutOptions" />
        </div>
      </div>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div class="card">
        <h2 class="text-2xl font-bold mb-6">Top Performing Products</h2>
        <div class="space-y-4">
          <div v-for="(product, index) in topProducts" :key="index" class="flex items-center gap-4">
            <div class="w-10 h-10 rounded-full gradient-bg-primary text-white flex items-center justify-center font-bold">
              {{ index + 1 }}
            </div>
            <div class="flex-1">
              <p class="font-semibold">{{ product.name }}</p>
              <div class="w-full bg-gray-200 rounded-full h-2 mt-2">
                <div class="gradient-bg-primary h-2 rounded-full transition-all" :style="{ width: product.percentage + '%' }"></div>
              </div>
            </div>
            <div class="text-right">
              <p class="font-bold text-primary-600">${{ product.revenue.toLocaleString() }}</p>
              <p class="text-xs text-gray-500">{{ product.sales }} sales</p>
            </div>
          </div>
        </div>
      </div>

      <div class="card">
        <h2 class="text-2xl font-bold mb-6">Customer Insights</h2>
        <div class="space-y-4">
          <div class="p-4 bg-gray-50 rounded-lg">
            <div class="flex justify-between items-center mb-2">
              <span class="text-gray-700 font-medium">New Customers (This Month)</span>
              <span class="text-2xl font-bold text-primary-600">1,247</span>
            </div>
            <div class="w-full bg-gray-200 rounded-full h-2">
              <div class="bg-primary-600 h-2 rounded-full" style="width: 78%"></div>
            </div>
          </div>
          <div class="p-4 bg-gray-50 rounded-lg">
            <div class="flex justify-between items-center mb-2">
              <span class="text-gray-700 font-medium">Returning Customers</span>
              <span class="text-2xl font-bold text-blue-600">7,687</span>
            </div>
            <div class="w-full bg-gray-200 rounded-full h-2">
              <div class="bg-blue-600 h-2 rounded-full" style="width: 92%"></div>
            </div>
          </div>
          <div class="grid grid-cols-2 gap-4 mt-4">
            <div class="p-4 bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg">
              <p class="text-sm text-gray-600 mb-1">Avg Order Value</p>
              <p class="text-2xl font-bold text-green-600">$124.50</p>
            </div>
            <div class="p-4 bg-gradient-to-br from-purple-50 to-pink-50 rounded-lg">
              <p class="text-sm text-gray-600 mb-1">Customer LTV</p>
              <p class="text-2xl font-bold text-purple-600">$892.30</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="card">
      <div class="flex justify-between items-center mb-6">
        <div>
          <h2 class="text-2xl font-bold">AI-Powered Insights</h2>
          <p class="text-sm text-gray-600 mt-1">Smart recommendations based on data analysis</p>
        </div>
        <button class="btn-primary flex items-center gap-2">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/>
          </svg>
          Generate Report
        </button>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div class="p-6 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl">
          <div class="flex items-start gap-3 mb-4">
            <div class="w-12 h-12 rounded-full bg-blue-500 flex items-center justify-center flex-shrink-0">
              <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"/>
              </svg>
            </div>
            <div>
              <h4 class="font-bold text-lg mb-1">Demand Forecast</h4>
              <p class="text-sm text-gray-700">Electronics category expected to see 23% increase in demand next week based on trending patterns.</p>
            </div>
          </div>
          <button class="btn-primary w-full text-sm">View Details</button>
        </div>

        <div class="p-6 bg-gradient-to-br from-green-50 to-green-100 rounded-xl">
          <div class="flex items-start gap-3 mb-4">
            <div class="w-12 h-12 rounded-full bg-green-500 flex items-center justify-center flex-shrink-0">
              <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"/>
              </svg>
            </div>
            <div>
              <h4 class="font-bold text-lg mb-1">Revenue Optimization</h4>
              <p class="text-sm text-gray-700">Adjusting prices for high-demand items could potentially increase revenue by $15,200 this month.</p>
            </div>
          </div>
          <button class="btn-primary w-full text-sm">Apply Changes</button>
        </div>

        <div class="p-6 bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl">
          <div class="flex items-start gap-3 mb-4">
            <div class="w-12 h-12 rounded-full bg-purple-500 flex items-center justify-center flex-shrink-0">
              <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"/>
              </svg>
            </div>
            <div>
              <h4 class="font-bold text-lg mb-1">Customer Behavior</h4>
              <p class="text-sm text-gray-700">Peak shopping hours: 7-9 PM. Consider targeted promotions during these times for maximum impact.</p>
            </div>
          </div>
          <button class="btn-primary w-full text-sm">Schedule Campaign</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { Line, Doughnut } from 'vue-chartjs'
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, ArcElement, Title, Tooltip, Legend, Filler } from 'chart.js'
import { useAdminStore } from '@/stores/admin'
import { useProductStore } from '@/stores/products'

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, ArcElement, Title, Tooltip, Legend, Filler)

const adminStore = useAdminStore()
const productStore = useProductStore()

const revenueChartData = computed(() => ({
  labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
  datasets: [
    {
      label: 'Revenue',
      data: [12000, 19000, 15000, 25000, 22000, 30000, 28000],
      borderColor: 'rgb(147, 51, 234)',
      backgroundColor: 'rgba(147, 51, 234, 0.1)',
      tension: 0.4,
      fill: true
    }
  ]
}))

const categoryChartData = computed(() => ({
  labels: productStore.categories.map(c => c.name),
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

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: false
    }
  }
}

const doughnutOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: 'bottom'
    }
  }
}

const topProducts = [
  { name: 'Premium Headphones', revenue: 45000, sales: 450, percentage: 90 },
  { name: 'Smart Watch Pro', revenue: 38000, sales: 380, percentage: 76 },
  { name: 'Wireless Earbuds', revenue: 32000, sales: 640, percentage: 64 },
  { name: 'Gaming Mouse', revenue: 28000, sales: 560, percentage: 56 },
  { name: 'Laptop Stand', revenue: 22000, sales: 440, percentage: 44 }
]
</script>
