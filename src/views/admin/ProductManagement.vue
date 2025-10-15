<template>
  <div>
    <div class="flex justify-between items-center mb-8">
      <h1 class="text-3xl font-bold">Product Management</h1>
      <button class="btn-primary">+ Add Product</button>
    </div>

    <div class="card mb-6">
      <div class="flex gap-4">
        <input type="search" placeholder="Search products..." class="input-field flex-1" />
        <select class="input-field w-48">
          <option value="">All Categories</option>
          <option v-for="cat in categories" :key="cat.id">{{ cat.name }}</option>
        </select>
      </div>
    </div>

    <div class="card">
      <div class="overflow-x-auto">
        <table class="w-full">
          <thead>
            <tr class="border-b">
              <th class="text-left py-3">Product</th>
              <th class="text-left py-3">Category</th>
              <th class="text-left py-3">Price</th>
              <th class="text-left py-3">Stock</th>
              <th class="text-left py-3">Rating</th>
              <th class="text-left py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="product in products.slice(0, 10)" :key="product.id" class="border-b">
              <td class="py-3">
                <div class="flex items-center gap-3">
                  <img :src="product.image" :alt="product.name" class="w-12 h-12 object-cover rounded" />
                  <span class="font-semibold">{{ product.name }}</span>
                </div>
              </td>
              <td class="py-3">{{ product.category }}</td>
              <td class="py-3">${{ product.price }}</td>
              <td class="py-3">
                <span :class="product.stock > 50 ? 'text-green-600' : 'text-orange-600'">
                  {{ product.stock }}
                </span>
              </td>
              <td class="py-3">★ {{ product.rating }}</td>
              <td class="py-3">
                <div class="flex gap-2">
                  <button class="text-blue-600 hover:text-blue-800">Edit</button>
                  <button class="text-red-600 hover:text-red-800">Delete</button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useProductStore } from '@/stores/products'

const productStore = useProductStore()
const products = productStore.products
const categories = productStore.categories
</script>
