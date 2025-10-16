<template>
  <div class="space-y-6">
    <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
      <div>
        <h1 class="text-4xl font-display font-bold gradient-text">Content Management (CMS)</h1>
        <p class="text-gray-600 mt-2">Manage website content, banners, and SEO settings</p>
      </div>
      <button @click="showContentModal = true" class="btn-primary flex items-center gap-2">
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/>
        </svg>
        Create Content
      </button>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div class="card hover-lift">
        <div class="flex items-center justify-between mb-4">
          <h3 class="font-bold text-lg">Homepage Banner</h3>
          <span class="badge-success text-xs">Active</span>
        </div>
        <div class="bg-gradient-to-r from-purple-400 to-pink-400 h-40 rounded-lg mb-4 flex items-center justify-center">
          <p class="text-white font-bold text-xl">Welcome to ShopHub</p>
        </div>
        <button @click="editBanner('homepage')" class="btn-secondary w-full">Edit Banner</button>
      </div>

      <div class="card hover-lift">
        <div class="flex items-center justify-between mb-4">
          <h3 class="font-bold text-lg">Featured Products</h3>
          <span class="badge-primary text-xs">8 Items</span>
        </div>
        <div class="bg-gray-100 h-40 rounded-lg mb-4 flex items-center justify-center p-4">
          <div class="grid grid-cols-4 gap-2">
            <div v-for="i in 8" :key="i" class="w-10 h-10 bg-gray-300 rounded"></div>
          </div>
        </div>
        <button @click="manageFeatured" class="btn-secondary w-full">Manage Featured</button>
      </div>

      <div class="card hover-lift">
        <div class="flex items-center justify-between mb-4">
          <h3 class="font-bold text-lg">Promotional Banner</h3>
          <span class="badge-warning text-xs">Scheduled</span>
        </div>
        <div class="bg-gradient-to-r from-orange-400 to-red-400 h-40 rounded-lg mb-4 flex items-center justify-center">
          <p class="text-white font-bold text-xl">SALE 50% OFF</p>
        </div>
        <button @click="editBanner('promo')" class="btn-secondary w-full">Edit Promotion</button>
      </div>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div class="card">
        <h2 class="text-2xl font-bold mb-6">SEO Settings</h2>
        <form @submit.prevent="saveSEO" class="space-y-4">
          <div>
            <label class="block text-sm font-semibold mb-2">Meta Title</label>
            <input v-model="seoSettings.title" type="text" class="input-field" placeholder="ShopHub - Your One-Stop Shop" />
            <p class="text-xs text-gray-500 mt-1">{{ seoSettings.title.length }}/60 characters</p>
          </div>
          <div>
            <label class="block text-sm font-semibold mb-2">Meta Description</label>
            <textarea v-model="seoSettings.description" class="input-field" rows="3" placeholder="Shop for clothing, electronics, groceries and more..."></textarea>
            <p class="text-xs text-gray-500 mt-1">{{ seoSettings.description.length }}/160 characters</p>
          </div>
          <div>
            <label class="block text-sm font-semibold mb-2">Meta Keywords</label>
            <input v-model="seoSettings.keywords" type="text" class="input-field" placeholder="ecommerce, shopping, online store" />
          </div>
          <div>
            <label class="block text-sm font-semibold mb-2">Canonical URL</label>
            <input v-model="seoSettings.canonical" type="url" class="input-field" placeholder="https://shophub.com" />
          </div>
          <button type="submit" class="btn-primary">Save SEO Settings</button>
        </form>
      </div>

      <div class="card">
        <h2 class="text-2xl font-bold mb-6">Page Management</h2>
        <div class="space-y-3">
          <div v-for="page in pages" :key="page.id" class="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
            <div class="flex items-center gap-3">
              <div :class="['w-10 h-10 rounded-full flex items-center justify-center', page.status === 'Published' ? 'bg-green-100' : 'bg-gray-200']">
                <svg class="w-5 h-5" :class="page.status === 'Published' ? 'text-green-600' : 'text-gray-600'" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
                </svg>
              </div>
              <div>
                <p class="font-semibold">{{ page.title }}</p>
                <p class="text-sm text-gray-600">{{ page.url }}</p>
              </div>
            </div>
            <div class="flex items-center gap-2">
              <span :class="['text-xs px-2 py-1 rounded-full', page.status === 'Published' ? 'bg-green-100 text-green-800' : 'bg-gray-200 text-gray-800']">
                {{ page.status }}
              </span>
              <button @click="editPage(page)" class="p-2 hover:bg-white rounded-lg transition-colors">
                <svg class="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="card">
      <div class="flex justify-between items-center mb-6">
        <div>
          <h2 class="text-2xl font-bold">AI Content Generator</h2>
          <p class="text-sm text-gray-600 mt-1">Generate SEO-optimized content using AI</p>
        </div>
        <button class="btn-primary flex items-center gap-2">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/>
          </svg>
          Generate with AI
        </button>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div class="p-6 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl">
          <div class="w-12 h-12 rounded-full bg-blue-500 flex items-center justify-center mb-4">
            <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
            </svg>
          </div>
          <h3 class="font-bold mb-2">Product Descriptions</h3>
          <p class="text-sm text-gray-700 mb-4">Auto-generate compelling product descriptions with AI</p>
          <button @click="generateContent('product')" class="btn-secondary w-full text-sm">Generate Now</button>
        </div>

        <div class="p-6 bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl">
          <div class="w-12 h-12 rounded-full bg-purple-500 flex items-center justify-center mb-4">
            <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"/>
            </svg>
          </div>
          <h3 class="font-bold mb-2">Blog Posts</h3>
          <p class="text-sm text-gray-700 mb-4">Create SEO-friendly blog content automatically</p>
          <button @click="generateContent('blog')" class="btn-secondary w-full text-sm">Generate Now</button>
        </div>

        <div class="p-6 bg-gradient-to-br from-green-50 to-green-100 rounded-xl">
          <div class="w-12 h-12 rounded-full bg-green-500 flex items-center justify-center mb-4">
            <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"/>
            </svg>
          </div>
          <h3 class="font-bold mb-2">Meta Tags</h3>
          <p class="text-sm text-gray-700 mb-4">Optimize meta titles and descriptions with AI</p>
          <button @click="generateContent('meta')" class="btn-secondary w-full text-sm">Generate Now</button>
        </div>
      </div>
    </div>

    <Modal v-model="showContentModal" title="Create New Content" size="xl">
      <form @submit.prevent="createContent" class="space-y-4">
        <div>
          <label class="block text-sm font-semibold mb-2">Content Type</label>
          <select v-model="newContent.type" class="input-field">
            <option value="page">Page</option>
            <option value="banner">Banner</option>
            <option value="blog">Blog Post</option>
          </select>
        </div>
        <div>
          <label class="block text-sm font-semibold mb-2">Title</label>
          <input v-model="newContent.title" type="text" required class="input-field" />
        </div>
        <div>
          <label class="block text-sm font-semibold mb-2">Content</label>
          <textarea v-model="newContent.content" rows="6" class="input-field"></textarea>
        </div>
        <div class="flex justify-end gap-3 pt-4 border-t">
          <button type="button" @click="showContentModal = false" class="btn-secondary">Cancel</button>
          <button type="submit" class="btn-primary">Create Content</button>
        </div>
      </form>
    </Modal>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useToast } from '@/composables/useToast'
import Modal from '@/components/ui/Modal.vue'

const { success } = useToast()

const showContentModal = ref(false)

const seoSettings = ref({
  title: 'ShopHub - Your One-Stop E-commerce Solution',
  description: 'Shop for clothing, electronics, groceries, and more. Fast shipping, secure payments, and amazing deals.',
  keywords: 'ecommerce, online shopping, retail, clothing, electronics',
  canonical: 'https://shophub.com'
})

const pages = [
  { id: 1, title: 'About Us', url: '/about', status: 'Published' },
  { id: 2, title: 'Contact', url: '/contact', status: 'Published' },
  { id: 3, title: 'Privacy Policy', url: '/privacy', status: 'Published' },
  { id: 4, title: 'Terms of Service', url: '/terms', status: 'Published' },
  { id: 5, title: 'Shipping Info', url: '/shipping', status: 'Draft' },
  { id: 6, title: 'FAQ', url: '/faq', status: 'Draft' }
]

const newContent = ref({
  type: 'page',
  title: '',
  content: ''
})

function editBanner(type) {
  success(`Editing ${type} banner`)
}

function manageFeatured() {
  success('Managing featured products')
}

function saveSEO() {
  success('SEO settings saved successfully!')
}

function editPage(page) {
  success(`Editing ${page.title}`)
}

function generateContent(type) {
  success(`AI is generating ${type} content...`)
}

function createContent() {
  success(`${newContent.value.type} created successfully!`)
  showContentModal.value = false
  newContent.value = {
    type: 'page',
    title: '',
    content: ''
  }
}
</script>
