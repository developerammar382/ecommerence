import express from 'express';
import { adminController } from '../controllers/adminController.js';
import { productController, categoryController } from '../controllers/productController.js';
import { authenticateToken, authorizeRole } from '../middleware/auth.js';

const router = express.Router();

router.use(authenticateToken);
router.use(authorizeRole('admin', 'product_manager'));

router.get('/dashboard/stats', adminController.getDashboardStats);
router.get('/dashboard/analytics', adminController.getSalesAnalytics);
router.get('/users', adminController.getUsers);
router.put('/users/:id/status', authorizeRole('admin'), adminController.updateUserStatus);
router.put('/users/:id/role', authorizeRole('admin'), adminController.updateUserRole);

router.get('/products', productController.getAllProducts);
router.get('/products/low-stock', productController.getLowStockProducts);
router.get('/products/:id', productController.getProductById);
router.post('/products', productController.createProduct);
router.put('/products/:id', productController.updateProduct);
router.delete('/products/:id', productController.deleteProduct);

router.get('/categories', categoryController.getAllCategories);
router.get('/categories/:id', categoryController.getCategoryById);
router.post('/categories', authorizeRole('admin'), categoryController.createCategory);
router.put('/categories/:id', authorizeRole('admin'), categoryController.updateCategory);
router.delete('/categories/:id', authorizeRole('admin'), categoryController.deleteCategory);

export default router;
