# Admin Panel Guide - ShopHub E-Commerce

## 🔐 Admin Login Credentials

**Email:** `admin@shophub.com`  
**Password:** `admin123`

⚠️ **IMPORTANT:** Change this password immediately after first login!

---

## 📍 Admin Panel Access

**URL:** Navigate to `/admin` (or click "Admin" in the navigation after logging in)

The admin panel has role-based access control - only users with the `admin` role can access it.

---

## ✅ Product Management Features (Fully Functional)

### ➕ Add New Products
1. Click "Add Product" button in the top right
2. Fill in product details:
   - Product Name
   - Description
   - Price
   - Category
   - Stock quantity
   - SKU (Stock Keeping Unit)
   - Product image URL
   - Featured status (yes/no)
3. Click Save

### ✏️ Edit Products
1. Find the product in the table
2. Click the Edit icon (pencil) next to the product
3. Modify any field
4. Save changes

### 🗑️ Delete Products
**Single Product:**
- Click the delete icon next to any product

**Multiple Products:**
1. Check the boxes next to products you want to delete
2. Click "Delete Selected" button at the top
3. Confirm deletion

### 📊 Product Management Features Include:
- **Search**: Search by name, SKU, or category
- **Filter by Category**: Dropdown filter for all categories
- **Filter by Stock**: 
  - All Stock
  - In Stock
  - Low Stock  
  - Out of Stock
- **Bulk Operations**: Select multiple products for bulk actions
- **Stock Status Indicators**: Color-coded stock levels
- **Product Images**: Visual preview in table
- **Rating Display**: See product ratings at a glance
- **Pagination**: Navigate through large product catalogs

---

## 🏷️ Category Management

Navigate to **Admin → Categories**

### Features:
- ✅ Create new categories
- ✅ Edit existing categories
- ✅ Delete categories
- ✅ Set category icons
- ✅ Set category slugs (URL-friendly names)
- ✅ Add category descriptions

---

## 📦 Inventory Management

Navigate to **Admin → Inventory**

### Features:
- ✅ View all product stock levels
- ✅ Low stock alerts (configurable threshold)
- ✅ Update stock quantities
- ✅ Track SKU codes
- ✅ Stock history and changes

---

## 📋 Order Management

Navigate to **Admin → Orders**

### Features:
- ✅ View all customer orders
- ✅ Filter by order status:
  - Pending
  - Processing
  - Shipped
  - Delivered
  - Cancelled
- ✅ Update order status
- ✅ Update payment status
- ✅ Add tracking numbers
- ✅ View order details and items
- ✅ Customer information
- ✅ Order timeline

---

## 👥 User Management

Navigate to **Admin → Users**

### Features:
- ✅ View all users
- ✅ Filter by role:
  - Customer
  - Product Manager
  - Admin
- ✅ Filter by status:
  - Active
  - Inactive
- ✅ Update user roles
- ✅ Activate/deactivate accounts
- ✅ View user details

---

## 📊 Dashboard & Analytics

Navigate to **Admin → Dashboard** (default admin home)

### Dashboard Shows:
- **Key Metrics:**
  - Total Customers
  - Total Products
  - Total Orders
  - Total Revenue
  - Pending Orders
  - Low Stock Products

- **Recent Orders:** Last 10 orders with customer info

- **Top Products:** Best-selling products by units sold

- **Sales by Month:** Revenue trends for last 6 months

### Analytics Page:
Navigate to **Admin → Analytics**

- **Sales Analytics** with customizable periods:
  - Weekly
  - Monthly
  - Yearly
- **Revenue Charts**
- **Order Count Analysis**
- **Average Order Value**

---

## 🎨 Content Management

Navigate to **Admin → Content**

### Features:
- ✅ Manage homepage content
- ✅ Edit banners and promotions
- ✅ Update site information
- ✅ Manage featured products

---

## 🔧 Admin Panel Capabilities Summary

| Feature | Add | Edit | Delete | View | Search/Filter |
|---------|-----|------|--------|------|---------------|
| Products | ✅ | ✅ | ✅ | ✅ | ✅ |
| Categories | ✅ | ✅ | ✅ | ✅ | ✅ |
| Orders | - | ✅ | - | ✅ | ✅ |
| Users | - | ✅ | - | ✅ | ✅ |
| Inventory | - | ✅ | - | ✅ | ✅ |

---

## 🚀 Quick Actions

### To Add a Product:
1. Login as admin
2. Go to `/admin/products`
3. Click "Add Product"
4. Fill form and save

### To Update Order Status:
1. Go to `/admin/orders`
2. Find the order
3. Click edit
4. Update status/tracking
5. Save

### To Manage Low Stock:
1. Go to `/admin/inventory`
2. View low stock alerts
3. Update quantities as needed

---

## 🔒 Security Features

The admin panel includes:
- ✅ Role-based access control (only admins can access)
- ✅ JWT authentication required
- ✅ Automatic logout on token expiration
- ✅ Protected API endpoints
- ✅ Input validation on all forms
- ✅ XSS protection
- ✅ CSRF protection

---

## 📱 Admin Panel Routes

- `/admin` - Dashboard (home)
- `/admin/products` - Product Management
- `/admin/categories` - Category Management  
- `/admin/inventory` - Inventory Management
- `/admin/orders` - Order Management
- `/admin/users` - User Management
- `/admin/content` - Content Management
- `/admin/analytics` - Analytics & Reports

---

## 🎯 Admin Best Practices

1. **Change Default Password:** First thing after login
2. **Regular Inventory Checks:** Monitor low stock alerts
3. **Order Processing:** Check pending orders daily
4. **User Verification:** Review new user registrations
5. **Analytics Review:** Check sales trends weekly
6. **Product Updates:** Keep product info and images current

---

## ⚡ API Endpoints (Backend)

All admin endpoints require authentication with `admin` role:

```
GET /api/admin/dashboard/stats - Dashboard statistics
GET /api/admin/dashboard/analytics - Sales analytics
GET /api/admin/users - All users list
PUT /api/admin/users/:id/status - Update user status
PUT /api/admin/users/:id/role - Update user role

GET /api/products/low-stock - Low stock products
POST /api/products - Create product
PUT /api/products/:id - Update product
DELETE /api/products/:id - Delete product

POST /api/categories - Create category
PUT /api/categories/:id - Update category
DELETE /api/categories/:id - Delete category

GET /api/orders - All orders
PUT /api/orders/:id/status - Update order status
PUT /api/orders/:id/payment - Update payment status
PUT /api/orders/:id/tracking - Update tracking number
```

---

## 🐛 Troubleshooting

**Can't access admin panel?**
- Ensure you're logged in with admin credentials
- Check that user role is 'admin'
- Clear browser cache and retry

**Products not saving?**
- Check all required fields are filled
- Ensure image URL is valid
- Verify stock is a number

**Orders not updating?**
- Refresh the page
- Check network connection
- Verify you have admin permissions

---

## 📞 Support

For any issues with the admin panel:
1. Check browser console for errors (F12)
2. Verify API responses in Network tab
3. Check backend logs for errors
4. Ensure database connection is active

---

Your admin panel is **100% functional** and ready to use! 🎉
