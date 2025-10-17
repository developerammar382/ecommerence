# Setup Instructions - E-Commerce Platform

## 🚀 Running on Replit (Current Setup)

Your project is already configured and running on Replit! Here's what's set up:

### Current Status
- ✅ Backend server running on port 3000
- ✅ Frontend server running on port 5000 (proxied)
- ✅ PostgreSQL database connected
- ✅ Stripe payment integration configured
- ✅ All dependencies installed

### Accessing Your Application
1. **View the app**: Click the webview in Replit or visit your Replit URL
2. **Backend API**: Available at `https://your-replit-url.replit.dev/api`
3. **Admin Dashboard**: Navigate to `/admin/dashboard` and login with admin credentials

### Default Admin Account
After seeding, you can login with:
- **Email**: admin@shophub.com
- **Password**: admin123 (change this immediately in production!)

### Managing the Application

**Start the server:**
```bash
npm run dev
```

**View logs:**
- Check the Console tab in Replit
- Backend logs show on port 3000
- Frontend logs show on port 5000

**Database operations:**
```bash
# Push schema changes to database
npm run db:push

# Force push (if data loss warning)
npm run db:push --force
```

---

## 💻 Running Locally

### Prerequisites
- Node.js 18+ installed
- PostgreSQL installed and running
- Stripe account (for payment features)

### Step 1: Clone and Install

```bash
# Clone the repository
git clone <your-repo-url>
cd ecommerce-platform

# Install dependencies
npm install
```

### Step 2: Set Up Database

**Option 1: Local PostgreSQL**
```bash
# Create a database
createdb ecommerce_db

# Set your DATABASE_URL in .env
DATABASE_URL=postgresql://username:password@localhost:5432/ecommerce_db
```

**Option 2: Use Neon (Recommended)**
1. Sign up at [neon.tech](https://neon.tech)
2. Create a new database
3. Copy the connection string
4. Add to your `.env` file

### Step 3: Configure Environment Variables

Create a `.env` file in the root directory:

```env
# Database Configuration
DATABASE_URL=your_postgresql_connection_string
PGHOST=your_db_host
PGPORT=5432
PGUSER=your_db_user
PGPASSWORD=your_db_password
PGDATABASE=your_db_name

# JWT Secret (generate a secure random string)
JWT_SECRET=your-super-secure-random-string-min-32-chars

# Stripe Keys (get from https://dashboard.stripe.com/apikeys)
STRIPE_SECRET_KEY=sk_test_your_stripe_secret_key
VITE_STRIPE_PUBLIC_KEY=pk_test_your_stripe_public_key

# Optional: Stripe Webhook Secret (for webhook verification)
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret

# Backend API URL (for local development)
VITE_API_URL=http://localhost:3000/api

# Frontend URL (for CORS)
FRONTEND_URL=http://localhost:5000
```

### Step 4: Initialize Database

The database will be automatically initialized on first run, but you can also manually run:

```bash
# The schema is in server/config/schema.sql
# It will create all tables automatically
```

### Step 5: Run the Application

**Development mode (runs both frontend and backend):**
```bash
npm run dev
```

This starts:
- Backend API on http://localhost:3000
- Frontend on http://localhost:5000

**Run separately:**
```bash
# Terminal 1 - Backend
npm run dev:backend

# Terminal 2 - Frontend
npm run dev:frontend
```

### Step 6: Access the Application

- **Frontend**: http://localhost:5000
- **API**: http://localhost:3000/api
- **Admin Dashboard**: http://localhost:5000/admin/dashboard

---

## 🔧 Development Commands

```bash
# Install dependencies
npm install

# Run development server (both frontend and backend)
npm run dev

# Run only frontend
npm run dev:frontend

# Run only backend
npm run dev:backend

# Build for production
npm run build

# Preview production build
npm run preview
```

---

## 🧪 Testing the API

### Using curl:

**Register a new user:**
```bash
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com",
    "password": "password123",
    "name": "John Doe"
  }'
```

**Login:**
```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com",
    "password": "password123"
  }'
```

**Get products:**
```bash
curl http://localhost:3000/api/products
```

**Get products with filters:**
```bash
curl "http://localhost:3000/api/products?category_id=1&featured=true&search=shirt"
```

### Using Postman:

1. Import the base URL: `http://localhost:3000/api`
2. For authenticated requests, add header: `Authorization: Bearer <your-jwt-token>`
3. Test all endpoints from the API documentation

---

## 🎨 Customization

### Change Brand Colors
Edit `tailwind.config.js`:
```javascript
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: '#your-color',
        secondary: '#your-color',
      }
    }
  }
}
```

### Add New Product Categories
Use the admin dashboard or API:
```bash
curl -X POST http://localhost:3000/api/categories \
  -H "Authorization: Bearer <admin-token>" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "New Category",
    "slug": "new-category",
    "description": "Category description",
    "icon": "🏷️"
  }'
```

### Modify Email Templates
Email functionality can be added in `server/utils/email.js` (create if needed)

---

## 🔒 Security Best Practices

### Before Going to Production:

1. **Change JWT Secret**: Use a strong, random string (32+ characters)
   ```bash
   # Generate a secure secret
   node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
   ```

2. **Update Default Admin Credentials**: Change admin password immediately

3. **Configure CORS**: Update `FRONTEND_URL` in `.env` to your production domain

4. **Enable HTTPS**: Always use HTTPS in production

5. **Set up Stripe Webhooks**:
   - Go to Stripe Dashboard > Developers > Webhooks
   - Add endpoint: `https://yourdomain.com/api/payment/webhook`
   - Copy webhook secret to `STRIPE_WEBHOOK_SECRET`

6. **Database Backups**: Set up regular database backups

7. **Rate Limiting**: Already configured (100 req/15min), adjust if needed in `server/server.js`

8. **Environment Variables**: Never commit `.env` file to git

---

## 📦 Deployment

### Deploy to Replit (Already Set Up!)
Your app is already configured for Replit deployment. Just click the "Deploy" button!

### Deploy to Other Platforms

**Vercel:**
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

**Heroku:**
```bash
# Login to Heroku
heroku login

# Create app
heroku create your-app-name

# Add PostgreSQL
heroku addons:create heroku-postgresql:hobby-dev

# Deploy
git push heroku main
```

**DigitalOcean/AWS/Azure:**
1. Set up a server with Node.js
2. Clone your repository
3. Install dependencies
4. Set environment variables
5. Use PM2 for process management:
   ```bash
   npm install -g pm2
   pm2 start npm --name "ecommerce" -- run dev
   pm2 save
   pm2 startup
   ```

---

## 🐛 Troubleshooting

### Database Connection Issues
```bash
# Check if PostgreSQL is running
pg_isready

# Test connection
psql $DATABASE_URL
```

### Port Already in Use
```bash
# Kill process on port 3000
lsof -ti:3000 | xargs kill

# Kill process on port 5000
lsof -ti:5000 | xargs kill
```

### Stripe Payment Issues
- Verify API keys are correct
- Use test mode keys for development (start with `sk_test_` and `pk_test_`)
- Check Stripe Dashboard for payment logs

### CORS Errors
- Ensure `FRONTEND_URL` is set correctly in `.env`
- Check browser console for specific CORS errors
- Verify `server/server.js` CORS configuration

---

## 📚 Additional Resources

- [Stripe Documentation](https://stripe.com/docs)
- [Vue 3 Documentation](https://vuejs.org/)
- [Express.js Guide](https://expressjs.com/)
- [PostgreSQL Docs](https://www.postgresql.org/docs/)
- [Tailwind CSS](https://tailwindcss.com/)

---

## 🆘 Getting Help

If you encounter issues:
1. Check the console logs for error messages
2. Verify all environment variables are set
3. Ensure database connection is working
4. Check API endpoint responses
5. Review the documentation above

Your e-commerce platform is fully functional and ready to use! 🎉
