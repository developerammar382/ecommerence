import express from 'express';
import { wishlistController } from '../controllers/wishlistController.js';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();

router.get('/wishlist', authenticateToken, wishlistController.getWishlist);
router.post('/wishlist', authenticateToken, wishlistController.addToWishlist);
router.delete('/wishlist/:product_id', authenticateToken, wishlistController.removeFromWishlist);
router.get('/wishlist/check/:product_id', authenticateToken, wishlistController.checkWishlistStatus);
router.delete('/wishlist', authenticateToken, wishlistController.clearWishlist);

export default router;
