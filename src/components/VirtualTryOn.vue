<template>
  <div class="space-y-6">
    <div class="text-center mb-6">
      <h3 class="text-xl font-semibold mb-2">Try {{ product.name }} Virtually</h3>
      <p class="text-gray-600">Use your camera or upload a photo to see how this product looks on you</p>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div class="space-y-4">
        <div class="card">
          <h4 class="font-semibold mb-4">Choose Input Method</h4>
          <div class="grid grid-cols-2 gap-3">
            <button 
              @click="inputMethod = 'camera'"
              class="p-4 border-2 rounded-lg transition-all"
              :class="inputMethod === 'camera' ? 'border-primary-600 bg-primary-50' : 'border-gray-300 hover:border-primary-300'"
            >
              <svg class="w-8 h-8 mx-auto mb-2" :class="inputMethod === 'camera' ? 'text-primary-600' : 'text-gray-400'" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"/>
              </svg>
              <span class="text-sm font-medium">Live Camera</span>
            </button>
            <button 
              @click="inputMethod = 'upload'"
              class="p-4 border-2 rounded-lg transition-all"
              :class="inputMethod === 'upload' ? 'border-primary-600 bg-primary-50' : 'border-gray-300 hover:border-primary-300'"
            >
              <svg class="w-8 h-8 mx-auto mb-2" :class="inputMethod === 'upload' ? 'text-primary-600' : 'text-gray-400'" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/>
              </svg>
              <span class="text-sm font-medium">Upload Photo</span>
            </button>
          </div>
        </div>

        <div class="card" v-if="inputMethod === 'upload'">
          <label class="block">
            <span class="font-semibold mb-2 block">Upload Your Photo</span>
            <div class="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-primary-500 transition-colors cursor-pointer">
              <input 
                type="file" 
                @change="handleFileUpload" 
                accept="image/*" 
                class="hidden"
                ref="fileInput"
              />
              <svg class="w-12 h-12 mx-auto mb-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"/>
              </svg>
              <p class="text-sm text-gray-600">Click to upload or drag and drop</p>
              <p class="text-xs text-gray-500 mt-1">PNG, JPG up to 10MB</p>
            </div>
          </label>
        </div>

        <div class="card">
          <h4 class="font-semibold mb-4">Customization Options</h4>
          <div class="space-y-4">
            <div v-if="product.categoryId === 1 || product.categoryId === 2">
              <label class="block text-sm font-medium mb-2">Size</label>
              <div class="flex flex-wrap gap-2">
                <button 
                  v-for="size in ['XS', 'S', 'M', 'L', 'XL', 'XXL']" 
                  :key="size"
                  @click="selectedSize = size"
                  class="px-4 py-2 border-2 rounded-lg transition-all"
                  :class="selectedSize === size ? 'border-primary-600 bg-primary-50 text-primary-600' : 'border-gray-300 hover:border-primary-300'"
                >
                  {{ size }}
                </button>
              </div>
            </div>

            <div>
              <label class="block text-sm font-medium mb-2">Zoom Level: {{ zoomLevel }}%</label>
              <input 
                type="range" 
                min="50" 
                max="150" 
                v-model.number="zoomLevel"
                class="w-full"
              />
            </div>

            <div>
              <label class="block text-sm font-medium mb-2">Opacity: {{ opacity }}%</label>
              <input 
                type="range" 
                min="20" 
                max="100" 
                v-model.number="opacity"
                class="w-full"
              />
            </div>
          </div>
        </div>
      </div>

      <div class="space-y-4">
        <div class="card h-96 flex items-center justify-center bg-gray-100 relative overflow-hidden">
          <div v-if="!cameraActive && !uploadedImage" class="text-center">
            <svg class="w-24 h-24 mx-auto mb-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
            </svg>
            <p class="text-gray-500">
              {{ inputMethod === 'camera' ? 'Click "Start Camera" to begin' : 'Upload a photo to start' }}
            </p>
          </div>

          <video 
            v-if="cameraActive" 
            ref="video" 
            autoplay 
            playsinline
            class="w-full h-full object-cover"
          ></video>

          <img 
            v-if="uploadedImage" 
            :src="uploadedImage" 
            alt="Uploaded photo"
            class="w-full h-full object-contain"
          />

          <div 
            v-if="showOverlay"
            class="absolute inset-0 flex items-center justify-center pointer-events-none"
          >
            <img 
              :src="product.image" 
              alt="Product overlay"
              class="transition-all duration-200"
              :style="overlayStyle"
            />
          </div>
        </div>

        <div class="flex gap-3">
          <button 
            v-if="inputMethod === 'camera' && !cameraActive"
            @click="startCamera"
            class="btn-primary flex-1"
          >
            <svg class="w-5 h-5 inline mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"/>
            </svg>
            Start Camera
          </button>

          <button 
            v-if="cameraActive"
            @click="stopCamera"
            class="btn-secondary flex-1"
          >
            <svg class="w-5 h-5 inline mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
            </svg>
            Stop Camera
          </button>

          <button 
            @click="toggleOverlay"
            :disabled="!cameraActive && !uploadedImage"
            class="btn-primary flex-1"
            :class="{ 'opacity-50 cursor-not-allowed': !cameraActive && !uploadedImage }"
          >
            {{ showOverlay ? 'Hide' : 'Show' }} Product
          </button>

          <button 
            v-if="cameraActive || uploadedImage"
            @click="captureSnapshot"
            class="btn-secondary"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"/>
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"/>
            </svg>
          </button>
        </div>

        <div v-if="snapshot" class="card">
          <h4 class="font-semibold mb-3">Preview</h4>
          <img :src="snapshot" alt="Snapshot" class="w-full rounded-lg mb-3" />
          <div class="flex gap-2">
            <button @click="downloadSnapshot" class="btn-primary flex-1 text-sm">
              <svg class="w-4 h-4 inline mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"/>
              </svg>
              Download
            </button>
            <button @click="snapshot = null" class="btn-outline text-sm">
              Retake
            </button>
          </div>
        </div>
      </div>
    </div>

    <div class="flex justify-end gap-3 pt-4 border-t">
      <button @click="$emit('close')" class="btn-outline">
        Close
      </button>
      <button @click="addToCartAndClose" class="btn-primary">
        <svg class="w-5 h-5 inline mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"/>
        </svg>
        Add to Cart
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onBeforeUnmount } from 'vue'
import { useCartStore } from '@/stores/cart'
import { useToast } from '@/composables/useToast'

const props = defineProps({
  product: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['close'])

const cartStore = useCartStore()
const { success } = useToast()

const inputMethod = ref('camera')
const cameraActive = ref(false)
const video = ref(null)
const stream = ref(null)
const uploadedImage = ref(null)
const fileInput = ref(null)
const showOverlay = ref(false)
const selectedSize = ref('M')
const zoomLevel = ref(100)
const opacity = ref(70)
const snapshot = ref(null)

const overlayStyle = computed(() => ({
  transform: `scale(${zoomLevel.value / 100})`,
  opacity: opacity.value / 100,
  maxWidth: '60%',
  maxHeight: '60%'
}))

async function startCamera() {
  try {
    stream.value = await navigator.mediaDevices.getUserMedia({ 
      video: { facingMode: 'user', width: 640, height: 480 } 
    })
    if (video.value) {
      video.value.srcObject = stream.value
      cameraActive.value = true
      showOverlay.value = true
    }
  } catch (error) {
    alert('Unable to access camera. Please check permissions or try uploading a photo instead.')
  }
}

function stopCamera() {
  if (stream.value) {
    stream.value.getTracks().forEach(track => track.stop())
    stream.value = null
    cameraActive.value = false
    showOverlay.value = false
  }
}

function handleFileUpload(event) {
  const file = event.target.files[0]
  if (file) {
    const reader = new FileReader()
    reader.onload = (e) => {
      uploadedImage.value = e.target.result
      showOverlay.value = true
    }
    reader.readAsDataURL(file)
  }
}

function toggleOverlay() {
  showOverlay.value = !showOverlay.value
}

function captureSnapshot() {
  const canvas = document.createElement('canvas')
  const context = canvas.getContext('2d')
  
  canvas.width = 640
  canvas.height = 480
  
  if (cameraActive.value && video.value) {
    context.drawImage(video.value, 0, 0, canvas.width, canvas.height)
  } else if (uploadedImage.value) {
    const img = new Image()
    img.onload = () => {
      context.drawImage(img, 0, 0, canvas.width, canvas.height)
    }
    img.src = uploadedImage.value
  }
  
  snapshot.value = canvas.toDataURL('image/png')
}

function downloadSnapshot() {
  if (snapshot.value) {
    const link = document.createElement('a')
    link.href = snapshot.value
    link.download = `tryon-${props.product.name.replace(/\s+/g, '-').toLowerCase()}.png`
    link.click()
  }
}

function addToCartAndClose() {
  cartStore.addToCart(props.product)
  success(`${props.product.name} added to cart!`)
  emit('close')
}

onBeforeUnmount(() => {
  stopCamera()
})
</script>
