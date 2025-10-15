<template>
  <div class="fixed bottom-6 right-6 z-50">
    <button 
      v-if="!isOpen" 
      @click="isOpen = true"
      class="bg-primary-600 text-white rounded-full p-4 shadow-lg hover:bg-primary-700 transition-all"
    >
      <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"/>
      </svg>
    </button>

    <div v-if="isOpen" class="bg-white rounded-lg shadow-2xl w-96 flex flex-col" style="height: 500px;">
      <div class="bg-primary-600 text-white p-4 rounded-t-lg flex justify-between items-center">
        <div class="flex items-center space-x-2">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
          </svg>
          <div>
            <h3 class="font-semibold">AI Assistant</h3>
            <p class="text-xs text-primary-100">Always here to help</p>
          </div>
        </div>
        <button @click="isOpen = false" class="text-white hover:text-gray-200">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
          </svg>
        </button>
      </div>

      <div class="flex-1 overflow-y-auto p-4 space-y-4">
        <div v-for="(message, index) in messages" :key="index" :class="['flex', message.isUser ? 'justify-end' : 'justify-start']">
          <div :class="['max-w-xs px-4 py-2 rounded-lg', message.isUser ? 'bg-primary-600 text-white' : 'bg-gray-200 text-gray-800']">
            {{ message.text }}
          </div>
        </div>
        <div v-if="isTyping" class="flex justify-start">
          <div class="bg-gray-200 text-gray-800 px-4 py-2 rounded-lg">
            <span class="animate-pulse">AI is typing...</span>
          </div>
        </div>
      </div>

      <div class="p-4 border-t">
        <div class="flex space-x-2">
          <input 
            v-model="userInput" 
            @keyup.enter="sendMessage"
            type="text" 
            placeholder="Type your message..." 
            class="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
          />
          <button @click="sendMessage" class="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"/>
            </svg>
          </button>
        </div>
        <div class="mt-2 flex flex-wrap gap-2">
          <button 
            v-for="suggestion in suggestions" 
            :key="suggestion" 
            @click="sendQuickMessage(suggestion)"
            class="text-xs bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-1 rounded-full"
          >
            {{ suggestion }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const isOpen = ref(false)
const messages = ref([
  { text: "Hi! I'm your AI shopping assistant. How can I help you today?", isUser: false }
])
const userInput = ref('')
const isTyping = ref(false)

const suggestions = [
  'Track my order',
  'Product recommendations',
  'Return policy',
  'Customer support'
]

const responses = {
  order: "You can track your order in the 'My Orders' section. Please log in to view your order status.",
  recommend: "Based on your browsing history, I recommend checking out our featured products! We have great deals on electronics and clothing.",
  return: "Our return policy allows returns within 30 days of purchase. Items must be in original condition with tags attached.",
  support: "I'm here to help! You can also reach our customer support team at support@shophub.com or call 1-800-SHOP-HUB.",
  default: "I can help you with order tracking, product recommendations, returns, and general support. What would you like to know?"
}

function getAIResponse(message) {
  const lowerMessage = message.toLowerCase()
  
  if (lowerMessage.includes('order') || lowerMessage.includes('track')) {
    return responses.order
  } else if (lowerMessage.includes('recommend') || lowerMessage.includes('suggest')) {
    return responses.recommend
  } else if (lowerMessage.includes('return') || lowerMessage.includes('refund')) {
    return responses.return
  } else if (lowerMessage.includes('support') || lowerMessage.includes('help') || lowerMessage.includes('contact')) {
    return responses.support
  } else {
    return responses.default
  }
}

function sendMessage() {
  if (userInput.value.trim()) {
    messages.value.push({ text: userInput.value, isUser: true })
    const userMessage = userInput.value
    userInput.value = ''
    
    isTyping.value = true
    setTimeout(() => {
      const aiResponse = getAIResponse(userMessage)
      messages.value.push({ text: aiResponse, isUser: false })
      isTyping.value = false
    }, 1000)
  }
}

function sendQuickMessage(message) {
  userInput.value = message
  sendMessage()
}
</script>
