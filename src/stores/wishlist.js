import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useWishlistStore = defineStore('wishlist', () => {
  const items = ref([])

  function addToWishlist(product) {
    if (!items.value.find(item => item.id === product.id)) {
      items.value.push(product)
      saveWishlist()
    }
  }

  function removeFromWishlist(productId) {
    items.value = items.value.filter(item => item.id !== productId)
    saveWishlist()
  }

  function isInWishlist(productId) {
    return items.value.some(item => item.id === productId)
  }

  function saveWishlist() {
    localStorage.setItem('wishlist', JSON.stringify(items.value))
  }

  function loadWishlist() {
    const saved = localStorage.getItem('wishlist')
    if (saved) {
      items.value = JSON.parse(saved)
    }
  }

  loadWishlist()

  return {
    items,
    addToWishlist,
    removeFromWishlist,
    isInWishlist
  }
})
