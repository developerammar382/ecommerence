# E-Commerce Platform

## Overview

This is a modern e-commerce web application built with Vue.js 3, featuring a comprehensive shopping experience with product browsing, cart management, order processing, and an admin dashboard for business management. The platform provides both customer-facing features (product catalog, shopping cart, wishlist, order tracking) and administrative capabilities (inventory management, sales analytics, user management).

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Framework: Vue.js 3 with Composition API**
- Uses the modern Composition API pattern with `<script setup>` syntax for component logic
- Vite as the build tool and development server for fast hot module replacement
- Component-based architecture with lazy-loaded route components for optimal performance

**State Management: Pinia**
- Centralized state management using Pinia stores instead of Vuex
- Separate stores for different domains:
  - `auth.js` - User authentication and role-based access control
  - `cart.js` - Shopping cart operations and persistence
  - `products.js` - Product catalog and category management
  - `orders.js` - Order history and tracking
  - `wishlist.js` - User wishlist functionality
  - `admin.js` - Admin dashboard data and analytics
- State persistence using localStorage for cart, wishlist, and user session

**Routing: Vue Router 4**
- Client-side routing with lazy-loaded components
- Route guards for authentication (`meta: { requiresAuth: true }`)
- Nested routes with MainLayout wrapper for consistent UI structure
- Hash-free history mode for clean URLs

**UI/Styling: Tailwind CSS**
- Utility-first CSS framework with custom configuration
- Custom color palette defined (primary colors with shades 50-900)
- Reusable component classes defined in `@layer components`:
  - `.btn-primary` and `.btn-secondary` for buttons
  - `.input-field` for form inputs
  - `.card` for content containers
- Responsive design patterns with mobile-first approach

**Component Libraries**
- Headless UI for accessible, unstyled UI components
- Heroicons for consistent iconography
- Chart.js with vue-chartjs wrapper for data visualization in admin dashboard

### Backend Architecture

**Data Layer: Mock Data with localStorage Persistence**
- Currently using in-memory mock data stored in Pinia stores
- Client-side persistence via localStorage for:
  - Shopping cart items
  - Wishlist items  
  - User authentication session
- Products, categories, and initial data hardcoded in stores

**Authentication & Authorization**
- Mock authentication system with predefined user roles:
  - Super Admin (full access)
  - Product Manager (inventory and product management)
  - Content Editor (limited access)
  - Customer (standard user)
- Role-based access control through computed properties (`isAdmin`, `isAuthenticated`)
- Session persistence in localStorage
- Route protection via navigation guards

**Data Models**
- **Products**: id, name, price, category, categoryId, image, description
- **Categories**: id, name, slug, icon
- **Cart Items**: product data + quantity
- **Orders**: id, date, status, total, items[], shipping{}
- **Users**: id, name, email, role, status, joinDate
- **Admin Stats**: sales metrics, dashboard statistics, inventory alerts

### External Dependencies

**Frontend Libraries**
- **Vue.js 3.4.21** - Core framework with Composition API
- **Vue Router 4.3.0** - Client-side routing
- **Pinia 2.1.7** - State management
- **Axios 1.6.8** - HTTP client (prepared for future API integration)

**UI & Styling**
- **Tailwind CSS 3.4.3** - Utility-first CSS framework
- **Headless UI 1.7.19** - Accessible component primitives
- **Heroicons 2.1.3** - SVG icon library

**Data Visualization**
- **Chart.js 4.4.2** - Charting library for admin analytics
- **vue-chartjs 5.3.0** - Vue wrapper for Chart.js

**Build Tools**
- **Vite 5.2.0** - Fast build tool and dev server
- **@vitejs/plugin-vue 5.0.4** - Vue 3 support for Vite
- **PostCSS 8.4.38** - CSS transformation
- **Autoprefixer 10.4.19** - CSS vendor prefixing

**Development Configuration**
- Development server runs on `0.0.0.0:5000` for accessibility
- Path alias `@` configured to point to `./src` directory
- Hot module replacement enabled for rapid development

**Future Integration Points**
- Axios is included but not yet connected to a backend API
- The application is structured to easily integrate with a REST API or GraphQL backend
- LocalStorage persistence can be replaced with server-side data storage
- Mock authentication can be replaced with JWT or OAuth2 implementation