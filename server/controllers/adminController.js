import { query } from '../config/database.js';
import { userModel } from '../models/userModel.js';

export const adminController = {
  async getDashboardStats(req, res, next) {
    try {
      const stats = await query(`
        SELECT
          (SELECT COUNT(*) FROM users WHERE role = 'customer') as total_customers,
          (SELECT COUNT(*) FROM products) as total_products,
          (SELECT COUNT(*) FROM orders) as total_orders,
          (SELECT COALESCE(SUM(total), 0) FROM orders WHERE payment_status = 'paid') as total_revenue,
          (SELECT COUNT(*) FROM orders WHERE status = 'pending') as pending_orders,
          (SELECT COUNT(*) FROM products WHERE stock <= 10) as low_stock_products
      `);

      const recentOrders = await query(`
        SELECT o.*, u.name as user_name, u.email as user_email
        FROM orders o
        LEFT JOIN users u ON o.user_id = u.id
        ORDER BY o.created_at DESC
        LIMIT 10
      `);

      const topProducts = await query(`
        SELECT p.id, p.name, p.image, p.price, 
          COALESCE(SUM(oi.quantity), 0) as units_sold,
          COALESCE(SUM(oi.subtotal), 0) as revenue
        FROM products p
        LEFT JOIN order_items oi ON p.id = oi.product_id
        GROUP BY p.id
        ORDER BY units_sold DESC
        LIMIT 5
      `);

      const salesByMonth = await query(`
        SELECT
          TO_CHAR(created_at, 'Mon YYYY') as month,
          COUNT(*) as order_count,
          COALESCE(SUM(total), 0) as revenue
        FROM orders
        WHERE created_at >= NOW() - INTERVAL '6 months'
        GROUP BY TO_CHAR(created_at, 'Mon YYYY'), DATE_TRUNC('month', created_at)
        ORDER BY DATE_TRUNC('month', created_at) ASC
      `);

      res.json({
        stats: stats.rows[0],
        recentOrders: recentOrders.rows,
        topProducts: topProducts.rows,
        salesByMonth: salesByMonth.rows
      });
    } catch (error) {
      next(error);
    }
  },

  async getUsers(req, res, next) {
    try {
      const filters = {
        role: req.query.role,
        status: req.query.status
      };

      const users = await userModel.findAll(filters);
      res.json({ users, count: users.length });
    } catch (error) {
      next(error);
    }
  },

  async updateUserStatus(req, res, next) {
    try {
      const { status } = req.body;
      const validStatuses = ['active', 'inactive', 'suspended'];

      if (!validStatuses.includes(status)) {
        return res.status(400).json({ error: 'Invalid status' });
      }

      const user = await userModel.update(req.params.id, { status });
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }

      res.json({
        message: 'User status updated successfully',
        user
      });
    } catch (error) {
      next(error);
    }
  },

  async updateUserRole(req, res, next) {
    try {
      const { role } = req.body;
      const validRoles = ['customer', 'admin', 'product_manager', 'content_editor'];

      if (!validRoles.includes(role)) {
        return res.status(400).json({ error: 'Invalid role' });
      }

      const user = await userModel.update(req.params.id, { role });
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }

      res.json({
        message: 'User role updated successfully',
        user
      });
    } catch (error) {
      next(error);
    }
  },

  async getSalesAnalytics(req, res, next) {
    try {
      const { period = 'month' } = req.query;
      let interval = '1 month';
      let groupBy = "TO_CHAR(created_at, 'Mon YYYY')";

      if (period === 'week') {
        interval = '8 weeks';
        groupBy = "TO_CHAR(created_at, 'W')";
      } else if (period === 'year') {
        interval = '2 years';
        groupBy = "TO_CHAR(created_at, 'YYYY')";
      }

      const salesData = await query(`
        SELECT
          ${groupBy} as period,
          COUNT(*) as order_count,
          COALESCE(SUM(total), 0) as revenue,
          COALESCE(AVG(total), 0) as avg_order_value
        FROM orders
        WHERE created_at >= NOW() - INTERVAL '${interval}'
          AND payment_status = 'paid'
        GROUP BY ${groupBy}, DATE_TRUNC('${period}', created_at)
        ORDER BY DATE_TRUNC('${period}', created_at) ASC
      `);

      res.json({ analytics: salesData.rows });
    } catch (error) {
      next(error);
    }
  }
};
