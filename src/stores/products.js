import { defineStore } from 'pinia'
import { ref, computed, h } from 'vue'

export const useProductStore = defineStore('products', () => {
  const categories = ref([
    { 
      id: 1, 
      name: 'Clothing', 
      slug: 'clothing', 
      icon: '👕',
      iconComponent: (props) => h('svg', { class: props.class || 'w-10 h-10', fill: 'none', stroke: 'currentColor', viewBox: '0 0 24 24' }, [
        h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', 'stroke-width': '2', d: 'M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h8m-8 0v-2m8 2a4 4 0 004-4V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v12a4 4 0 004 4zm0 0v-2' })
      ])
    },
    { 
      id: 2, 
      name: 'Shoes', 
      slug: 'shoes', 
      icon: '👟',
      iconComponent: (props) => h('svg', { class: props.class || 'w-10 h-10', fill: 'currentColor', viewBox: '0 0 24 24' }, [
        h('path', { d: 'M2 17.5C2 18.88 3.12 20 4.5 20h15c1.38 0 2.5-1.12 2.5-2.5V16c0-.83-.67-1.5-1.5-1.5H3.5c-.83 0-1.5.67-1.5 1.5v1.5zm2-4C4 12.67 4.67 12 5.5 12h13c.83 0 1.5.67 1.5 1.5V14h-18v-.5zm16-3.5H4c0-3.31 2.69-6 6-6 1.54 0 2.94.59 4 1.55 1.06-.96 2.46-1.55 4-1.55 3.31 0 6 2.69 6 6z' })
      ])
    },
    { 
      id: 3, 
      name: 'Accessories', 
      slug: 'accessories', 
      icon: '👜',
      iconComponent: (props) => h('svg', { class: props.class || 'w-10 h-10', fill: 'none', stroke: 'currentColor', viewBox: '0 0 24 24' }, [
        h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', 'stroke-width': '2', d: 'M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z' })
      ])
    },
    { 
      id: 4, 
      name: 'Electronics', 
      slug: 'electronics', 
      icon: '📱',
      iconComponent: (props) => h('svg', { class: props.class || 'w-10 h-10', fill: 'none', stroke: 'currentColor', viewBox: '0 0 24 24' }, [
        h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', 'stroke-width': '2', d: 'M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z' })
      ])
    },
    { 
      id: 5, 
      name: 'Groceries', 
      slug: 'groceries', 
      icon: '🛒',
      iconComponent: (props) => h('svg', { class: props.class || 'w-10 h-10', fill: 'none', stroke: 'currentColor', viewBox: '0 0 24 24' }, [
        h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', 'stroke-width': '2', d: 'M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z' })
      ])
    },
    { 
      id: 6, 
      name: 'Home & Kitchen', 
      slug: 'home-kitchen', 
      icon: '🏠',
      iconComponent: (props) => h('svg', { class: props.class || 'w-10 h-10', fill: 'none', stroke: 'currentColor', viewBox: '0 0 24 24' }, [
        h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', 'stroke-width': '2', d: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6' })
      ])
    },
    { 
      id: 7, 
      name: 'Health & Beauty', 
      slug: 'health-beauty', 
      icon: '💄',
      iconComponent: (props) => h('svg', { class: props.class || 'w-10 h-10', fill: 'none', stroke: 'currentColor', viewBox: '0 0 24 24' }, [
        h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', 'stroke-width': '2', d: 'M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z' })
      ])
    }
  ])

  const products = ref([
    // Clothing
    { id: 1, name: 'Classic Cotton T-Shirt', price: 29.99, category: 'Clothing', categoryId: 1, image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400', description: 'Comfortable cotton t-shirt perfect for everyday wear', stock: 150, rating: 4.5, reviews: 89, featured: true },
    { id: 2, name: 'Slim Fit Jeans', price: 79.99, category: 'Clothing', categoryId: 1, image: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=400', description: 'Modern slim fit jeans with stretch fabric', stock: 80, rating: 4.3, reviews: 124 },
    { id: 3, name: 'Winter Jacket', price: 149.99, category: 'Clothing', categoryId: 1, image: 'https://images.unsplash.com/photo-1544022613-e87ca75a784a?w=400', description: 'Warm winter jacket with waterproof exterior', stock: 45, rating: 4.7, reviews: 67, featured: true },
    
    // Shoes
    { id: 4, name: 'Running Shoes Pro', price: 119.99, category: 'Shoes', categoryId: 2, image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400', description: 'Professional running shoes with superior cushioning', stock: 120, rating: 4.8, reviews: 203, featured: true },
    { id: 5, name: 'Casual Sneakers', price: 69.99, category: 'Shoes', categoryId: 2, image: 'https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?w=400', description: 'Stylish casual sneakers for everyday comfort', stock: 95, rating: 4.4, reviews: 156 },
    { id: 6, name: 'Leather Boots', price: 159.99, category: 'Shoes', categoryId: 2, image: 'https://images.unsplash.com/photo-1608256246200-53e635b5b65f?w=400', description: 'Premium leather boots with classic design', stock: 60, rating: 4.6, reviews: 88 },
    
    // Accessories
    { id: 7, name: 'Leather Wallet', price: 49.99, category: 'Accessories', categoryId: 3, image: 'https://images.unsplash.com/photo-1627123424574-724758594e93?w=400', description: 'Genuine leather wallet with RFID protection', stock: 200, rating: 4.5, reviews: 310 },
    { id: 8, name: 'Designer Sunglasses', price: 89.99, category: 'Accessories', categoryId: 3, image: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=400', description: 'UV protection sunglasses with polarized lenses', stock: 75, rating: 4.7, reviews: 142, featured: true },
    { id: 9, name: 'Smart Watch Band', price: 34.99, category: 'Accessories', categoryId: 3, image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400', description: 'Premium silicone watch band for smart watches', stock: 180, rating: 4.3, reviews: 95 },
    
    // Electronics
    { id: 10, name: 'Wireless Headphones', price: 199.99, category: 'Electronics', categoryId: 4, image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400', description: 'Noise-cancelling wireless headphones with premium sound', stock: 85, rating: 4.9, reviews: 421, featured: true },
    { id: 11, name: 'Smart Phone Pro', price: 899.99, category: 'Electronics', categoryId: 4, image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400', description: 'Latest smartphone with advanced camera system', stock: 55, rating: 4.8, reviews: 589 },
    { id: 12, name: 'Tablet 10 inch', price: 449.99, category: 'Electronics', categoryId: 4, image: 'https://images.unsplash.com/photo-1561154464-82e9adf32764?w=400', description: 'Powerful tablet for work and entertainment', stock: 70, rating: 4.6, reviews: 234 },
    
    // Groceries
    { id: 13, name: 'Organic Green Tea', price: 12.99, category: 'Groceries', categoryId: 5, image: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=400', description: 'Premium organic green tea leaves', stock: 300, rating: 4.4, reviews: 167 },
    { id: 14, name: 'Almond Butter', price: 9.99, category: 'Groceries', categoryId: 5, image: 'https://images.unsplash.com/photo-1595385365936-9bae34e45fdd?w=400', description: 'Natural almond butter, no added sugar', stock: 250, rating: 4.6, reviews: 203 },
    { id: 15, name: 'Quinoa Pack', price: 7.99, category: 'Groceries', categoryId: 5, image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400', description: 'Organic quinoa, high in protein', stock: 400, rating: 4.5, reviews: 145 },
    
    // Home & Kitchen
    { id: 16, name: 'Coffee Maker Deluxe', price: 89.99, category: 'Home & Kitchen', categoryId: 6, image: 'https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?w=400', description: 'Programmable coffee maker with thermal carafe', stock: 65, rating: 4.7, reviews: 298, featured: true },
    { id: 17, name: 'Knife Set Pro', price: 129.99, category: 'Home & Kitchen', categoryId: 6, image: 'https://images.unsplash.com/photo-1593618998160-e34014e67546?w=400', description: 'Professional 8-piece knife set', stock: 90, rating: 4.8, reviews: 412 },
    { id: 18, name: 'Ceramic Cookware Set', price: 159.99, category: 'Home & Kitchen', categoryId: 6, image: 'https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=400', description: 'Non-stick ceramic cookware, 10 pieces', stock: 55, rating: 4.6, reviews: 189 },
    
    // Health & Beauty
    { id: 19, name: 'Vitamin C Serum', price: 34.99, category: 'Health & Beauty', categoryId: 7, image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=400', description: 'Anti-aging vitamin C serum for radiant skin', stock: 150, rating: 4.7, reviews: 456, featured: true },
    { id: 20, name: 'Essential Oil Set', price: 44.99, category: 'Health & Beauty', categoryId: 7, image: 'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=400', description: 'Pure essential oils collection, 6 bottles', stock: 120, rating: 4.5, reviews: 267 },
    { id: 21, name: 'Yoga Mat Premium', price: 59.99, category: 'Health & Beauty', categoryId: 7, image: 'https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=400', description: 'Eco-friendly yoga mat with carry strap', stock: 100, rating: 4.6, reviews: 178 }
  ])

  const featuredProducts = computed(() => products.value.filter(p => p.featured))
  
  function getProductById(id) {
    return products.value.find(p => p.id === parseInt(id))
  }

  function getProductsByCategory(categoryId) {
    if (!categoryId) return products.value
    return products.value.filter(p => p.categoryId === parseInt(categoryId))
  }

  function searchProducts(query) {
    if (!query) return products.value
    const lowerQuery = query.toLowerCase()
    return products.value.filter(p => 
      p.name.toLowerCase().includes(lowerQuery) || 
      p.description.toLowerCase().includes(lowerQuery) ||
      p.category.toLowerCase().includes(lowerQuery)
    )
  }

  return {
    categories,
    products,
    featuredProducts,
    getProductById,
    getProductsByCategory,
    searchProducts
  }
})
