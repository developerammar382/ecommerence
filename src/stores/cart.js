import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useCartStore = defineStore('cart', () => {
  const items = ref([])

  const totalItems = computed(() => items.value.reduce((sum, item) => sum + item.quantity, 0))
  const totalPrice = computed(() => items.value.reduce((sum, item) => sum + (item.price * item.quantity), 0))

  function addToCart(product, quantity = 1) {
    const existingItem = items.value.find(item => item.id === product.id)
    
    if (existingItem) {
      existingItem.quantity += quantity
    } else {
      items.value.push({
        ...product,
        quantity
      })
    }
    
    saveCart()
  }

  function removeFromCart(productId) {
    items.value = items.value.filter(item => item.id !== productId)
    saveCart()
  }

  function updateQuantity(productId, quantity) {
    const item = items.value.find(item => item.id === productId)
    if (item) {
      item.quantity = quantity
      if (item.quantity <= 0) {
        removeFromCart(productId)
      } else {
        saveCart()
      }
    }
  }

  function clearCart() {
    items.value = []
    saveCart()
  }

  function saveCart() {
    localStorage.setItem('cart', JSON.stringify(items.value))
  }

  function loadCart() {
    const savedCart = localStorage.getItem('cart')
    if (savedCart) {
      items.value = JSON.parse(savedCart)
    }
  }

  loadCart()

  return {
    items,
    totalItems,
    totalPrice,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart
  }
})
