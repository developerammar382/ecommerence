import express from 'express';
import { paymentController } from '../controllers/paymentController.js';
import { authenticateToken, authorizeRole } from '../middleware/auth.js';

const router = express.Router();

router.post('/create-payment-intent', authenticateToken, paymentController.createPaymentIntent);
router.get('/payment-intent/:paymentIntentId', authenticateToken, paymentController.getPaymentIntent);
router.post('/refund', authenticateToken, authorizeRole('admin'), paymentController.createRefund);

export default router;
