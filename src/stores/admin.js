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
    low_stock_products: 0,
    totalOrders: 0,
    totalProducts: 0,
    totalCustomers: 0,
    revenue: 0,
    pendingOrders: 0,
    lowStockItems: 0
  })
  
  const salesData = ref({
    growthRate: 0,
    monthlyRevenue: []
  })
  
  const recentOrders = ref([])
  const topProducts = ref([])
  const salesByMonth = ref([])
  const users = ref([])
  const loading = ref(false)
  const inventoryAlerts = ref([])

  async function fetchDashboardStats() {
    try {
      loading.value = true
      const response = await api.get('/admin/dashboard/stats')
      const stats = response.data.stats
      
      // Map API response to dashboard stats with both naming conventions
      dashboardStats.value = {
        ...stats,
        totalOrders: parseInt(stats.total_orders || 0),
        totalProducts: parseInt(stats.total_products || 0),
        totalCustomers: parseInt(stats.total_customers || 0),
        revenue: parseFloat(stats.total_revenue || 0),
        pendingOrders: parseInt(stats.pending_orders || 0),
        lowStockItems: parseInt(stats.low_stock_products || 0)
      }
      
      // Set salesData with growth rate
      salesData.value = {
        growthRate: 12, // Default value, can be calculated from analytics
        monthlyRevenue: response.data.salesByMonth || []
      }
      
      recentOrders.value = response.data.recentOrders || []
      topProducts.value = response.data.topProducts || []
      salesByMonth.value = response.data.salesByMonth || []
    } catch (error) {
      console.error('Error fetching dashboard stats:', error)
      // Set default values on error
      dashboardStats.value = {
        totalOrders: 0,
        totalProducts: 0,
        totalCustomers: 0,
        revenue: 0,
        pendingOrders: 0,
        lowStockItems: 0
      }
      salesData.value = { growthRate: 0, monthlyRevenue: [] }
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
    salesData,
    recentOrders,
    topProducts,
    salesByMonth,
    users,
    loading,
    inventoryAlerts,
    fetchDashboardStats,
    fetchUsers,
    updateUserStatus,
    updateUserRole,
    fetchSalesAnalytics,
    getAllOrders,
    updateOrderStatus
  }
})
