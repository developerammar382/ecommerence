<template>
  <div class="relative h-[600px] overflow-hidden bg-gray-900">
    <div 
      class="flex transition-transform duration-700 ease-in-out h-full"
      :style="{ transform: `translateX(-${currentSlide * 100}%)` }"
    >
      <div 
        v-for="(slide, index) in slides" 
        :key="index"
        class="min-w-full h-full relative"
      >
        <img 
          :src="slide.image" 
          :alt="slide.title"
          class="w-full h-full object-cover"
        />
        <div class="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent"></div>
        
        <div class="absolute inset-0 flex items-center">
          <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <div class="max-w-2xl animate-fade-in">
              <h2 class="text-5xl md:text-6xl font-display font-bold text-white mb-4 leading-tight">
                {{ slide.title }}
              </h2>
              <p class="text-xl md:text-2xl text-gray-200 mb-8">
                {{ slide.subtitle }}
              </p>
              <div class="flex gap-4">
                <router-link 
                  :to="slide.primaryLink" 
                  class="bg-gradient-to-r from-primary-600 to-purple-600 text-white px-8 py-4 rounded-lg font-semibold hover:from-primary-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 inline-block"
                >
                  {{ slide.primaryButton }}
                </router-link>
                <router-link 
                  v-if="slide.secondaryButton"
                  :to="slide.secondaryLink" 
                  class="bg-white/20 backdrop-blur-sm text-white px-8 py-4 rounded-lg font-semibold hover:bg-white/30 transition-all duration-300 border-2 border-white/50 inline-block"
                >
                  {{ slide.secondaryButton }}
                </router-link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex gap-3 z-10">
      <button
        v-for="(slide, index) in slides"
        :key="index"
        @click="goToSlide(index)"
        class="transition-all duration-300"
        :class="currentSlide === index ? 'w-12 bg-white' : 'w-3 bg-white/50 hover:bg-white/70'"
        style="height: 12px; border-radius: 6px;"
      ></button>
    </div>

    <button
      @click="prevSlide"
      class="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/20 backdrop-blur-sm text-white p-3 rounded-full hover:bg-white/30 transition-all duration-300 z-10 group"
    >
      <svg class="w-6 h-6 transform group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/>
      </svg>
    </button>

    <button
      @click="nextSlide"
      class="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/20 backdrop-blur-sm text-white p-3 rounded-full hover:bg-white/30 transition-all duration-300 z-10 group"
    >
      <svg class="w-6 h-6 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
      </svg>
    </button>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const currentSlide = ref(0)
let autoplayInterval = null

const slides = [
  {
    image: '/attached_assets/stock_images/modern_ecommerce_sho_21ab7e37.jpg',
    title: 'Summer Fashion Collection',
    subtitle: 'Discover the latest trends in fashion with up to 50% off',
    primaryButton: 'Shop Now',
    primaryLink: '/products?category=clothing',
    secondaryButton: 'Learn More',
    secondaryLink: '/products'
  },
  {
    image: '/attached_assets/stock_images/electronics_gadgets__5cc1c371.jpg',
    title: 'Latest Tech Gadgets',
    subtitle: 'Cutting-edge electronics at unbeatable prices',
    primaryButton: 'Explore Electronics',
    primaryLink: '/products?category=electronics',
    secondaryButton: 'View Deals',
    secondaryLink: '/products'
  },
  {
    image: '/attached_assets/stock_images/modern_ecommerce_sho_e67eb602.jpg',
    title: 'Your Style, Your Way',
    subtitle: 'Premium quality products delivered to your doorstep',
    primaryButton: 'Start Shopping',
    primaryLink: '/products',
    secondaryButton: null,
    secondaryLink: ''
  },
  {
    image: '/attached_assets/stock_images/electronics_gadgets__fbcacf06.jpg',
    title: 'Smart Living Starts Here',
    subtitle: 'Transform your home with innovative technology',
    primaryButton: 'Discover More',
    primaryLink: '/products?category=home-kitchen',
    secondaryButton: 'View All',
    secondaryLink: '/products'
  },
  {
    image: '/attached_assets/stock_images/modern_ecommerce_sho_20d98e60.jpg',
    title: 'Exclusive Deals Await',
    subtitle: 'Limited time offers on your favorite brands',
    primaryButton: 'Shop Sale',
    primaryLink: '/products',
    secondaryButton: 'Sign Up',
    secondaryLink: '/register'
  }
]

const nextSlide = () => {
  currentSlide.value = (currentSlide.value + 1) % slides.length
}

const prevSlide = () => {
  currentSlide.value = currentSlide.value === 0 ? slides.length - 1 : currentSlide.value - 1
}

const goToSlide = (index) => {
  currentSlide.value = index
}

const startAutoplay = () => {
  autoplayInterval = setInterval(() => {
    nextSlide()
  }, 5000)
}

const stopAutoplay = () => {
  if (autoplayInterval) {
    clearInterval(autoplayInterval)
  }
}

onMounted(() => {
  startAutoplay()
})

onUnmounted(() => {
  stopAutoplay()
})
</script>
