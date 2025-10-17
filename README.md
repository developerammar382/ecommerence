# ShopHub - E-Commerce Platform

A full-stack e-commerce platform built with Vue.js, Express.js, PostgreSQL, and Stripe integration.

## Features

### Customer Features
- 🛍️ Product browsing with advanced filtering and search
- 🛒 Shopping cart with real-time updates
- ❤️ Wishlist functionality
- 👤 User authentication and profile management
- 📦 Order tracking and history
- 💳 Secure payment processing with Stripe
- 🤖 AI-powered chatbot support
- 👔 Virtual try-on for wearable products

### Admin Features
- 📊 Comprehensive dashboard with analytics
- 📦 Product management (CRUD operations)
- 📋 Inventory management with stock alerts
- 🔄 Order management and fulfillment
- 👥 User management
- 📈 Sales analytics and reporting

## Tech Stack

### Frontend
- **Vue.js 3** - Composition API
- **Vite** - Build tool and dev server
- **Pinia** - State management
- **Vue Router** - Client-side routing
- **Tailwind CSS** - Styling
- **Axios** - HTTP client

### Backend
- **Express.js** - Node.js framework
- **PostgreSQL** - Database
- **JWT** - Authentication
- **Bcrypt** - Password hashing
- **Stripe** - Payment processing
- **Helmet** - Security middleware
- **CORS** - Cross-origin resource sharing

## Getting Started

### Prerequisites
- Node.js 18+ installed
- PostgreSQL database (automatically configured on Replit)
- Stripe account for payment processing

### Environment Variables
The following environment variables are required (managed through Replit Secrets):

```bash
# Stripe API Keys (get from https://dashboard.stripe.com/apikeys)
VITE_STRIPE_PUBLIC_KEY=pk_test_...
STRIPE_SECRET_KEY=sk_test_...

# JWT Secret (optional, defaults to a development key)
JWT_SECRET=your-secret-key
```

### Installation

1. Install dependencies:
```bash
npm install
```

2. The database will be automatically initialized on first run with:
   - Database schema creation
   - Sample categories
   - Sample products
   - Admin user (email: admin@shophub.com, password: admin123)

3. Start the development server:
```bash
npm run dev
```

This will start both:
- Frontend on http://localhost:5000
- Backend API on http://localhost:3000

### Default Admin Account
- **Email:** admin@shophub.com
- **Password:** admin123

**Important:** Change the admin password after first login!

## API Documentation

### Authentication Endpoints
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login
- `GET /api/auth/profile` - Get user profile
- `PUT /api/auth/profile` - Update profile
- `PUT /api/auth/change-password` - Change password

### Product Endpoints
- `GET /api/products` - Get all products (with filters)
- `GET /api/products/:id` - Get product by ID
- `POST /api/products` - Create product (admin)
- `PUT /api/products/:id` - Update product (admin)
- `DELETE /api/products/:id` - Delete product (admin)

### Category Endpoints
- `GET /api/categories` - Get all categories
- `GET /api/categories/:id` - Get category by ID
- `POST /api/categories` - Create category (admin)
- `PUT /api/categories/:id` - Update category (admin)

### Cart Endpoints
- `GET /api/cart` - Get user cart
- `POST /api/cart` - Add item to cart
- `PUT /api/cart/:product_id` - Update cart item quantity
- `DELETE /api/cart/:product_id` - Remove item from cart
- `DELETE /api/cart` - Clear cart

### Wishlist Endpoints
- `GET /api/wishlist` - Get user wishlist
- `POST /api/wishlist` - Add item to wishlist
- `DELETE /api/wishlist/:product_id` - Remove item from wishlist
- `GET /api/wishlist/check/:product_id` - Check if product is in wishlist
- `DELETE /api/wishlist` - Clear wishlist

### Review Endpoints
- `POST /api/reviews` - Create product review
- `GET /api/reviews/product/:product_id` - Get product reviews
- `GET /api/reviews/my-reviews` - Get user's reviews
- `PUT /api/reviews/:id` - Update review
- `DELETE /api/reviews/:id` - Delete review

### Order Endpoints
- `POST /api/orders` - Create order
- `GET /api/orders/my-orders` - Get user orders
- `GET /api/orders/:id` - Get order by ID
- `GET /api/orders` - Get all orders (admin)
- `PUT /api/orders/:id/status` - Update order status (admin)
- `PUT /api/orders/:id/payment` - Update payment status (admin)

### Payment Endpoints
- `POST /api/payment/create-payment-intent` - Create Stripe payment intent
- `GET /api/payment/payment-intent/:id` - Get payment intent status
- `POST /api/payment/refund` - Create refund (admin)

### Admin Endpoints
- `GET /api/admin/dashboard/stats` - Get dashboard statistics
- `GET /api/admin/dashboard/analytics` - Get sales analytics
- `GET /api/admin/users` - Get all users
- `PUT /api/admin/users/:id/status` - Update user status
- `PUT /api/admin/users/:id/role` - Update user role

## Project Structure

```
├── src/                    # Frontend Vue.js application
│   ├── components/        # Reusable Vue components
│   ├── views/            # Page components
│   ├── stores/           # Pinia state management
│   ├── router/           # Vue Router configuration
│   ├── config/           # Configuration files
│   └── layouts/          # Layout components
│
├── server/                # Backend Express.js application
│   ├── config/           # Database and configuration
│   ├── controllers/      # Route controllers
│   ├── middleware/       # Custom middleware
│   ├── models/          # Database models
│   ├── routes/          # API routes
│   └── utils/           # Utility functions
│
└── attached_assets/      # Static assets
```

## Security Features

- ✅ Password hashing with bcrypt
- ✅ JWT-based authentication
- ✅ Role-based access control
- ✅ SQL injection prevention
- ✅ Rate limiting
- ✅ CORS protection
- ✅ Helmet security headers
- ✅ Input validation

## Deployment

The application is configured for deployment on Replit with:
- Automatic database initialization
- Environment variable management
- Built-in PostgreSQL database
- Secure secrets management

## Support

For issues or questions, please contact support or check the documentation.

## License

This project is proprietary and confidential.
