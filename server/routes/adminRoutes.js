import express from 'express';
import { adminController } from '../controllers/adminController.js';
import { authenticateToken, authorizeRole } from '../middleware/auth.js';

const router = express.Router();

router.use(authenticateToken);
router.use(authorizeRole('admin', 'product_manager'));

router.get('/dashboard/stats', adminController.getDashboardStats);
router.get('/dashboard/analytics', adminController.getSalesAnalytics);
router.get('/users', adminController.getUsers);
router.put('/users/:id/status', authorizeRole('admin'), adminController.updateUserStatus);
router.put('/users/:id/role', authorizeRole('admin'), adminController.updateUserRole);

export default router;
