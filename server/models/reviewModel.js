import { query } from '../config/database.js';

export const reviewModel = {
  async create(reviewData) {
    const { product_id, user_id, rating, comment } = reviewData;
    const result = await query(
      `INSERT INTO product_reviews (product_id, user_id, rating, comment)
       VALUES ($1, $2, $3, $4)
       RETURNING *`,
      [product_id, user_id, rating, comment]
    );
    return result.rows[0];
  },

  async findByProductId(productId) {
    const result = await query(
      `SELECT pr.*, u.name as user_name
       FROM product_reviews pr
       JOIN users u ON pr.user_id = u.id
       WHERE pr.product_id = $1
       ORDER BY pr.created_at DESC`,
      [productId]
    );
    return result.rows;
  },

  async findByUserId(userId) {
    const result = await query(
      `SELECT pr.*, p.name as product_name, p.image as product_image
       FROM product_reviews pr
       JOIN products p ON pr.product_id = p.id
       WHERE pr.user_id = $1
       ORDER BY pr.created_at DESC`,
      [userId]
    );
    return result.rows;
  },

  async update(id, userId, updates) {
    const { rating, comment } = updates;
    const result = await query(
      `UPDATE product_reviews 
       SET rating = $1, comment = $2, updated_at = CURRENT_TIMESTAMP
       WHERE id = $3 AND user_id = $4
       RETURNING *`,
      [rating, comment, id, userId]
    );
    return result.rows[0];
  },

  async delete(id, userId) {
    await query(
      'DELETE FROM product_reviews WHERE id = $1 AND user_id = $2',
      [id, userId]
    );
  },

  async hasUserReviewed(userId, productId) {
    const result = await query(
      'SELECT EXISTS(SELECT 1 FROM product_reviews WHERE user_id = $1 AND product_id = $2) as exists',
      [userId, productId]
    );
    return result.rows[0].exists;
  }
};
