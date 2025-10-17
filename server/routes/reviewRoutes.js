import express from 'express';
import { reviewController } from '../controllers/reviewController.js';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();

router.post('/reviews', authenticateToken, reviewController.createReview);
router.get('/reviews/my-reviews', authenticateToken, reviewController.getMyReviews);
router.get('/reviews/product/:product_id', reviewController.getProductReviews);
router.put('/reviews/:id', authenticateToken, reviewController.updateReview);
router.delete('/reviews/:id', authenticateToken, reviewController.deleteReview);

export default router;
