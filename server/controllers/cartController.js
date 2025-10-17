import { cartModel } from '../models/cartModel.js';
import { productModel } from '../models/productModel.js';

export const cartController = {
  async getCart(req, res, next) {
    try {
      const items = await cartModel.getCart(req.user.id);
      const total = await cartModel.getCartTotal(req.user.id);

      res.json({
        items,
        total,
        count: items.length
      });
    } catch (error) {
      next(error);
    }
  },

  async addToCart(req, res, next) {
    try {
      const { product_id, quantity = 1 } = req.body;

      const product = await productModel.findById(product_id);
      if (!product) {
        return res.status(404).json({ error: 'Product not found' });
      }

      if (product.stock < quantity) {
        return res.status(400).json({
          error: 'Insufficient stock',
          available: product.stock
        });
      }

      const cartItem = await cartModel.addItem(req.user.id, product_id, quantity);

      res.status(201).json({
        message: 'Item added to cart',
        item: cartItem
      });
    } catch (error) {
      next(error);
    }
  },

  async updateCartItem(req, res, next) {
    try {
      const { quantity } = req.body;
      const { product_id } = req.params;

      if (quantity < 1) {
        return res.status(400).json({ error: 'Quantity must be at least 1' });
      }

      const product = await productModel.findById(product_id);
      if (!product) {
        return res.status(404).json({ error: 'Product not found' });
      }

      if (product.stock < quantity) {
        return res.status(400).json({
          error: 'Insufficient stock',
          available: product.stock
        });
      }

      const cartItem = await cartModel.updateQuantity(req.user.id, product_id, quantity);

      res.json({
        message: 'Cart updated',
        item: cartItem
      });
    } catch (error) {
      next(error);
    }
  },

  async removeFromCart(req, res, next) {
    try {
      const { product_id } = req.params;

      await cartModel.removeItem(req.user.id, product_id);

      res.json({ message: 'Item removed from cart' });
    } catch (error) {
      next(error);
    }
  },

  async clearCart(req, res, next) {
    try {
      await cartModel.clearCart(req.user.id);

      res.json({ message: 'Cart cleared' });
    } catch (error) {
      next(error);
    }
  }
};
