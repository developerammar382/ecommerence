<template>
  <div class="space-y-6">
    <div>
      <h1 class="text-4xl font-display font-bold gradient-text">Order Management</h1>
      <p class="text-gray-600 mt-2">Track and manage all customer orders</p>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
      <div class="card hover-lift">
        <div class="flex items-center gap-3">
          <div class="w-12 h-12 rounded-full bg-yellow-100 flex items-center justify-center">
            <svg class="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
            </svg>
          </div>
          <div>
            <p class="text-2xl font-bold">{{ pendingCount }}</p>
            <p class="text-sm text-gray-600">Pending</p>
          </div>
        </div>
      </div>

      <div class="card hover-lift">
        <div class="flex items-center gap-3">
          <div class="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
            <svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"/>
            </svg>
          </div>
          <div>
            <p class="text-2xl font-bold">{{ shippedCount }}</p>
            <p class="text-sm text-gray-600">Shipped</p>
          </div>
        </div>
      </div>

      <div class="card hover-lift">
        <div class="flex items-center gap-3">
          <div class="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
            <svg class="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
            </svg>
          </div>
          <div>
            <p class="text-2xl font-bold">{{ deliveredCount }}</p>
            <p class="text-sm text-gray-600">Delivered</p>
          </div>
        </div>
      </div>

      <div class="card hover-lift">
        <div class="flex items-center gap-3">
          <div class="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center">
            <svg class="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
            </svg>
          </div>
          <div>
            <p class="text-2xl font-bold">{{ cancelledCount }}</p>
            <p class="text-sm text-gray-600">Cancelled</p>
          </div>
        </div>
      </div>
    </div>

    <div class="card">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div class="relative">
          <svg class="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
          </svg>
          <input v-model="searchQuery" type="search" placeholder="Search by order ID or customer..." class="input-field pl-10" />
        </div>
        <select v-model="filterStatus" class="input-field">
          <option value="">All Status</option>
          <option value="Processing">Processing</option>
          <option value="Shipped">Shipped</option>
          <option value="Delivered">Delivered</option>
          <option value="Cancelled">Cancelled</option>
        </select>
        <select v-model="sortBy" class="input-field">
          <option value="date-desc">Latest First</option>
          <option value="date-asc">Oldest First</option>
          <option value="amount-desc">Highest Amount</option>
          <option value="amount-asc">Lowest Amount</option>
        </select>
      </div>

      <div class="flex items-center justify-between mb-4">
        <p class="text-sm text-gray-600">Showing {{ filteredOrders.length }} orders</p>
        <div class="flex gap-2">
          <button class="btn-secondary text-sm flex items-center gap-2">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"/>
            </svg>
            Export CSV
          </button>
          <button class="btn-secondary text-sm flex items-center gap-2">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"/>
            </svg>
            Print
          </button>
        </div>
      </div>

      <div class="overflow-x-auto">
        <table class="w-full">
          <thead>
            <tr class="border-b-2 border-gray-200">
              <th class="text-left py-4 px-3 text-sm font-semibold text-gray-700">Order ID</th>
              <th class="text-left py-4 px-3 text-sm font-semibold text-gray-700">Customer</th>
              <th class="text-left py-4 px-3 text-sm font-semibold text-gray-700">Date</th>
              <th class="text-left py-4 px-3 text-sm font-semibold text-gray-700">Items</th>
              <th class="text-left py-4 px-3 text-sm font-semibold text-gray-700">Amount</th>
              <th class="text-left py-4 px-3 text-sm font-semibold text-gray-700">Status</th>
              <th class="text-left py-4 px-3 text-sm font-semibold text-gray-700">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="order in paginatedOrders" :key="order.id" class="border-b hover:bg-gray-50 transition-colors">
              <td class="py-4 px-3">
                <p class="font-semibold text-sm">#{{ order.id }}</p>
              </td>
              <td class="py-4 px-3">
                <div>
                  <p class="font-medium text-sm">{{ order.customer }}</p>
                  <p class="text-xs text-gray-500">{{ order.email || 'customer@example.com' }}</p>
                </div>
              </td>
              <td class="py-4 px-3">
                <p class="text-sm">{{ order.date || 'Nov 15, 2024' }}</p>
                <p class="text-xs text-gray-500">{{ order.time || '10:30 AM' }}</p>
              </td>
              <td class="py-4 px-3">
                <p class="text-sm">{{ order.items || 3 }} items</p>
              </td>
              <td class="py-4 px-3">
                <p class="font-semibold text-sm">${{ order.amount }}</p>
              </td>
              <td class="py-4 px-3">
                <select v-model="order.status" @change="updateOrderStatus(order)" :class="['px-3 py-1 rounded-full text-xs font-medium border-0', getStatusClass(order.status)]">
                  <option value="Processing">Processing</option>
                  <option value="Shipped">Shipped</option>
                  <option value="Delivered">Delivered</option>
                  <option value="Cancelled">Cancelled</option>
                </select>
              </td>
              <td class="py-4 px-3">
                <div class="flex items-center gap-2">
                  <button @click="viewOrderDetails(order)" class="p-2 hover:bg-blue-50 rounded-lg transition-colors group">
                    <svg class="w-4 h-4 text-gray-600 group-hover:text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
                    </svg>
                  </button>
                  <button @click="printInvoice(order)" class="p-2 hover:bg-green-50 rounded-lg transition-colors group">
                    <svg class="w-4 h-4 text-gray-600 group-hover:text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"/>
                    </svg>
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="mt-6">
        <Pagination 
          :current-page="currentPage"
          :total-pages="totalPages"
          @update:current-page="currentPage = $event"
        />
      </div>
    </div>

    <Modal v-model="showOrderModal" title="Order Details" size="xl">
      <div v-if="selectedOrder" class="space-y-6">
        <div class="grid grid-cols-2 gap-4">
          <div>
            <p class="text-sm text-gray-600">Order ID</p>
            <p class="font-semibold">#{{ selectedOrder.id }}</p>
          </div>
          <div>
            <p class="text-sm text-gray-600">Date</p>
            <p class="font-semibold">{{ selectedOrder.date }}</p>
          </div>
          <div>
            <p class="text-sm text-gray-600">Customer</p>
            <p class="font-semibold">{{ selectedOrder.customer }}</p>
          </div>
          <div>
            <p class="text-sm text-gray-600">Total Amount</p>
            <p class="font-semibold text-primary-600">${{ selectedOrder.amount }}</p>
          </div>
        </div>
        
        <div>
          <h3 class="font-semibold mb-3">Order Items</h3>
          <div class="space-y-2">
            <div class="flex justify-between p-3 bg-gray-50 rounded-lg">
              <span>Sample Product 1</span>
              <span class="font-medium">$50.00</span>
            </div>
            <div class="flex justify-between p-3 bg-gray-50 rounded-lg">
              <span>Sample Product 2</span>
              <span class="font-medium">$30.00</span>
            </div>
          </div>
        </div>

        <div>
          <h3 class="font-semibold mb-3">Shipping Address</h3>
          <div class="p-4 bg-gray-50 rounded-lg">
            <p>123 Main Street</p>
            <p>New York, NY 10001</p>
            <p>United States</p>
          </div>
        </div>
      </div>
    </Modal>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useAdminStore } from '@/stores/admin'
import { useToast } from '@/composables/useToast'
import Modal from '@/components/ui/Modal.vue'
import Pagination from '@/components/ui/Pagination.vue'

const adminStore = useAdminStore()
const { success } = useToast()

const searchQuery = ref('')
const filterStatus = ref('')
const sortBy = ref('date-desc')
const currentPage = ref(1)
const itemsPerPage = ref(10)
const showOrderModal = ref(false)
const selectedOrder = ref(null)

const orders = computed(() => adminStore.recentOrders || [])

const pendingCount = computed(() => orders.value.filter(o => o.status === 'Processing').length)
const shippedCount = computed(() => orders.value.filter(o => o.status === 'Shipped').length)
const deliveredCount = computed(() => orders.value.filter(o => o.status === 'Delivered').length)
const cancelledCount = computed(() => orders.value.filter(o => o.status === 'Cancelled').length)

const filteredOrders = computed(() => {
  let result = orders.value

  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    result = result.filter(o => 
      o.id.toString().includes(query) || 
      o.customer.toLowerCase().includes(query)
    )
  }

  if (filterStatus.value) {
    result = result.filter(o => o.status === filterStatus.value)
  }

  result = [...result].sort((a, b) => {
    switch (sortBy.value) {
      case 'amount-desc':
        return b.amount - a.amount
      case 'amount-asc':
        return a.amount - b.amount
      default:
        return 0
    }
  })

  return result
})

const totalPages = computed(() => Math.ceil(filteredOrders.value.length / itemsPerPage.value))

const paginatedOrders = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage.value
  const end = start + itemsPerPage.value
  return filteredOrders.value.slice(start, end)
})

function getStatusClass(status) {
  switch (status) {
    case 'Delivered':
      return 'bg-green-100 text-green-800'
    case 'Shipped':
      return 'bg-blue-100 text-blue-800'
    case 'Processing':
      return 'bg-yellow-100 text-yellow-800'
    case 'Cancelled':
      return 'bg-red-100 text-red-800'
    default:
      return 'bg-gray-100 text-gray-800'
  }
}

function updateOrderStatus(order) {
  success(`Order #${order.id} status updated to ${order.status}`)
}

function viewOrderDetails(order) {
  selectedOrder.value = order
  showOrderModal.value = true
}

function printInvoice(order) {
  success(`Invoice for order #${order.id} is being prepared...`)
}
</script>
