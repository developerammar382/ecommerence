import { orderModel } from '../models/orderModel.js';
import { cartModel } from '../models/cartModel.js';

export const orderController = {
  async createOrder(req, res, next) {
    try {
      const {
        payment_method,
        shipping_address,
        shipping_city,
        shipping_state,
        shipping_zip,
        shipping_country,
        notes
      } = req.body;

      const cartItems = await cartModel.getCart(req.user.id);
      if (!cartItems || cartItems.length === 0) {
        return res.status(400).json({ error: 'Cart is empty' });
      }

      for (const item of cartItems) {
        if (item.stock < item.quantity) {
          return res.status(400).json({
            error: `Insufficient stock for ${item.name}. Available: ${item.stock}`
          });
        }
      }

      const total = cartItems.reduce((sum, item) => sum + parseFloat(item.subtotal), 0);

      const orderData = {
        user_id: req.user.id,
        total,
        payment_method,
        shipping_address,
        shipping_city,
        shipping_state,
        shipping_zip,
        shipping_country,
        notes
      };

      const items = cartItems.map(item => ({
        product_id: item.product_id,
        product_name: item.name,
        product_price: parseFloat(item.price),
        quantity: item.quantity,
        subtotal: parseFloat(item.subtotal)
      }));

      const order = await orderModel.create(orderData, items);

      res.status(201).json({
        message: 'Order created successfully',
        order
      });
    } catch (error) {
      next(error);
    }
  },

  async getMyOrders(req, res, next) {
    try {
      const filters = {
        status: req.query.status
      };

      const orders = await orderModel.findByUserId(req.user.id, filters);
      res.json({ orders, count: orders.length });
    } catch (error) {
      next(error);
    }
  },

  async getOrderById(req, res, next) {
    try {
      const order = await orderModel.findById(
        req.params.id,
        req.user.role === 'customer' ? req.user.id : null
      );

      if (!order) {
        return res.status(404).json({ error: 'Order not found' });
      }

      res.json({ order });
    } catch (error) {
      next(error);
    }
  },

  async getAllOrders(req, res, next) {
    try {
      const filters = {
        status: req.query.status,
        payment_status: req.query.payment_status
      };

      const orders = await orderModel.findAll(filters);
      res.json({ orders, count: orders.length });
    } catch (error) {
      next(error);
    }
  },

  async updateOrderStatus(req, res, next) {
    try {
      const { status } = req.body;
      const validStatuses = ['pending', 'processing', 'shipped', 'delivered', 'cancelled'];

      if (!validStatuses.includes(status)) {
        return res.status(400).json({ error: 'Invalid status' });
      }

      const order = await orderModel.updateStatus(req.params.id, status);
      if (!order) {
        return res.status(404).json({ error: 'Order not found' });
      }

      res.json({
        message: 'Order status updated successfully',
        order
      });
    } catch (error) {
      next(error);
    }
  },

  async updatePaymentStatus(req, res, next) {
    try {
      const { payment_status, payment_id } = req.body;
      const order = await orderModel.updatePaymentStatus(
        req.params.id,
        payment_status,
        payment_id
      );

      if (!order) {
        return res.status(404).json({ error: 'Order not found' });
      }

      res.json({
        message: 'Payment status updated successfully',
        order
      });
    } catch (error) {
      next(error);
    }
  },

  async updateTrackingNumber(req, res, next) {
    try {
      const { tracking_number } = req.body;
      const order = await orderModel.updateTrackingNumber(req.params.id, tracking_number);

      if (!order) {
        return res.status(404).json({ error: 'Order not found' });
      }

      res.json({
        message: 'Tracking number updated successfully',
        order
      });
    } catch (error) {
      next(error);
    }
  }
};
