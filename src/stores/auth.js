import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import api from '../config/api'

export const useAuthStore = defineStore('auth', () => {
  const user = ref(null)
  const token = ref(null)
  const isAuthenticated = computed(() => !!user.value && !!token.value)
  const isAdmin = computed(() => user.value?.role === 'admin' || user.value?.role === 'product_manager')

  async function login(email, password) {
    try {
      const response = await api.post('/auth/login', { email, password })
      user.value = response.data.user
      token.value = response.data.token
      
      localStorage.setItem('user', JSON.stringify(user.value))
      localStorage.setItem('authToken', token.value)
      
      return { success: true }
    } catch (error) {
      console.error('Login error:', error)
      return { 
        success: false, 
        error: error.response?.data?.error || 'Login failed' 
      }
    }
  }

  async function register(userData) {
    try {
      const response = await api.post('/auth/register', userData)
      user.value = response.data.user
      token.value = response.data.token
      
      localStorage.setItem('user', JSON.stringify(user.value))
      localStorage.setItem('authToken', token.value)
      
      return { success: true }
    } catch (error) {
      console.error('Register error:', error)
      return { 
        success: false, 
        error: error.response?.data?.error || 'Registration failed' 
      }
    }
  }

  async function getProfile() {
    try {
      const response = await api.get('/auth/profile')
      user.value = response.data.user
      localStorage.setItem('user', JSON.stringify(user.value))
    } catch (error) {
      console.error('Get profile error:', error)
      logout()
    }
  }

  async function updateProfile(updates) {
    try {
      const response = await api.put('/auth/profile', updates)
      user.value = response.data.user
      localStorage.setItem('user', JSON.stringify(user.value))
      return { success: true }
    } catch (error) {
      console.error('Update profile error:', error)
      return { 
        success: false, 
        error: error.response?.data?.error || 'Update failed' 
      }
    }
  }

  function logout() {
    user.value = null
    token.value = null
    localStorage.removeItem('user')
    localStorage.removeItem('authToken')
  }

  function loadUser() {
    const savedUser = localStorage.getItem('user')
    const savedToken = localStorage.getItem('authToken')
    
    if (savedUser && savedToken) {
      user.value = JSON.parse(savedUser)
      token.value = savedToken
    }
  }

  loadUser()

  return {
    user,
    token,
    isAuthenticated,
    isAdmin,
    login,
    register,
    logout,
    loadUser,
    getProfile,
    updateProfile
  }
})
