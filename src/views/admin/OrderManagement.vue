<template>
  <div>
    <h1 class="text-3xl font-bold mb-8">Order Management</h1>

    <div class="card mb-6">
      <div class="flex gap-4">
        <input type="search" placeholder="Search orders..." class="input-field flex-1" />
        <select class="input-field w-48">
          <option value="">All Status</option>
          <option>Processing</option>
          <option>Shipped</option>
          <option>Delivered</option>
        </select>
      </div>
    </div>

    <div class="card">
      <div class="overflow-x-auto">
        <table class="w-full">
          <thead>
            <tr class="border-b">
              <th class="text-left py-3">Order ID</th>
              <th class="text-left py-3">Customer</th>
              <th class="text-left py-3">Date</th>
              <th class="text-left py-3">Amount</th>
              <th class="text-left py-3">Status</th>
              <th class="text-left py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="order in recentOrders" :key="order.id" class="border-b">
              <td class="py-3 font-semibold">{{ order.id }}</td>
              <td class="py-3">{{ order.customer }}</td>
              <td class="py-3">{{ order.date }}</td>
              <td class="py-3">${{ order.amount }}</td>
              <td class="py-3">
                <select :value="order.status" class="px-3 py-1 rounded-full text-sm border">
                  <option>Processing</option>
                  <option>Shipped</option>
                  <option>Delivered</option>
                </select>
              </td>
              <td class="py-3">
                <button class="text-primary-600 hover:text-primary-800">View Details</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useAdminStore } from '@/stores/admin'

const adminStore = useAdminStore()
const recentOrders = adminStore.recentOrders
</script>
