import { reviewModel } from '../models/reviewModel.js';
import { productModel } from '../models/productModel.js';

export const reviewController = {
  async createReview(req, res, next) {
    try {
      const { product_id, rating, comment } = req.body;

      if (!rating || rating < 1 || rating > 5) {
        return res.status(400).json({ error: 'Rating must be between 1 and 5' });
      }

      const product = await productModel.findById(product_id);
      if (!product) {
        return res.status(404).json({ error: 'Product not found' });
      }

      const hasReviewed = await reviewModel.hasUserReviewed(req.user.id, product_id);
      if (hasReviewed) {
        return res.status(400).json({ error: 'You have already reviewed this product' });
      }

      const review = await reviewModel.create({
        product_id,
        user_id: req.user.id,
        rating,
        comment
      });

      await productModel.updateRating(product_id);

      res.status(201).json({
        message: 'Review added successfully',
        review
      });
    } catch (error) {
      next(error);
    }
  },

  async getProductReviews(req, res, next) {
    try {
      const { product_id } = req.params;

      const reviews = await reviewModel.findByProductId(product_id);

      res.json({ reviews, count: reviews.length });
    } catch (error) {
      next(error);
    }
  },

  async getMyReviews(req, res, next) {
    try {
      const reviews = await reviewModel.findByUserId(req.user.id);

      res.json({ reviews, count: reviews.length });
    } catch (error) {
      next(error);
    }
  },

  async updateReview(req, res, next) {
    try {
      const { id } = req.params;
      const { rating, comment } = req.body;

      if (!rating || rating < 1 || rating > 5) {
        return res.status(400).json({ error: 'Rating must be between 1 and 5' });
      }

      const review = await reviewModel.update(id, req.user.id, { rating, comment });

      if (!review) {
        return res.status(404).json({ error: 'Review not found' });
      }

      await productModel.updateRating(review.product_id);

      res.json({
        message: 'Review updated successfully',
        review
      });
    } catch (error) {
      next(error);
    }
  },

  async deleteReview(req, res, next) {
    try {
      const { id } = req.params;

      await reviewModel.delete(id, req.user.id);

      res.json({ message: 'Review deleted successfully' });
    } catch (error) {
      next(error);
    }
  }
};
