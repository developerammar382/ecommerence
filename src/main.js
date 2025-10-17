import { createApp } from 'vue'
import { createPinia } from 'pinia'
import router from './router'
import App from './App.vue'
import './style.css'

const app = createApp(App)
const pinia = createPinia()

app.use(pinia)
app.use(router)

import { useAuthStore } from './stores/auth'
import { useProductStore } from './stores/products'
import { useCartStore } from './stores/cart'

const authStore = useAuthStore()
const productStore = useProductStore()
const cartStore = useCartStore()

productStore.fetchCategories()
productStore.fetchProducts({ featured: true })

if (authStore.isAuthenticated) {
  cartStore.syncCartOnLogin()
}

app.mount('#app')
