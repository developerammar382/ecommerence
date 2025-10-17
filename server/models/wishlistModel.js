import { query } from '../config/database.js';

export const wishlistModel = {
  async addItem(userId, productId) {
    try {
      const result = await query(
        `INSERT INTO wishlist (user_id, product_id)
         VALUES ($1, $2)
         ON CONFLICT (user_id, product_id) DO NOTHING
         RETURNING *`,
        [userId, productId]
      );
      return result.rows[0];
    } catch (error) {
      throw error;
    }
  },

  async removeItem(userId, productId) {
    await query(
      'DELETE FROM wishlist WHERE user_id = $1 AND product_id = $2',
      [userId, productId]
    );
  },

  async getWishlist(userId) {
    const result = await query(
      `SELECT w.*, p.name, p.price, p.image, p.stock, p.rating, p.reviews
       FROM wishlist w
       JOIN products p ON w.product_id = p.id
       WHERE w.user_id = $1
       ORDER BY w.created_at DESC`,
      [userId]
    );
    return result.rows;
  },

  async isInWishlist(userId, productId) {
    const result = await query(
      'SELECT EXISTS(SELECT 1 FROM wishlist WHERE user_id = $1 AND product_id = $2) as exists',
      [userId, productId]
    );
    return result.rows[0].exists;
  },

  async clearWishlist(userId) {
    await query('DELETE FROM wishlist WHERE user_id = $1', [userId]);
  }
};
