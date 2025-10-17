import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import api from '../config/api'
import { useAuthStore } from './auth'

export const useCartStore = defineStore('cart', () => {
  const items = ref([])
  const loading = ref(false)

  const totalItems = computed(() => items.value.reduce((sum, item) => sum + item.quantity, 0))
  const totalPrice = computed(() => items.value.reduce((sum, item) => sum + (parseFloat(item.price) * item.quantity), 0))

  async function fetchCart() {
    const authStore = useAuthStore()
    if (!authStore.isAuthenticated) {
      loadCartFromLocal()
      return
    }

    try {
      loading.value = true
      const response = await api.get('/cart')
      items.value = response.data.items.map(item => ({
        id: item.product_id,
        name: item.name,
        price: item.price,
        image: item.image,
        quantity: item.quantity,
        stock: item.stock
      }))
    } catch (error) {
      console.error('Error fetching cart:', error)
      loadCartFromLocal()
    } finally {
      loading.value = false
    }
  }

  async function addToCart(product, quantity = 1) {
    const authStore = useAuthStore()
    
    if (!authStore.isAuthenticated) {
      addToLocalCart(product, quantity)
      return { success: true }
    }

    try {
      await api.post('/cart', {
        product_id: product.id,
        quantity
      })
      await fetchCart()
      return { success: true }
    } catch (error) {
      console.error('Error adding to cart:', error)
      return { 
        success: false, 
        error: error.response?.data?.error || 'Failed to add to cart' 
      }
    }
  }

  async function updateQuantity(productId, quantity) {
    const authStore = useAuthStore()
    
    if (!authStore.isAuthenticated) {
      updateLocalQuantity(productId, quantity)
      return
    }

    try {
      if (quantity <= 0) {
        await removeFromCart(productId)
        return
      }

      await api.put(`/cart/${productId}`, { quantity })
      await fetchCart()
    } catch (error) {
      console.error('Error updating quantity:', error)
    }
  }

  async function removeFromCart(productId) {
    const authStore = useAuthStore()
    
    if (!authStore.isAuthenticated) {
      removeFromLocalCart(productId)
      return
    }

    try {
      await api.delete(`/cart/${productId}`)
      await fetchCart()
    } catch (error) {
      console.error('Error removing from cart:', error)
    }
  }

  async function clearCart() {
    const authStore = useAuthStore()
    
    if (!authStore.isAuthenticated) {
      items.value = []
      saveCartToLocal()
      return
    }

    try {
      await api.delete('/cart')
      items.value = []
    } catch (error) {
      console.error('Error clearing cart:', error)
    }
  }

  function addToLocalCart(product, quantity) {
    const existingItem = items.value.find(item => item.id === product.id)
    
    if (existingItem) {
      existingItem.quantity += quantity
    } else {
      items.value.push({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        quantity,
        stock: product.stock
      })
    }
    
    saveCartToLocal()
  }

  function updateLocalQuantity(productId, quantity) {
    const item = items.value.find(item => item.id === productId)
    if (item) {
      item.quantity = quantity
      if (item.quantity <= 0) {
        removeFromLocalCart(productId)
      } else {
        saveCartToLocal()
      }
    }
  }

  function removeFromLocalCart(productId) {
    items.value = items.value.filter(item => item.id !== productId)
    saveCartToLocal()
  }

  function saveCartToLocal() {
    localStorage.setItem('cart', JSON.stringify(items.value))
  }

  function loadCartFromLocal() {
    const savedCart = localStorage.getItem('cart')
    if (savedCart) {
      items.value = JSON.parse(savedCart)
    }
  }

  async function syncCartOnLogin() {
    const localCart = localStorage.getItem('cart')
    if (localCart) {
      const cartItems = JSON.parse(localCart)
      for (const item of cartItems) {
        try {
          await api.post('/cart', {
            product_id: item.id,
            quantity: item.quantity
          })
        } catch (error) {
          console.error('Error syncing cart item:', error)
        }
      }
      localStorage.removeItem('cart')
    }
    await fetchCart()
  }

  loadCartFromLocal()

  return {
    items,
    loading,
    totalItems,
    totalPrice,
    fetchCart,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    syncCartOnLogin
  }
})
