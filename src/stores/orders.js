import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useOrderStore = defineStore('orders', () => {
  const orders = ref([
    {
      id: 'ORD-001',
      date: '2025-10-10',
      status: 'Delivered',
      total: 249.97,
      items: [
        { id: 1, name: 'Classic Cotton T-Shirt', quantity: 2, price: 29.99 },
        { id: 10, name: 'Wireless Headphones', quantity: 1, price: 199.99 }
      ],
      shipping: {
        address: '123 Main St, City, State 12345',
        method: 'Standard Shipping'
      }
    },
    {
      id: 'ORD-002',
      date: '2025-10-12',
      status: 'In Transit',
      total: 189.98,
      items: [
        { id: 4, name: 'Running Shoes Pro', quantity: 1, price: 119.99 },
        { id: 5, name: 'Casual Sneakers', quantity: 1, price: 69.99 }
      ],
      shipping: {
        address: '123 Main St, City, State 12345',
        method: 'Express Shipping'
      }
    },
    {
      id: 'ORD-003',
      date: '2025-10-14',
      status: 'Processing',
      total: 89.99,
      items: [
        { id: 16, name: 'Coffee Maker Deluxe', quantity: 1, price: 89.99 }
      ],
      shipping: {
        address: '123 Main St, City, State 12345',
        method: 'Standard Shipping'
      }
    }
  ])

  function createOrder(orderData) {
    const newOrder = {
      id: `ORD-${String(orders.value.length + 1).padStart(3, '0')}`,
      date: new Date().toISOString().split('T')[0],
      status: 'Processing',
      ...orderData
    }
    orders.value.unshift(newOrder)
    return newOrder
  }

  function getOrderById(id) {
    return orders.value.find(order => order.id === id)
  }

  return {
    orders,
    createOrder,
    getOrderById
  }
})
