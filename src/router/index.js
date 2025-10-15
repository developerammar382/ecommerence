import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const routes = [
  {
    path: '/',
    component: () => import('@/layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        name: 'Home',
        component: () => import('@/views/Home.vue')
      },
      {
        path: '/products',
        name: 'Products',
        component: () => import('@/views/ProductList.vue')
      },
      {
        path: '/products/:id',
        name: 'ProductDetail',
        component: () => import('@/views/ProductDetail.vue')
      },
      {
        path: '/cart',
        name: 'Cart',
        component: () => import('@/views/Cart.vue')
      },
      {
        path: '/checkout',
        name: 'Checkout',
        component: () => import('@/views/Checkout.vue')
      },
      {
        path: '/account',
        name: 'Account',
        component: () => import('@/views/Account.vue'),
        meta: { requiresAuth: true }
      },
      {
        path: '/orders',
        name: 'Orders',
        component: () => import('@/views/Orders.vue'),
        meta: { requiresAuth: true }
      },
      {
        path: '/wishlist',
        name: 'Wishlist',
        component: () => import('@/views/Wishlist.vue'),
        meta: { requiresAuth: true }
      }
    ]
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/auth/Login.vue')
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('@/views/auth/Register.vue')
  },
  {
    path: '/admin',
    component: () => import('@/layouts/AdminLayout.vue'),
    meta: { requiresAuth: true, requiresAdmin: true },
    children: [
      {
        path: '',
        name: 'AdminDashboard',
        component: () => import('@/views/admin/Dashboard.vue')
      },
      {
        path: 'products',
        name: 'AdminProducts',
        component: () => import('@/views/admin/ProductManagement.vue')
      },
      {
        path: 'categories',
        name: 'AdminCategories',
        component: () => import('@/views/admin/CategoryManagement.vue')
      },
      {
        path: 'inventory',
        name: 'AdminInventory',
        component: () => import('@/views/admin/InventoryManagement.vue')
      },
      {
        path: 'orders',
        name: 'AdminOrders',
        component: () => import('@/views/admin/OrderManagement.vue')
      },
      {
        path: 'users',
        name: 'AdminUsers',
        component: () => import('@/views/admin/UserManagement.vue')
      },
      {
        path: 'content',
        name: 'AdminContent',
        component: () => import('@/views/admin/ContentManagement.vue')
      },
      {
        path: 'analytics',
        name: 'AdminAnalytics',
        component: () => import('@/views/admin/Analytics.vue')
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore()
  
  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    next({ name: 'Login', query: { redirect: to.fullPath } })
  } else if (to.meta.requiresAdmin && !authStore.isAdmin) {
    next({ name: 'Home' })
  } else {
    next()
  }
})

export default router
