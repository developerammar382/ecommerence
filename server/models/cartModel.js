import { query } from '../config/database.js';

export const cartModel = {
  async addItem(userId, productId, quantity = 1) {
    const result = await query(
      `INSERT INTO cart (user_id, product_id, quantity)
       VALUES ($1, $2, $3)
       ON CONFLICT (user_id, product_id)
       DO UPDATE SET quantity = cart.quantity + $3
       RETURNING *`,
      [userId, productId, quantity]
    );
    return result.rows[0];
  },

  async updateQuantity(userId, productId, quantity) {
    const result = await query(
      'UPDATE cart SET quantity = $3 WHERE user_id = $1 AND product_id = $2 RETURNING *',
      [userId, productId, quantity]
    );
    return result.rows[0];
  },

  async removeItem(userId, productId) {
    await query(
      'DELETE FROM cart WHERE user_id = $1 AND product_id = $2',
      [userId, productId]
    );
  },

  async getCart(userId) {
    const result = await query(
      `SELECT c.*, p.name, p.price, p.image, p.stock,
        (c.quantity * p.price) as subtotal
       FROM cart c
       JOIN products p ON c.product_id = p.id
       WHERE c.user_id = $1
       ORDER BY c.created_at DESC`,
      [userId]
    );
    return result.rows;
  },

  async clearCart(userId) {
    await query('DELETE FROM cart WHERE user_id = $1', [userId]);
  },

  async getCartTotal(userId) {
    const result = await query(
      `SELECT COALESCE(SUM(c.quantity * p.price), 0) as total
       FROM cart c
       JOIN products p ON c.product_id = p.id
       WHERE c.user_id = $1`,
      [userId]
    );
    return parseFloat(result.rows[0].total);
  }
};
