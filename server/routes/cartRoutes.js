import express from 'express';
import { cartController } from '../controllers/cartController.js';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();

router.get('/cart', authenticateToken, cartController.getCart);
router.post('/cart', authenticateToken, cartController.addToCart);
router.put('/cart/:product_id', authenticateToken, cartController.updateCartItem);
router.delete('/cart/:product_id', authenticateToken, cartController.removeFromCart);
router.delete('/cart', authenticateToken, cartController.clearCart);

export default router;
