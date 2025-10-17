import { defineStore } from 'pinia'
import { ref } from 'vue'
import api from '../config/api'

export const useAdminStore = defineStore('admin', () => {
  const dashboardStats = ref({
    total_customers: 0,
    total_products: 0,
    total_orders: 0,
    total_revenue: 0,
    pending_orders: 0,
    low_stock_products: 0
  })
  
  const recentOrders = ref([])
  const topProducts = ref([])
  const salesByMonth = ref([])
  const users = ref([])
  const loading = ref(false)

  async function fetchDashboardStats() {
    try {
      loading.value = true
      const response = await api.get('/admin/dashboard/stats')
      dashboardStats.value = response.data.stats
      recentOrders.value = response.data.recentOrders
      topProducts.value = response.data.topProducts
      salesByMonth.value = response.data.salesByMonth
    } catch (error) {
      console.error('Error fetching dashboard stats:', error)
    } finally {
      loading.value = false
    }
  }

  async function fetchUsers(filters = {}) {
    try {
      loading.value = true
      const params = new URLSearchParams()
      if (filters.role) params.append('role', filters.role)
      if (filters.status) params.append('status', filters.status)

      const response = await api.get(`/admin/users?${params.toString()}`)
      users.value = response.data.users
    } catch (error) {
      console.error('Error fetching users:', error)
    } finally {
      loading.value = false
    }
  }

  async function updateUserStatus(userId, status) {
    try {
      await api.put(`/admin/users/${userId}/status`, { status })
      await fetchUsers()
      return { success: true }
    } catch (error) {
      console.error('Error updating user status:', error)
      return { 
        success: false, 
        error: error.response?.data?.error || 'Failed to update user status' 
      }
    }
  }

  async function updateUserRole(userId, role) {
    try {
      await api.put(`/admin/users/${userId}/role`, { role })
      await fetchUsers()
      return { success: true }
    } catch (error) {
      console.error('Error updating user role:', error)
      return { 
        success: false, 
        error: error.response?.data?.error || 'Failed to update user role' 
      }
    }
  }

  async function fetchSalesAnalytics(period = 'month') {
    try {
      const response = await api.get(`/admin/dashboard/analytics?period=${period}`)
      return response.data.analytics
    } catch (error) {
      console.error('Error fetching sales analytics:', error)
      return []
    }
  }

  async function getAllOrders(filters = {}) {
    try {
      const params = new URLSearchParams()
      if (filters.status) params.append('status', filters.status)
      if (filters.payment_status) params.append('payment_status', filters.payment_status)

      const response = await api.get(`/orders?${params.toString()}`)
      return response.data.orders
    } catch (error) {
      console.error('Error fetching orders:', error)
      return []
    }
  }

  async function updateOrderStatus(orderId, status) {
    try {
      await api.put(`/orders/${orderId}/status`, { status })
      return { success: true }
    } catch (error) {
      console.error('Error updating order status:', error)
      return { 
        success: false, 
        error: error.response?.data?.error || 'Failed to update order status' 
      }
    }
  }

  return {
    dashboardStats,
    recentOrders,
    topProducts,
    salesByMonth,
    users,
    loading,
    fetchDashboardStats,
    fetchUsers,
    updateUserStatus,
    updateUserRole,
    fetchSalesAnalytics,
    getAllOrders,
    updateOrderStatus
  }
})
