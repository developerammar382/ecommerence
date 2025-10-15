import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useProductStore = defineStore('products', () => {
  const categories = ref([
    { id: 1, name: 'Clothing', slug: 'clothing', icon: '👕' },
    { id: 2, name: 'Shoes', slug: 'shoes', icon: '👟' },
    { id: 3, name: 'Accessories', slug: 'accessories', icon: '👜' },
    { id: 4, name: 'Electronics', slug: 'electronics', icon: '📱' },
    { id: 5, name: 'Groceries', slug: 'groceries', icon: '🛒' },
    { id: 6, name: 'Home & Kitchen', slug: 'home-kitchen', icon: '🏠' },
    { id: 7, name: 'Health & Beauty', slug: 'health-beauty', icon: '💄' }
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
