import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useAdminStore = defineStore('admin', () => {
  const salesData = ref({
    today: 15420,
    thisWeek: 87350,
    thisMonth: 342800,
    growthRate: 12.5
  })

  const dashboardStats = ref({
    totalProducts: 1250,
    totalOrders: 3421,
    totalCustomers: 8934,
    revenue: 342800,
    pendingOrders: 45,
    lowStockItems: 23
  })

  const recentOrders = ref([
    { id: 'ORD-1245', customer: 'John Smith', amount: 249.99, status: 'Processing', date: '2025-10-15' },
    { id: 'ORD-1244', customer: 'Sarah Johnson', amount: 149.50, status: 'Shipped', date: '2025-10-15' },
    { id: 'ORD-1243', customer: 'Mike Brown', amount: 89.99, status: 'Delivered', date: '2025-10-14' },
    { id: 'ORD-1242', customer: 'Emily Davis', amount: 399.99, status: 'Processing', date: '2025-10-14' },
    { id: 'ORD-1241', customer: 'Chris Wilson', amount: 199.99, status: 'Shipped', date: '2025-10-13' }
  ])

  const topProducts = ref([
    { id: 10, name: 'Wireless Headphones', sales: 421, revenue: 84179 },
    { id: 11, name: 'Smart Phone Pro', sales: 289, revenue: 260011 },
    { id: 4, name: 'Running Shoes Pro', sales: 203, revenue: 24358 },
    { id: 19, name: 'Vitamin C Serum', sales: 456, revenue: 15950 },
    { id: 17, name: 'Knife Set Pro', sales: 312, revenue: 40548 }
  ])

  const users = ref([
    { id: 1, name: 'Admin User', email: 'admin@example.com', role: 'Super Admin', status: 'Active', joinDate: '2024-01-15' },
    { id: 2, name: 'Product Manager', email: 'manager@example.com', role: 'Product Manager', status: 'Active', joinDate: '2024-03-20' },
    { id: 3, name: 'Content Editor', email: 'editor@example.com', role: 'Content Editor', status: 'Active', joinDate: '2024-05-10' },
    { id: 4, name: 'John Doe', email: 'user@example.com', role: 'Customer', status: 'Active', joinDate: '2025-01-05' },
    { id: 5, name: 'Jane Smith', email: 'jane@example.com', role: 'Customer', status: 'Active', joinDate: '2025-02-12' }
  ])

  const inventoryAlerts = ref([
    { id: 1, product: 'Winter Jacket', stock: 5, threshold: 10, priority: 'high' },
    { id: 2, product: 'Leather Boots', stock: 8, threshold: 15, priority: 'medium' },
    { id: 3, product: 'Smart Phone Pro', stock: 12, threshold: 20, priority: 'medium' }
  ])

  return {
    salesData,
    dashboardStats,
    recentOrders,
    topProducts,
    users,
    inventoryAlerts
  }
})
