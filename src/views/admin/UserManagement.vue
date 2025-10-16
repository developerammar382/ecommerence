<template>
  <div class="space-y-6">
    <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
      <div>
        <h1 class="text-4xl font-display font-bold gradient-text">User Management</h1>
        <p class="text-gray-600 mt-2">Manage users and role-based access control</p>
      </div>
      <button @click="showAddModal = true" class="btn-primary flex items-center gap-2">
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/>
        </svg>
        Add User
      </button>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-4 gap-6">
      <div class="card hover-lift">
        <div class="flex items-center gap-3">
          <div class="w-12 h-12 rounded-full gradient-bg-primary flex items-center justify-center">
            <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"/>
            </svg>
          </div>
          <div>
            <p class="text-2xl font-bold">{{ totalUsers }}</p>
            <p class="text-sm text-gray-600">Total Users</p>
          </div>
        </div>
      </div>

      <div class="card hover-lift">
        <div class="flex items-center gap-3">
          <div class="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
            <svg class="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
            </svg>
          </div>
          <div>
            <p class="text-2xl font-bold text-green-600">{{ activeUsers }}</p>
            <p class="text-sm text-gray-600">Active</p>
          </div>
        </div>
      </div>

      <div class="card hover-lift">
        <div class="flex items-center gap-3">
          <div class="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
            <svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
            </svg>
          </div>
          <div>
            <p class="text-2xl font-bold text-blue-600">{{ adminUsers }}</p>
            <p class="text-sm text-gray-600">Admins</p>
          </div>
        </div>
      </div>

      <div class="card hover-lift">
        <div class="flex items-center gap-3">
          <div class="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center">
            <svg class="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"/>
            </svg>
          </div>
          <div>
            <p class="text-2xl font-bold text-purple-600">{{ newUsersThisMonth }}</p>
            <p class="text-sm text-gray-600">New (Month)</p>
          </div>
        </div>
      </div>
    </div>

    <div class="card">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div class="relative">
          <svg class="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
          </svg>
          <input v-model="searchQuery" type="search" placeholder="Search by name or email..." class="input-field pl-10" />
        </div>
        <select v-model="filterRole" class="input-field">
          <option value="">All Roles</option>
          <option value="Super Admin">Super Admin</option>
          <option value="Product Manager">Product Manager</option>
          <option value="Content Editor">Content Editor</option>
          <option value="Customer Support">Customer Support</option>
          <option value="Customer">Customer</option>
        </select>
        <select v-model="filterStatus" class="input-field">
          <option value="">All Status</option>
          <option value="Active">Active</option>
          <option value="Inactive">Inactive</option>
          <option value="Suspended">Suspended</option>
        </select>
      </div>

      <div class="overflow-x-auto">
        <table class="w-full">
          <thead>
            <tr class="border-b-2 border-gray-200">
              <th class="text-left py-4 px-3 text-sm font-semibold text-gray-700">User</th>
              <th class="text-left py-4 px-3 text-sm font-semibold text-gray-700">Email</th>
              <th class="text-left py-4 px-3 text-sm font-semibold text-gray-700">Role</th>
              <th class="text-left py-4 px-3 text-sm font-semibold text-gray-700">Status</th>
              <th class="text-left py-4 px-3 text-sm font-semibold text-gray-700">Join Date</th>
              <th class="text-left py-4 px-3 text-sm font-semibold text-gray-700">Last Active</th>
              <th class="text-left py-4 px-3 text-sm font-semibold text-gray-700">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="user in filteredUsers" :key="user.id" class="border-b hover:bg-gray-50 transition-colors">
              <td class="py-4 px-3">
                <div class="flex items-center gap-3">
                  <div class="w-10 h-10 rounded-full gradient-bg-primary text-white flex items-center justify-center font-bold">
                    {{ user.name.charAt(0) }}
                  </div>
                  <span class="font-semibold text-sm">{{ user.name }}</span>
                </div>
              </td>
              <td class="py-4 px-3 text-sm text-gray-600">{{ user.email }}</td>
              <td class="py-4 px-3">
                <select v-model="user.role" @change="updateUserRole(user)" class="px-3 py-1 rounded-lg border text-sm bg-white hover:bg-gray-50 transition-colors">
                  <option>Super Admin</option>
                  <option>Product Manager</option>
                  <option>Content Editor</option>
                  <option>Customer Support</option>
                  <option>Customer</option>
                </select>
              </td>
              <td class="py-4 px-3">
                <span :class="getStatusClass(user.status)" class="px-3 py-1 rounded-full text-xs font-medium">
                  {{ user.status }}
                </span>
              </td>
              <td class="py-4 px-3 text-sm">{{ user.joinDate }}</td>
              <td class="py-4 px-3 text-sm text-gray-600">{{ user.lastActive || '2 hours ago' }}</td>
              <td class="py-4 px-3">
                <div class="flex items-center gap-2">
                  <button @click="editUser(user)" class="p-2 hover:bg-blue-50 rounded-lg transition-colors group">
                    <svg class="w-4 h-4 text-gray-600 group-hover:text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
                    </svg>
                  </button>
                  <button @click="viewActivity(user)" class="p-2 hover:bg-green-50 rounded-lg transition-colors group">
                    <svg class="w-4 h-4 text-gray-600 group-hover:text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/>
                    </svg>
                  </button>
                  <button @click="deleteUser(user)" class="p-2 hover:bg-red-50 rounded-lg transition-colors group">
                    <svg class="w-4 h-4 text-gray-600 group-hover:text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
                    </svg>
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <Modal v-model="showAddModal" title="Add New User">
      <form @submit.prevent="addUser" class="space-y-4">
        <div>
          <label class="block text-sm font-semibold mb-2">Full Name</label>
          <input v-model="newUser.name" type="text" required class="input-field" placeholder="John Doe" />
        </div>
        <div>
          <label class="block text-sm font-semibold mb-2">Email Address</label>
          <input v-model="newUser.email" type="email" required class="input-field" placeholder="john@example.com" />
        </div>
        <div>
          <label class="block text-sm font-semibold mb-2">Role</label>
          <select v-model="newUser.role" required class="input-field">
            <option value="">Select Role</option>
            <option>Super Admin</option>
            <option>Product Manager</option>
            <option>Content Editor</option>
            <option>Customer Support</option>
            <option>Customer</option>
          </select>
        </div>
        <div>
          <label class="block text-sm font-semibold mb-2">Password</label>
          <input v-model="newUser.password" type="password" required class="input-field" placeholder="••••••••" />
        </div>
        <div class="flex justify-end gap-3 pt-4 border-t">
          <button type="button" @click="showAddModal = false" class="btn-secondary">Cancel</button>
          <button type="submit" class="btn-primary">Add User</button>
        </div>
      </form>
    </Modal>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useAdminStore } from '@/stores/admin'
import { useToast } from '@/composables/useToast'
import Modal from '@/components/ui/Modal.vue'

const adminStore = useAdminStore()
const { success } = useToast()

const searchQuery = ref('')
const filterRole = ref('')
const filterStatus = ref('')
const showAddModal = ref(false)

const newUser = ref({
  name: '',
  email: '',
  role: '',
  password: '',
  status: 'Active'
})

const users = computed(() => adminStore.users || [])
const totalUsers = computed(() => users.value.length)
const activeUsers = computed(() => users.value.filter(u => u.status === 'Active').length)
const adminUsers = computed(() => users.value.filter(u => u.role.includes('Admin')).length)
const newUsersThisMonth = computed(() => 24)

const filteredUsers = computed(() => {
  let result = users.value

  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    result = result.filter(u => 
      u.name.toLowerCase().includes(query) || 
      u.email.toLowerCase().includes(query)
    )
  }

  if (filterRole.value) {
    result = result.filter(u => u.role === filterRole.value)
  }

  if (filterStatus.value) {
    result = result.filter(u => u.status === filterStatus.value)
  }

  return result
})

function getStatusClass(status) {
  switch (status) {
    case 'Active':
      return 'bg-green-100 text-green-800'
    case 'Inactive':
      return 'bg-gray-100 text-gray-800'
    case 'Suspended':
      return 'bg-red-100 text-red-800'
    default:
      return 'bg-gray-100 text-gray-800'
  }
}

function updateUserRole(user) {
  success(`${user.name}'s role updated to ${user.role}`)
}

function editUser(user) {
  success(`Editing ${user.name}'s profile`)
}

function viewActivity(user) {
  success(`Viewing activity log for ${user.name}`)
}

function deleteUser(user) {
  if (confirm(`Are you sure you want to delete ${user.name}?`)) {
    success(`User ${user.name} deleted successfully`)
  }
}

function addUser() {
  success(`User ${newUser.value.name} added successfully!`)
  showAddModal.value = false
  newUser.value = {
    name: '',
    email: '',
    role: '',
    password: '',
    status: 'Active'
  }
}
</script>
