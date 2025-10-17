import { query } from '../config/database.js';

export const productModel = {
  async create(productData) {
    const { name, description, price, category_id, image, stock, sku, featured = false } = productData;
    const result = await query(
      `INSERT INTO products (name, description, price, category_id, image, stock, sku, featured)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
       RETURNING *`,
      [name, description, price, category_id, image, stock, sku, featured]
    );
    return result.rows[0];
  },

  async findAll(filters = {}) {
    let queryText = `
      SELECT p.*, c.name as category_name, c.slug as category_slug
      FROM products p
      LEFT JOIN categories c ON p.category_id = c.id
      WHERE 1=1
    `;
    const params = [];
    let paramCount = 1;

    if (filters.category_id) {
      queryText += ` AND p.category_id = $${paramCount}`;
      params.push(filters.category_id);
      paramCount++;
    }

    if (filters.featured !== undefined) {
      queryText += ` AND p.featured = $${paramCount}`;
      params.push(filters.featured);
      paramCount++;
    }

    if (filters.search) {
      queryText += ` AND (p.name ILIKE $${paramCount} OR p.description ILIKE $${paramCount})`;
      params.push(`%${filters.search}%`);
      paramCount++;
    }

    if (filters.min_price) {
      queryText += ` AND p.price >= $${paramCount}`;
      params.push(filters.min_price);
      paramCount++;
    }

    if (filters.max_price) {
      queryText += ` AND p.price <= $${paramCount}`;
      params.push(filters.max_price);
      paramCount++;
    }

    queryText += ' ORDER BY p.created_at DESC';

    if (filters.limit) {
      queryText += ` LIMIT $${paramCount}`;
      params.push(filters.limit);
      paramCount++;
    }

    const result = await query(queryText, params);
    return result.rows;
  },

  async findById(id) {
    const result = await query(
      `SELECT p.*, c.name as category_name, c.slug as category_slug
       FROM products p
       LEFT JOIN categories c ON p.category_id = c.id
       WHERE p.id = $1`,
      [id]
    );
    return result.rows[0];
  },

  async update(id, updates) {
    const fields = [];
    const values = [];
    let paramCount = 1;

    Object.entries(updates).forEach(([key, value]) => {
      if (value !== undefined && key !== 'id') {
        fields.push(`${key} = $${paramCount}`);
        values.push(value);
        paramCount++;
      }
    });

    if (fields.length === 0) return null;

    fields.push(`updated_at = CURRENT_TIMESTAMP`);
    values.push(id);

    const result = await query(
      `UPDATE products SET ${fields.join(', ')} WHERE id = $${paramCount} RETURNING *`,
      values
    );
    return result.rows[0];
  },

  async delete(id) {
    await query('DELETE FROM products WHERE id = $1', [id]);
  },

  async updateStock(id, quantity, operation = 'subtract') {
    const operator = operation === 'add' ? '+' : '-';
    const result = await query(
      `UPDATE products SET stock = stock ${operator} $1, updated_at = CURRENT_TIMESTAMP 
       WHERE id = $2 RETURNING *`,
      [quantity, id]
    );
    return result.rows[0];
  },

  async getLowStockProducts(threshold = 10) {
    const result = await query(
      'SELECT * FROM products WHERE stock <= $1 AND stock > 0 ORDER BY stock ASC',
      [threshold]
    );
    return result.rows;
  },

  async updateRating(productId) {
    const result = await query(
      `UPDATE products p SET 
        rating = (SELECT COALESCE(AVG(rating), 0) FROM product_reviews WHERE product_id = $1),
        reviews = (SELECT COUNT(*) FROM product_reviews WHERE product_id = $1)
       WHERE p.id = $1
       RETURNING *`,
      [productId]
    );
    return result.rows[0];
  }
};
