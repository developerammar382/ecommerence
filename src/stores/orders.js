import { defineStore } from 'pinia'
import { ref } from 'vue'
import api from '../config/api'

export const useOrderStore = defineStore('orders', () => {
  const orders = ref([])
  const loading = ref(false)

  async function fetchOrders() {
    try {
      loading.value = true
      const response = await api.get('/orders/my-orders')
      orders.value = response.data.orders
    } catch (error) {
      console.error('Error fetching orders:', error)
    } finally {
      loading.value = false
    }
  }

  async function createOrder(orderData) {
    try {
      const response = await api.post('/orders', orderData)
      await fetchOrders()
      return { success: true, order: response.data.order }
    } catch (error) {
      console.error('Error creating order:', error)
      return { 
        success: false, 
        error: error.response?.data?.error || 'Failed to create order' 
      }
    }
  }

  async function getOrderById(id) {
    try {
      const response = await api.get(`/orders/${id}`)
      return response.data.order
    } catch (error) {
      console.error('Error fetching order:', error)
      return null
    }
  }

  return {
    orders,
    loading,
    fetchOrders,
    createOrder,
    getOrderById
  }
})
