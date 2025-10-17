import express from 'express';
import { orderController } from '../controllers/orderController.js';
import { authenticateToken, authorizeRole } from '../middleware/auth.js';

const router = express.Router();

router.post('/orders', authenticateToken, orderController.createOrder);
router.get('/orders', authenticateToken, authorizeRole('admin', 'product_manager'), orderController.getAllOrders);
router.get('/orders/my-orders', authenticateToken, orderController.getMyOrders);
router.get('/orders/:id', authenticateToken, orderController.getOrderById);
router.put('/orders/:id/status', authenticateToken, authorizeRole('admin', 'product_manager'), orderController.updateOrderStatus);
router.put('/orders/:id/payment', authenticateToken, authorizeRole('admin'), orderController.updatePaymentStatus);
router.put('/orders/:id/tracking', authenticateToken, authorizeRole('admin', 'product_manager'), orderController.updateTrackingNumber);

export default router;
