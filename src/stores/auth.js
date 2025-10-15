import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useAuthStore = defineStore('auth', () => {
  const user = ref(null)
  const isAuthenticated = computed(() => !!user.value)
  const isAdmin = computed(() => user.value?.role === 'Super Admin' || user.value?.role === 'Product Manager')

  function login(email, password) {
    const mockUsers = {
      'admin@example.com': { id: 1, name: 'Admin User', email: 'admin@example.com', role: 'Super Admin' },
      'manager@example.com': { id: 2, name: 'Product Manager', email: 'manager@example.com', role: 'Product Manager' },
      'editor@example.com': { id: 3, name: 'Content Editor', email: 'editor@example.com', role: 'Content Editor' },
      'user@example.com': { id: 4, name: 'John Doe', email: 'user@example.com', role: 'Customer' }
    }

    if (mockUsers[email]) {
      user.value = mockUsers[email]
      localStorage.setItem('user', JSON.stringify(user.value))
      return true
    }
    return false
  }

  function register(userData) {
    user.value = {
      id: Date.now(),
      ...userData,
      role: 'Customer'
    }
    localStorage.setItem('user', JSON.stringify(user.value))
    return true
  }

  function logout() {
    user.value = null
    localStorage.removeItem('user')
  }

  function loadUser() {
    const savedUser = localStorage.getItem('user')
    if (savedUser) {
      user.value = JSON.parse(savedUser)
    }
  }

  loadUser()

  return {
    user,
    isAuthenticated,
    isAdmin,
    login,
    register,
    logout,
    loadUser
  }
})
