import { wishlistModel } from '../models/wishlistModel.js';
import { productModel } from '../models/productModel.js';

export const wishlistController = {
  async getWishlist(req, res, next) {
    try {
      const items = await wishlistModel.getWishlist(req.user.id);
      res.json({ items, count: items.length });
    } catch (error) {
      next(error);
    }
  },

  async addToWishlist(req, res, next) {
    try {
      const { product_id } = req.body;

      const product = await productModel.findById(product_id);
      if (!product) {
        return res.status(404).json({ error: 'Product not found' });
      }

      const item = await wishlistModel.addItem(req.user.id, product_id);

      res.status(201).json({
        message: 'Item added to wishlist',
        item
      });
    } catch (error) {
      next(error);
    }
  },

  async removeFromWishlist(req, res, next) {
    try {
      const { product_id } = req.params;

      await wishlistModel.removeItem(req.user.id, product_id);

      res.json({ message: 'Item removed from wishlist' });
    } catch (error) {
      next(error);
    }
  },

  async checkWishlistStatus(req, res, next) {
    try {
      const { product_id } = req.params;

      const isInWishlist = await wishlistModel.isInWishlist(req.user.id, product_id);

      res.json({ isInWishlist });
    } catch (error) {
      next(error);
    }
  },

  async clearWishlist(req, res, next) {
    try {
      await wishlistModel.clearWishlist(req.user.id);

      res.json({ message: 'Wishlist cleared' });
    } catch (error) {
      next(error);
    }
  }
};
