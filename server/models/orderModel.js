import { query, getClient } from '../config/database.js';

export const orderModel = {
  async create(orderData, items) {
    const client = await getClient();
    try {
      await client.query('BEGIN');

      const orderResult = await client.query(
        `INSERT INTO orders (user_id, total, payment_method, shipping_address, shipping_city, 
         shipping_state, shipping_zip, shipping_country, notes)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
         RETURNING *`,
        [
          orderData.user_id,
          orderData.total,
          orderData.payment_method,
          orderData.shipping_address,
          orderData.shipping_city,
          orderData.shipping_state,
          orderData.shipping_zip,
          orderData.shipping_country,
          orderData.notes
        ]
      );

      const order = orderResult.rows[0];

      for (const item of items) {
        await client.query(
          `INSERT INTO order_items (order_id, product_id, product_name, product_price, quantity, subtotal)
           VALUES ($1, $2, $3, $4, $5, $6)`,
          [order.id, item.product_id, item.product_name, item.product_price, item.quantity, item.subtotal]
        );

        await client.query(
          'UPDATE products SET stock = stock - $1 WHERE id = $2',
          [item.quantity, item.product_id]
        );
      }

      await client.query('DELETE FROM cart WHERE user_id = $1', [orderData.user_id]);

      await client.query('COMMIT');
      return order;
    } catch (error) {
      await client.query('ROLLBACK');
      throw error;
    } finally {
      client.release();
    }
  },

  async findById(id, userId = null) {
    let queryText = `
      SELECT o.*, 
        json_agg(
          json_build_object(
            'id', oi.id,
            'product_id', oi.product_id,
            'product_name', oi.product_name,
            'product_price', oi.product_price,
            'quantity', oi.quantity,
            'subtotal', oi.subtotal
          )
        ) as items
      FROM orders o
      LEFT JOIN order_items oi ON o.id = oi.order_id
      WHERE o.id = $1
    `;
    const params = [id];

    if (userId) {
      queryText += ' AND o.user_id = $2';
      params.push(userId);
    }

    queryText += ' GROUP BY o.id';

    const result = await query(queryText, params);
    return result.rows[0];
  },

  async findByUserId(userId, filters = {}) {
    let queryText = `
      SELECT o.*, 
        json_agg(
          json_build_object(
            'id', oi.id,
            'product_id', oi.product_id,
            'product_name', oi.product_name,
            'product_price', oi.product_price,
            'quantity', oi.quantity,
            'subtotal', oi.subtotal
          )
        ) as items
      FROM orders o
      LEFT JOIN order_items oi ON o.id = oi.order_id
      WHERE o.user_id = $1
    `;
    const params = [userId];
    let paramCount = 2;

    if (filters.status) {
      queryText += ` AND o.status = $${paramCount}`;
      params.push(filters.status);
      paramCount++;
    }

    queryText += ' GROUP BY o.id ORDER BY o.created_at DESC';

    const result = await query(queryText, params);
    return result.rows;
  },

  async findAll(filters = {}) {
    let queryText = `
      SELECT o.*, u.name as user_name, u.email as user_email,
        json_agg(
          json_build_object(
            'id', oi.id,
            'product_id', oi.product_id,
            'product_name', oi.product_name,
            'product_price', oi.product_price,
            'quantity', oi.quantity,
            'subtotal', oi.subtotal
          )
        ) as items
      FROM orders o
      LEFT JOIN users u ON o.user_id = u.id
      LEFT JOIN order_items oi ON o.id = oi.order_id
      WHERE 1=1
    `;
    const params = [];
    let paramCount = 1;

    if (filters.status) {
      queryText += ` AND o.status = $${paramCount}`;
      params.push(filters.status);
      paramCount++;
    }

    if (filters.payment_status) {
      queryText += ` AND o.payment_status = $${paramCount}`;
      params.push(filters.payment_status);
      paramCount++;
    }

    queryText += ' GROUP BY o.id, u.name, u.email ORDER BY o.created_at DESC';

    const result = await query(queryText, params);
    return result.rows;
  },

  async updateStatus(id, status) {
    const result = await query(
      'UPDATE orders SET status = $1, updated_at = CURRENT_TIMESTAMP WHERE id = $2 RETURNING *',
      [status, id]
    );
    return result.rows[0];
  },

  async updatePaymentStatus(id, paymentStatus, paymentId = null) {
    const result = await query(
      'UPDATE orders SET payment_status = $1, payment_id = $2, updated_at = CURRENT_TIMESTAMP WHERE id = $3 RETURNING *',
      [paymentStatus, paymentId, id]
    );
    return result.rows[0];
  },

  async updateTrackingNumber(id, trackingNumber) {
    const result = await query(
      'UPDATE orders SET tracking_number = $1, updated_at = CURRENT_TIMESTAMP WHERE id = $2 RETURNING *',
      [trackingNumber, id]
    );
    return result.rows[0];
  }
};
