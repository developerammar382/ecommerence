<template>
  <div class="flex items-center justify-center" :class="containerClass">
    <div class="relative">
      <div 
        class="animate-spin rounded-full border-t-2 border-b-2"
        :class="[spinnerClass, sizeClass]"
      ></div>
      <div v-if="text" class="mt-4 text-center text-gray-600">
        {{ text }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  size: {
    type: String,
    default: 'md',
    validator: (value) => ['sm', 'md', 'lg', 'xl'].includes(value)
  },
  color: {
    type: String,
    default: 'primary'
  },
  text: {
    type: String,
    default: ''
  },
  fullScreen: {
    type: Boolean,
    default: false
  }
})

const sizeClass = computed(() => {
  const sizes = {
    sm: 'h-6 w-6',
    md: 'h-10 w-10',
    lg: 'h-16 w-16',
    xl: 'h-24 w-24'
  }
  return sizes[props.size]
})

const spinnerClass = computed(() => {
  const colors = {
    primary: 'border-primary-600',
    secondary: 'border-secondary-600',
    white: 'border-white',
    gray: 'border-gray-600'
  }
  return colors[props.color] || colors.primary
})

const containerClass = computed(() => {
  return props.fullScreen ? 'min-h-screen' : 'p-8'
})
</script>
