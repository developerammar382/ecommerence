<template>
  <div v-if="product" class="page-container">
    <nav class="text-sm breadcrumbs mb-6">
      <ol class="flex items-center space-x-2 text-gray-600">
        <li><router-link to="/" class="hover:text-primary-600">Home</router-link></li>
        <li><span class="mx-2">/</span></li>
        <li><router-link to="/products" class="hover:text-primary-600">Products</router-link></li>
        <li><span class="mx-2">/</span></li>
        <li class="text-gray-900 font-medium">{{ product.name }}</li>
      </ol>
    </nav>

    <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
      <div class="space-y-4">
        <div class="relative group overflow-hidden rounded-2xl shadow-lg">
          <img 
            :src="selectedImage" 
            :alt="product.name" 
            class="w-full h-[500px] object-cover transition-transform duration-300 group-hover:scale-105" 
          />
          <div v-if="canTryOn" class="absolute bottom-4 right-4">
            <button @click="showTryOnModal = true" class="btn-primary flex items-center gap-2">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
              </svg>
              Virtual Try-On
            </button>
          </div>
        </div>
        
        <div class="grid grid-cols-4 gap-4">
          <img 
            v-for="(img, index) in productImages" 
            :key="index"
            :src="img" 
            @click="selectedImage = img"
            :class="selectedImage === img ? 'ring-2 ring-primary-600' : ''"
            class="w-full h-24 object-cover rounded-lg cursor-pointer hover:opacity-75 transition-opacity"
          />
        </div>
      </div>

      <div class="space-y-6">
        <div>
          <div class="flex items-center justify-between mb-2">
            <h1 class="text-4xl font-display font-bold text-gray-900">{{ product.name }}</h1>
            <button @click="toggleWishlist" class="p-3 rounded-full hover:bg-gray-100 transition-colors">
              <svg class="w-7 h-7" :class="isInWishlist ? 'text-red-500 fill-current' : 'text-gray-400'" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>
              </svg>
            </button>
          </div>
          
          <div class="flex items-center gap-4 mb-4">
            <div class="flex items-center">
              <svg v-for="i in 5" :key="i" class="w-5 h-5" 
                :class="i <= Math.round(product.rating) ? 'text-yellow-400' : 'text-gray-300'"
                fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
              </svg>
              <span class="ml-2 text-gray-600">{{ product.rating }} ({{ product.reviews }} reviews)</span>
            </div>
            <span class="badge-primary">{{ product.category }}</span>
          </div>
          
          <p class="text-5xl font-bold gradient-text mb-4">${{ product.price.toFixed(2) }}</p>
          <p class="text-gray-700 text-lg leading-relaxed">{{ product.description }}</p>
        </div>

        <div v-if="product.categoryId === 1 || product.categoryId === 2" class="space-y-4">
          <div>
            <label class="block text-sm font-semibold mb-2">Size</label>
            <div class="flex flex-wrap gap-2">
              <button 
                v-for="size in sizes" 
                :key="size"
                @click="selectedSize = size"
                class="px-6 py-3 border-2 rounded-lg font-medium transition-all"
                :class="selectedSize === size 
                  ? 'border-primary-600 bg-primary-50 text-primary-600' 
                  : 'border-gray-300 hover:border-primary-300'"
              >
                {{ size }}
              </button>
            </div>
          </div>

          <div>
            <label class="block text-sm font-semibold mb-2">Color</label>
            <div class="flex gap-2">
              <button 
                v-for="color in colors" 
                :key="color"
                @click="selectedColor = color"
                class="w-10 h-10 rounded-full border-2 transition-all"
                :class="selectedColor === color ? 'ring-2 ring-primary-600 ring-offset-2' : ''"
                :style="{ backgroundColor: color }"
              ></button>
            </div>
          </div>
        </div>

        <div class="space-y-4">
          <div class="flex items-center gap-4">
            <label class="text-sm font-semibold">Quantity</label>
            <div class="flex items-center gap-3">
              <button @click="decreaseQuantity" class="w-10 h-10 rounded-lg border-2 border-gray-300 hover:border-primary-500 font-bold">-</button>
              <span class="w-16 text-center text-lg font-semibold">{{ quantity }}</span>
              <button @click="increaseQuantity" class="w-10 h-10 rounded-lg border-2 border-gray-300 hover:border-primary-500 font-bold">+</button>
            </div>
          </div>

          <div class="flex items-center gap-2 text-sm">
            <svg class="w-5 h-5" :class="product.stock > 50 ? 'text-green-500' : 'text-orange-500'" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
            </svg>
            <span :class="product.stock > 50 ? 'text-green-700' : 'text-orange-700'" class="font-medium">
              {{ product.stock }} units in stock
            </span>
          </div>
        </div>

        <div class="flex gap-4 pt-4">
          <button @click="addToCart" class="flex-1 btn-primary text-lg py-4" :disabled="product.stock === 0">
            <svg class="w-6 h-6 inline mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"/>
            </svg>
            {{ product.stock === 0 ? 'Out of Stock' : 'Add to Cart' }}
          </button>
          <button @click="buyNow" class="btn-secondary text-lg py-4 px-8">
            Buy Now
          </button>
        </div>

        <div class="grid grid-cols-3 gap-4 pt-6 border-t">
          <div class="text-center">
            <svg class="w-8 h-8 mx-auto mb-2 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"/>
            </svg>
            <p class="text-sm font-medium">Free Delivery</p>
          </div>
          <div class="text-center">
            <svg class="w-8 h-8 mx-auto mb-2 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.40A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/>
            </svg>
            <p class="text-sm font-medium">Secure Payment</p>
          </div>
          <div class="text-center">
            <svg class="w-8 h-8 mx-auto mb-2 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6"/>
            </svg>
            <p class="text-sm font-medium">30-Day Returns</p>
          </div>
        </div>
      </div>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
      <div class="lg:col-span-2">
        <div class="card">
          <div class="flex border-b mb-6">
            <button 
              v-for="tab in tabs" 
              :key="tab"
              @click="activeTab = tab"
              class="px-6 py-4 font-semibold transition-colors relative"
              :class="activeTab === tab ? 'text-primary-600' : 'text-gray-600 hover:text-gray-900'"
            >
              {{ tab }}
              <div v-if="activeTab === tab" class="absolute bottom-0 left-0 right-0 h-0.5 bg-primary-600"></div>
            </button>
          </div>

          <div v-if="activeTab === 'Description'" class="prose max-w-none">
            <h3 class="text-xl font-semibold mb-4">Product Details</h3>
            <p class="text-gray-700 mb-4">{{ product.description }}</p>
            <ul class="space-y-2">
              <li class="flex items-start">
                <svg class="w-5 h-5 text-green-500 mr-2 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
                </svg>
                High-quality materials and construction
              </li>
              <li class="flex items-start">
                <svg class="w-5 h-5 text-green-500 mr-2 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
                </svg>
                Durable and long-lasting
              </li>
              <li class="flex items-start">
                <svg class="w-5 h-5 text-green-500 mr-2 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
                </svg>
                Designed for comfort and performance
              </li>
            </ul>
          </div>

          <div v-if="activeTab === 'Reviews'" class="space-y-6">
            <div class="flex items-center justify-between mb-6">
              <div>
                <div class="flex items-center gap-2 mb-2">
                  <span class="text-4xl font-bold">{{ product.rating }}</span>
                  <div class="flex">
                    <svg v-for="i in 5" :key="i" class="w-6 h-6" 
                      :class="i <= Math.round(product.rating) ? 'text-yellow-400' : 'text-gray-300'"
                      fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                    </svg>
                  </div>
                </div>
                <p class="text-gray-600">Based on {{ product.reviews }} reviews</p>
              </div>
              <button class="btn-primary">Write a Review</button>
            </div>

            <div v-for="review in mockReviews" :key="review.id" class="border-b pb-6">
              <div class="flex items-start gap-4">
                <div class="w-12 h-12 rounded-full bg-gradient-to-br from-primary-400 to-purple-600 flex items-center justify-center text-white font-bold">
                  {{ review.author[0] }}
                </div>
                <div class="flex-1">
                  <div class="flex items-center justify-between mb-2">
                    <div>
                      <p class="font-semibold">{{ review.author }}</p>
                      <div class="flex items-center gap-2">
                        <div class="flex">
                          <svg v-for="i in 5" :key="i" class="w-4 h-4" 
                            :class="i <= review.rating ? 'text-yellow-400' : 'text-gray-300'"
                            fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                          </svg>
                        </div>
                        <span class="text-sm text-gray-500">{{ review.date }}</span>
                      </div>
                    </div>
                    <span v-if="review.verified" class="badge-success text-xs">Verified Purchase</span>
                  </div>
                  <p class="text-gray-700">{{ review.comment }}</p>
                </div>
              </div>
            </div>
          </div>

          <div v-if="activeTab === 'Shipping'" class="prose max-w-none">
            <h3 class="text-xl font-semibold mb-4">Shipping & Returns</h3>
            <div class="space-y-4">
              <div>
                <h4 class="font-semibold mb-2">Free Shipping</h4>
                <p class="text-gray-700">Free standard shipping on all orders over $50. Delivery in 5-7 business days.</p>
              </div>
              <div>
                <h4 class="font-semibold mb-2">Express Shipping</h4>
                <p class="text-gray-700">Get your order in 2-3 business days for an additional fee.</p>
              </div>
              <div>
                <h4 class="font-semibold mb-2">30-Day Returns</h4>
                <p class="text-gray-700">Not satisfied? Return your purchase within 30 days for a full refund.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="space-y-6">
        <div class="card">
          <h3 class="font-semibold text-lg mb-4">Seller Information</h3>
          <div class="space-y-3">
            <div class="flex items-center gap-2">
              <svg class="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
              </svg>
              <span class="text-sm">Verified Seller</span>
            </div>
            <div class="flex items-center gap-2">
              <svg class="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
              </svg>
              <span class="text-sm">Ships within 24 hours</span>
            </div>
            <div class="flex items-center gap-2">
              <svg class="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
              </svg>
              <span class="text-sm">98% positive ratings</span>
            </div>
          </div>
        </div>

        <div class="card">
          <h3 class="font-semibold text-lg mb-4">Share this product</h3>
          <div class="flex gap-2">
            <button class="flex-1 p-2 border rounded-lg hover:bg-gray-50 transition-colors">
              <svg class="w-6 h-6 mx-auto text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
            </button>
            <button class="flex-1 p-2 border rounded-lg hover:bg-gray-50 transition-colors">
              <svg class="w-6 h-6 mx-auto text-blue-400" fill="currentColor" viewBox="0 0 24 24">
                <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
              </svg>
            </button>
            <button class="flex-1 p-2 border rounded-lg hover:bg-gray-50 transition-colors">
              <svg class="w-6 h-6 mx-auto text-red-500" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0zm5.01 4.744c.688 0 1.25.561 1.25 1.249a1.25 1.25 0 0 1-2.498.056l-2.597-.547-.8 3.747c1.824.07 3.48.632 4.674 1.488.308-.309.73-.491 1.207-.491.968 0 1.754.786 1.754 1.754 0 .716-.435 1.333-1.01 1.614a3.111 3.111 0 0 1 .042.52c0 2.694-3.13 4.87-7.004 4.87-3.874 0-7.004-2.176-7.004-4.87 0-.183.015-.366.043-.534A1.748 1.748 0 0 1 4.028 12c0-.968.786-1.754 1.754-1.754.463 0 .898.196 1.207.49 1.207-.883 2.878-1.43 4.744-1.487l.885-4.182a.342.342 0 0 1 .14-.197.35.35 0 0 1 .238-.042l2.906.617a1.214 1.214 0 0 1 1.108-.701zM9.25 12C8.561 12 8 12.562 8 13.25c0 .687.561 1.248 1.25 1.248.687 0 1.248-.561 1.248-1.249 0-.688-.561-1.249-1.249-1.249zm5.5 0c-.687 0-1.248.561-1.248 1.25 0 .687.561 1.248 1.249 1.248.688 0 1.249-.561 1.249-1.249 0-.687-.562-1.249-1.25-1.249zm-5.466 3.99a.327.327 0 0 0-.231.094.33.33 0 0 0 0 .463c.842.842 2.484.913 2.961.913.477 0 2.105-.056 2.961-.913a.361.361 0 0 0 .029-.463.33.33 0 0 0-.464 0c-.547.533-1.684.73-2.512.73-.828 0-1.979-.196-2.512-.73a.326.326 0 0 0-.232-.095z"/>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>

    <div v-if="relatedProducts.length > 0" class="mb-16">
      <h2 class="section-title mb-8">You May Also Like</h2>
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <ProductCard 
          v-for="relatedProduct in relatedProducts" 
          :key="relatedProduct.id" 
          :product="relatedProduct"
          @try-on="openTryOnModal"
        />
      </div>
    </div>

    <Modal 
      v-model="showTryOnModal" 
      title="Virtual Try-On" 
      size="xl"
      :close-on-backdrop="false"
    >
      <VirtualTryOn 
        v-if="product" 
        :product="product"
        @close="showTryOnModal = false"
      />
    </Modal>
  </div>

  <div v-else class="page-container">
    <EmptyState 
      title="Product Not Found"
      description="The product you're looking for doesn't exist or has been removed."
      actionText="Back to Products"
      @action="$router.push('/products')"
    />
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useProductStore } from '@/stores/products'
import { useCartStore } from '@/stores/cart'
import { useWishlistStore } from '@/stores/wishlist'
import { useToast } from '@/composables/useToast'
import ProductCard from '@/components/ui/ProductCard.vue'
import Modal from '@/components/ui/Modal.vue'
import VirtualTryOn from '@/components/VirtualTryOn.vue'
import EmptyState from '@/components/ui/EmptyState.vue'

const route = useRoute()
const router = useRouter()
const productStore = useProductStore()
const cartStore = useCartStore()
const wishlistStore = useWishlistStore()
const { success } = useToast()

const quantity = ref(1)
const selectedImage = ref('')
const selectedSize = ref('M')
const selectedColor = ref('#000000')
const activeTab = ref('Description')
const showTryOnModal = ref(false)

const product = computed(() => productStore.getProductById(route.params.id))
const isInWishlist = computed(() => product.value && wishlistStore.isInWishlist(product.value.id))

const productImages = computed(() => {
  if (!product.value) return []
  return [product.value.image, product.value.image, product.value.image, product.value.image]
})

const canTryOn = computed(() => {
  if (!product.value) return false
  const tryOnCategories = [1, 2, 3]
  return tryOnCategories.includes(product.value.categoryId)
})

const relatedProducts = computed(() => {
  if (!product.value) return []
  return productStore.getProductsByCategory(product.value.categoryId)
    .filter(p => p.id !== product.value.id)
    .slice(0, 4)
})

const tabs = ['Description', 'Reviews', 'Shipping']
const sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL']
const colors = ['#000000', '#FFFFFF', '#FF0000', '#0000FF', '#00FF00']

const mockReviews = [
  {
    id: 1,
    author: 'Sarah Johnson',
    rating: 5,
    date: '2 days ago',
    comment: 'Absolutely love this product! The quality is outstanding and it arrived faster than expected.',
    verified: true
  },
  {
    id: 2,
    author: 'Mike Chen',
    rating: 4,
    date: '1 week ago',
    comment: 'Great product overall. Exactly as described. Would recommend to friends.',
    verified: true
  },
  {
    id: 3,
    author: 'Emily Rodriguez',
    rating: 5,
    date: '2 weeks ago',
    comment: 'Best purchase I\'ve made this year. The attention to detail is impressive.',
    verified: false
  }
]

if (product.value) {
  selectedImage.value = product.value.image
}

function increaseQuantity() {
  if (product.value && quantity.value < product.value.stock) {
    quantity.value++
  }
}

function decreaseQuantity() {
  if (quantity.value > 1) {
    quantity.value--
  }
}

function addToCart() {
  if (product.value) {
    cartStore.addToCart(product.value, quantity.value)
    success(`Added ${quantity.value} x ${product.value.name} to cart!`)
  }
}

function buyNow() {
  addToCart()
  router.push('/cart')
}

function toggleWishlist() {
  if (product.value) {
    wishlistStore.toggleWishlist(product.value)
    if (isInWishlist.value) {
      success('Removed from wishlist')
    } else {
      success('Added to wishlist!')
    }
  }
}

function openTryOnModal(prod) {
  showTryOnModal.value = true
}
</script>
