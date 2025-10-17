# API Reference - Quick Guide

## Base URL
- **Local**: `http://localhost:3000/api`
- **Replit**: `https://your-replit-url.replit.dev/api`

## Authentication
Include JWT token in header for protected routes:
```
Authorization: Bearer <your-jwt-token>
```

---

## 🔐 Authentication Endpoints

### Register User
```http
POST /api/auth/register
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123",
  "name": "John Doe"
}

Response: { user, token }
```

### Login
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123"
}

Response: { user, token }
```

### Get Profile
```http
GET /api/auth/profile
Authorization: Bearer <token>

Response: { user }
```

### Update Profile
```http
PUT /api/auth/profile
Authorization: Bearer <token>
Content-Type: application/json

{
  "name": "John Updated",
  "phone": "1234567890",
  "address": "123 Main St"
}

Response: { user }
```

### Change Password
```http
PUT /api/auth/change-password
Authorization: Bearer <token>
Content-Type: application/json

{
  "currentPassword": "oldpass123",
  "newPassword": "newpass123"
}

Response: { message }
```

---

## 🛍️ Product Endpoints

### Get All Products
```http
GET /api/products?category_id=1&featured=true&search=shirt&min_price=10&max_price=100&limit=20

Response: { products: [...], count: 20 }
```

### Get Product by ID
```http
GET /api/products/:id

Response: { product }
```

### Create Product (Admin/Product Manager)
```http
POST /api/products
Authorization: Bearer <admin-token>
Content-Type: application/json

{
  "name": "Product Name",
  "description": "Product description",
  "price": 29.99,
  "category_id": 1,
  "image": "https://image-url.com/image.jpg",
  "stock": 100,
  "sku": "PROD-001",
  "featured": true
}

Response: { product }
```

### Update Product (Admin/Product Manager)
```http
PUT /api/products/:id
Authorization: Bearer <admin-token>
Content-Type: application/json

{
  "name": "Updated Name",
  "price": 39.99,
  "stock": 50
}

Response: { product }
```

### Delete Product (Admin/Product Manager)
```http
DELETE /api/products/:id
Authorization: Bearer <admin-token>

Response: { message }
```

### Get Low Stock Products (Admin)
```http
GET /api/products/low-stock?threshold=10
Authorization: Bearer <admin-token>

Response: { products: [...], count }
```

---

## 📁 Category Endpoints

### Get All Categories
```http
GET /api/categories

Response: { categories: [...], count }
```

### Get Category by ID
```http
GET /api/categories/:id

Response: { category }
```

### Create Category (Admin)
```http
POST /api/categories
Authorization: Bearer <admin-token>
Content-Type: application/json

{
  "name": "Electronics",
  "slug": "electronics",
  "description": "Electronic items",
  "icon": "⚡"
}

Response: { category }
```

### Update Category (Admin)
```http
PUT /api/categories/:id
Authorization: Bearer <admin-token>

Response: { category }
```

### Delete Category (Admin)
```http
DELETE /api/categories/:id
Authorization: Bearer <admin-token>

Response: { message }
```

---

## 🛒 Cart Endpoints

### Get Cart
```http
GET /api/cart
Authorization: Bearer <token>

Response: { items: [...], total, count }
```

### Add to Cart
```http
POST /api/cart
Authorization: Bearer <token>
Content-Type: application/json

{
  "product_id": 1,
  "quantity": 2
}

Response: { item }
```

### Update Cart Item
```http
PUT /api/cart/:product_id
Authorization: Bearer <token>
Content-Type: application/json

{
  "quantity": 3
}

Response: { item }
```

### Remove from Cart
```http
DELETE /api/cart/:product_id
Authorization: Bearer <token>

Response: { message }
```

### Clear Cart
```http
DELETE /api/cart
Authorization: Bearer <token>

Response: { message }
```

---

## 📦 Order Endpoints

### Create Order
```http
POST /api/orders
Authorization: Bearer <token>
Content-Type: application/json

{
  "payment_method": "credit_card",
  "shipping_address": "123 Main St",
  "shipping_city": "New York",
  "shipping_state": "NY",
  "shipping_zip": "10001",
  "shipping_country": "USA",
  "notes": "Please ring doorbell"
}

Response: { order }
```

### Get My Orders
```http
GET /api/orders/my-orders?status=pending
Authorization: Bearer <token>

Response: { orders: [...], count }
```

### Get Order by ID
```http
GET /api/orders/:id
Authorization: Bearer <token>

Response: { order }
```

### Get All Orders (Admin)
```http
GET /api/orders?status=pending&payment_status=paid
Authorization: Bearer <admin-token>

Response: { orders: [...], count }
```

### Update Order Status (Admin)
```http
PUT /api/orders/:id/status
Authorization: Bearer <admin-token>
Content-Type: application/json

{
  "status": "shipped"
}

Response: { order }
```

### Update Payment Status (Admin)
```http
PUT /api/orders/:id/payment
Authorization: Bearer <admin-token>
Content-Type: application/json

{
  "payment_status": "paid"
}

Response: { order }
```

### Update Tracking Number (Admin)
```http
PUT /api/orders/:id/tracking
Authorization: Bearer <admin-token>
Content-Type: application/json

{
  "tracking_number": "TRACK123456"
}

Response: { order }
```

---

## 💳 Payment Endpoints

### Create Payment Intent
```http
POST /api/payment/create-intent
Authorization: Bearer <token>
Content-Type: application/json

{
  "amount": 99.99,
  "currency": "usd",
  "metadata": {
    "order_id": "123"
  }
}

Response: { clientSecret, paymentIntentId }
```

### Get Payment Intent Status
```http
GET /api/payment/intent/:paymentIntentId
Authorization: Bearer <token>

Response: { status, amount, currency }
```

### Process Refund (Admin)
```http
POST /api/payment/refund
Authorization: Bearer <admin-token>
Content-Type: application/json

{
  "paymentIntentId": "pi_xxx",
  "amount": 50.00,
  "reason": "requested_by_customer"
}

Response: { refund }
```

### Stripe Webhook
```http
POST /api/payment/webhook
Content-Type: application/json
Stripe-Signature: <signature>

[Stripe webhook payload]
```

---

## 👨‍💼 Admin Endpoints

### Get Dashboard Stats
```http
GET /api/admin/dashboard/stats
Authorization: Bearer <admin-token>

Response: {
  stats: { total_customers, total_products, total_orders, total_revenue, ... },
  recentOrders: [...],
  topProducts: [...],
  salesByMonth: [...]
}
```

### Get Sales Analytics
```http
GET /api/admin/dashboard/analytics?period=month
Authorization: Bearer <admin-token>

Query params: period = "week" | "month" | "year"

Response: { analytics: [...] }
```

### Get All Users
```http
GET /api/admin/users?role=customer&status=active
Authorization: Bearer <admin-token>

Response: { users: [...], count }
```

### Update User Status (Admin)
```http
PUT /api/admin/users/:id/status
Authorization: Bearer <admin-token>
Content-Type: application/json

{
  "status": "inactive"
}

Response: { user }
```

### Update User Role (Admin)
```http
PUT /api/admin/users/:id/role
Authorization: Bearer <admin-token>
Content-Type: application/json

{
  "role": "product_manager"
}

Response: { user }
```

---

## ❤️ Wishlist Endpoints

### Get Wishlist
```http
GET /api/wishlist
Authorization: Bearer <token>

Response: { items: [...], count }
```

### Add to Wishlist
```http
POST /api/wishlist
Authorization: Bearer <token>
Content-Type: application/json

{
  "product_id": 1
}

Response: { item }
```

### Remove from Wishlist
```http
DELETE /api/wishlist/:product_id
Authorization: Bearer <token>

Response: { message }
```

---

## ⭐ Review Endpoints

### Get Product Reviews
```http
GET /api/reviews/:product_id

Response: { reviews: [...], count, averageRating }
```

### Add Review
```http
POST /api/reviews
Authorization: Bearer <token>
Content-Type: application/json

{
  "product_id": 1,
  "rating": 5,
  "comment": "Great product!"
}

Response: { review }
```

### Update Review
```http
PUT /api/reviews/:id
Authorization: Bearer <token>
Content-Type: application/json

{
  "rating": 4,
  "comment": "Updated review"
}

Response: { review }
```

### Delete Review
```http
DELETE /api/reviews/:id
Authorization: Bearer <token>

Response: { message }
```

---

## 📋 Status Codes

- `200` - Success
- `201` - Created
- `400` - Bad Request
- `401` - Unauthorized (missing/invalid token)
- `403` - Forbidden (insufficient permissions)
- `404` - Not Found
- `409` - Conflict (e.g., email already exists)
- `500` - Server Error

## 🔑 User Roles

- `customer` - Regular user (default)
- `product_manager` - Can manage products
- `admin` - Full access to all features

## 📌 Order Statuses

- `pending` - Order created, awaiting processing
- `processing` - Order being prepared
- `shipped` - Order shipped
- `delivered` - Order delivered
- `cancelled` - Order cancelled

## 💰 Payment Statuses

- `pending` - Payment not yet processed
- `paid` - Payment successful
- `failed` - Payment failed
- `refunded` - Payment refunded
