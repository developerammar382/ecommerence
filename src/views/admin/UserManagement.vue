<template>
  <div>
    <div class="flex justify-between items-center mb-8">
      <h1 class="text-3xl font-bold">User Management</h1>
      <button class="btn-primary">+ Add User</button>
    </div>

    <div class="card">
      <div class="overflow-x-auto">
        <table class="w-full">
          <thead>
            <tr class="border-b">
              <th class="text-left py-3">Name</th>
              <th class="text-left py-3">Email</th>
              <th class="text-left py-3">Role</th>
              <th class="text-left py-3">Status</th>
              <th class="text-left py-3">Join Date</th>
              <th class="text-left py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="user in users" :key="user.id" class="border-b">
              <td class="py-3 font-semibold">{{ user.name }}</td>
              <td class="py-3">{{ user.email }}</td>
              <td class="py-3">
                <select :value="user.role" class="px-3 py-1 rounded border text-sm">
                  <option>Super Admin</option>
                  <option>Product Manager</option>
                  <option>Content Editor</option>
                  <option>Customer Support</option>
                  <option>Customer</option>
                </select>
              </td>
              <td class="py-3">
                <span class="px-3 py-1 rounded-full text-sm bg-green-100 text-green-800">
                  {{ user.status }}
                </span>
              </td>
              <td class="py-3">{{ user.joinDate }}</td>
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
import { useAdminStore } from '@/stores/admin'

const adminStore = useAdminStore()
const users = adminStore.users
</script>
