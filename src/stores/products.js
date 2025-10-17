import { defineStore } from 'pinia'
import { ref, computed, h } from 'vue'
import api from '../config/api'

export const useProductStore = defineStore('products', () => {
  const categories = ref([])
  const products = ref([])
  const loading = ref(false)
  const error = ref(null)

  const featuredProducts = computed(() => products.value.filter(p => p.featured))

  async function fetchCategories() {
    try {
      loading.value = true
      const response = await api.get('/categories')
      categories.value = response.data.categories.map(cat => ({
        ...cat,
        icon: getCategoryIcon(cat.slug),
        iconComponent: getCategoryIconComponent(cat.slug)
      }))
      error.value = null
    } catch (err) {
      error.value = err.message
      console.error('Error fetching categories:', err)
    } finally {
      loading.value = false
    }
  }

  async function fetchProducts(filters = {}) {
    try {
      loading.value = true
      const params = new URLSearchParams()
      
      if (filters.category_id) params.append('category_id', filters.category_id)
      if (filters.featured) params.append('featured', 'true')
      if (filters.search) params.append('search', filters.search)
      if (filters.min_price) params.append('min_price', filters.min_price)
      if (filters.max_price) params.append('max_price', filters.max_price)
      if (filters.limit) params.append('limit', filters.limit)

      const response = await api.get(`/products?${params.toString()}`)
      products.value = response.data.products
      error.value = null
      return response.data.products
    } catch (err) {
      error.value = err.message
      console.error('Error fetching products:', err)
      return []
    } finally {
      loading.value = false
    }
  }

  async function getProductById(id) {
    try {
      const response = await api.get(`/products/${id}`)
      return response.data.product
    } catch (err) {
      console.error('Error fetching product:', err)
      return null
    }
  }

  function getProductsByCategory(categoryId) {
    if (!categoryId) return products.value
    return products.value.filter(p => p.category_id === parseInt(categoryId))
  }

  function searchProducts(query) {
    if (!query) return products.value
    const lowerQuery = query.toLowerCase()
    return products.value.filter(p => 
      p.name.toLowerCase().includes(lowerQuery) || 
      p.description?.toLowerCase().includes(lowerQuery) ||
      p.category_name?.toLowerCase().includes(lowerQuery)
    )
  }

  function getCategoryIcon(slug) {
    const icons = {
      'clothing': '👕',
      'shoes': '👟',
      'accessories': '👜',
      'electronics': '📱',
      'groceries': '🛒',
      'home-kitchen': '🏠',
      'health-beauty': '💄'
    }
    return icons[slug] || '📦'
  }

  function getCategoryIconComponent(slug) {
    const iconComponents = {
      'clothing': (props) => h('svg', { class: props.class || 'w-10 h-10', fill: 'none', stroke: 'currentColor', viewBox: '0 0 24 24' }, [
        h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', 'stroke-width': '2', d: 'M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h8m-8 0v-2m8 2a4 4 0 004-4V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v12a4 4 0 004 4zm0 0v-2' })
      ]),
      'shoes': (props) => h('svg', { class: props.class || 'w-10 h-10', fill: 'currentColor', viewBox: '0 0 24 24' }, [
        h('path', { d: 'M2 17.5C2 18.88 3.12 20 4.5 20h15c1.38 0 2.5-1.12 2.5-2.5V16c0-.83-.67-1.5-1.5-1.5H3.5c-.83 0-1.5.67-1.5 1.5v1.5zm2-4C4 12.67 4.67 12 5.5 12h13c.83 0 1.5.67 1.5 1.5V14h-18v-.5zm16-3.5H4c0-3.31 2.69-6 6-6 1.54 0 2.94.59 4 1.55 1.06-.96 2.46-1.55 4-1.55 3.31 0 6 2.69 6 6z' })
      ]),
      'accessories': (props) => h('svg', { class: props.class || 'w-10 h-10', fill: 'none', stroke: 'currentColor', viewBox: '0 0 24 24' }, [
        h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', 'stroke-width': '2', d: 'M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z' })
      ]),
      'electronics': (props) => h('svg', { class: props.class || 'w-10 h-10', fill: 'none', stroke: 'currentColor', viewBox: '0 0 24 24' }, [
        h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', 'stroke-width': '2', d: 'M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z' })
      ]),
      'groceries': (props) => h('svg', { class: props.class || 'w-10 h-10', fill: 'none', stroke: 'currentColor', viewBox: '0 0 24 24' }, [
        h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', 'stroke-width': '2', d: 'M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z' })
      ]),
      'home-kitchen': (props) => h('svg', { class: props.class || 'w-10 h-10', fill: 'none', stroke: 'currentColor', viewBox: '0 0 24 24' }, [
        h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', 'stroke-width': '2', d: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6' })
      ]),
      'health-beauty': (props) => h('svg', { class: props.class || 'w-10 h-10', fill: 'none', stroke: 'currentColor', viewBox: '0 0 24 24' }, [
        h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', 'stroke-width': '2', d: 'M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z' })
      ])
    }
    return iconComponents[slug] || iconComponents['clothing']
  }

  return {
    categories,
    products,
    loading,
    error,
    featuredProducts,
    fetchCategories,
    fetchProducts,
    getProductById,
    getProductsByCategory,
    searchProducts
  }
})
