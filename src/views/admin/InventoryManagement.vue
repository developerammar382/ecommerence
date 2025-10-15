<template>
  <div>
    <h1 class="text-3xl font-bold mb-8">Inventory Management</h1>

    <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      <div class="card">
        <h3 class="text-gray-600 mb-2">Total Stock Value</h3>
        <p class="text-3xl font-bold text-primary-600">$284,560</p>
      </div>
      <div class="card">
        <h3 class="text-gray-600 mb-2">Low Stock Items</h3>
        <p class="text-3xl font-bold text-orange-600">{{ adminStore.inventoryAlerts.length }}</p>
      </div>
      <div class="card">
        <h3 class="text-gray-600 mb-2">Out of Stock</h3>
        <p class="text-3xl font-bold text-red-600">0</p>
      </div>
    </div>

    <div class="card">
      <div class="overflow-x-auto">
        <table class="w-full">
          <thead>
            <tr class="border-b">
              <th class="text-left py-3">Product</th>
              <th class="text-left py-3">SKU</th>
              <th class="text-left py-3">Current Stock</th>
              <th class="text-left py-3">Reorder Level</th>
              <th class="text-left py-3">Status</th>
              <th class="text-left py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="product in products.slice(0, 12)" :key="product.id" class="border-b">
              <td class="py-3">{{ product.name }}</td>
              <td class="py-3 text-gray-600">SKU-{{ product.id.toString().padStart(4, '0') }}</td>
              <td class="py-3 font-semibold">{{ product.stock }}</td>
              <td class="py-3">{{ Math.floor(product.stock * 0.2) }}</td>
              <td class="py-3">
                <span :class="['px-3 py-1 rounded-full text-sm', getStockStatus(product.stock)]">
                  {{ product.stock > 50 ? 'In Stock' : 'Low Stock' }}
                </span>
              </td>
              <td class="py-3">
                <button class="btn-primary text-sm">Update Stock</button>
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
import { useAdminStore } from '@/stores/admin'

const productStore = useProductStore()
const adminStore = useAdminStore()
const products = productStore.products

function getStockStatus(stock) {
  if (stock > 50) return 'bg-green-100 text-green-800'
  if (stock > 20) return 'bg-yellow-100 text-yellow-800'
  return 'bg-red-100 text-red-800'
}
</script>
