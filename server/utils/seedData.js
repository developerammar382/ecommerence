import bcrypt from 'bcryptjs';
import { query } from '../config/database.js';

export async function seedDatabase() {
  try {
    const categoryCheck = await query('SELECT COUNT(*) FROM categories');
    if (parseInt(categoryCheck.rows[0].count) > 0) {
      console.log('📦 Database already seeded, skipping...');
      return;
    }

    console.log('🌱 Seeding database...');

    const adminPassword = '$2b$10$wMMwPAE7bw2ThqBANSmzoeL69H0Rud6Zs2uyAYpLMZBUiyLLkobE.';
    const customerPassword = await bcrypt.hash('password123', 10);
    
    await query(
      `INSERT INTO users (email, password, name, role, status) VALUES 
       ('admin@shophub.com', $1, 'Admin User', 'admin', 'active'),
       ('customer@example.com', $2, 'John Doe', 'customer', 'active')`,
      [adminPassword, customerPassword]
    );

    const sampleProducts = [
      { name: 'Classic White T-Shirt', description: 'Comfortable cotton t-shirt', price: 29.99, category: 1, stock: 100, sku: 'CLO-001', featured: true, image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500' },
      { name: 'Slim Fit Jeans', description: 'Modern slim fit denim jeans', price: 79.99, category: 1, stock: 75, sku: 'CLO-002', featured: true, image: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=500' },
      { name: 'Leather Jacket', description: 'Premium leather jacket', price: 199.99, category: 1, stock: 30, sku: 'CLO-003', featured: true, image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=500' },
      { name: 'Running Shoes', description: 'Lightweight running shoes', price: 89.99, category: 2, stock: 60, sku: 'SHO-001', featured: true, image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500' },
      { name: 'Classic Sneakers', description: 'Comfortable everyday sneakers', price: 69.99, category: 2, stock: 80, sku: 'SHO-002', featured: false, image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=500' },
      { name: 'Leather Boots', description: 'Durable leather boots', price: 149.99, category: 2, stock: 40, sku: 'SHO-003', featured: true, image: 'https://images.unsplash.com/photo-1608256246200-53e635b5b65f?w=500' },
      { name: 'Leather Wallet', description: 'Genuine leather wallet', price: 49.99, category: 3, stock: 120, sku: 'ACC-001', featured: false, image: 'https://images.unsplash.com/photo-1627123424574-724758594e93?w=500' },
      { name: 'Designer Sunglasses', description: 'UV protection sunglasses', price: 129.99, category: 3, stock: 50, sku: 'ACC-002', featured: true, image: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=500' },
      { name: 'Smart Watch Band', description: 'Premium watch band', price: 39.99, category: 3, stock: 90, sku: 'ACC-003', featured: false, image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500' },
      { name: 'Wireless Headphones', description: 'Noise cancelling headphones', price: 199.99, category: 4, stock: 45, sku: 'ELE-001', featured: true, image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500' },
      { name: 'Smartphone', description: 'Latest model smartphone', price: 699.99, category: 4, stock: 25, sku: 'ELE-002', featured: true, image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=500' },
      { name: 'Tablet', description: '10-inch tablet device', price: 399.99, category: 4, stock: 35, sku: 'ELE-003', featured: false, image: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=500' },
      { name: 'Organic Green Tea', description: 'Premium organic tea', price: 12.99, category: 5, stock: 200, sku: 'GRO-001', featured: false, image: 'https://images.unsplash.com/photo-1564890369478-c89ca6d9cde9?w=500' },
      { name: 'Almond Butter', description: 'Natural almond butter', price: 8.99, category: 5, stock: 150, sku: 'GRO-002', featured: false, image: 'https://images.unsplash.com/photo-1594502433755-daff8f52dc1f?w=500' },
      { name: 'Quinoa', description: 'Organic quinoa grain', price: 6.99, category: 5, stock: 180, sku: 'GRO-003', featured: false, image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=500' },
      { name: 'Coffee Maker', description: 'Automatic coffee maker', price: 89.99, category: 6, stock: 40, sku: 'HOM-001', featured: true, image: 'https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?w=500' },
      { name: 'Chef Knife Set', description: 'Professional knife set', price: 149.99, category: 6, stock: 30, sku: 'HOM-002', featured: false, image: 'https://images.unsplash.com/photo-1593618998160-e34014e67546?w=500' },
      { name: 'Non-Stick Cookware', description: 'Complete cookware set', price: 199.99, category: 6, stock: 25, sku: 'HOM-003', featured: false, image: 'https://images.unsplash.com/photo-1584990347449-7d4b7c3c9c3d?w=500' },
      { name: 'Vitamin C Serum', description: 'Anti-aging facial serum', price: 24.99, category: 7, stock: 100, sku: 'HEA-001', featured: true, image: 'https://images.unsplash.com/photo-1620916297744-0e3cb6f7dcc7?w=500' },
      { name: 'Essential Oils Set', description: 'Aromatherapy oil collection', price: 34.99, category: 7, stock: 75, sku: 'HEA-002', featured: false, image: 'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=500' },
      { name: 'Yoga Mat', description: 'Non-slip yoga mat', price: 29.99, category: 7, stock: 60, sku: 'HEA-003', featured: false, image: 'https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=500' }
    ];

    for (const product of sampleProducts) {
      await query(
        `INSERT INTO products (name, description, price, category_id, image, stock, sku, featured)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`,
        [product.name, product.description, product.price, product.category, product.image, product.stock, product.sku, product.featured]
      );
    }

    console.log('✅ Database seeded successfully with sample data');
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    throw error;
  }
}
