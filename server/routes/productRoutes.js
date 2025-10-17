import express from 'express';
import { productController, categoryController } from '../controllers/productController.js';
import { authenticateToken, authorizeRole } from '../middleware/auth.js';

const router = express.Router();

router.get('/products', productController.getAllProducts);
router.get('/products/low-stock', authenticateToken, authorizeRole('admin', 'product_manager'), productController.getLowStockProducts);
router.get('/products/:id', productController.getProductById);
router.post('/products', authenticateToken, authorizeRole('admin', 'product_manager'), productController.createProduct);
router.put('/products/:id', authenticateToken, authorizeRole('admin', 'product_manager'), productController.updateProduct);
router.delete('/products/:id', authenticateToken, authorizeRole('admin', 'product_manager'), productController.deleteProduct);

router.get('/categories', categoryController.getAllCategories);
router.get('/categories/:id', categoryController.getCategoryById);
router.post('/categories', authenticateToken, authorizeRole('admin'), categoryController.createCategory);
router.put('/categories/:id', authenticateToken, authorizeRole('admin'), categoryController.updateCategory);
router.delete('/categories/:id', authenticateToken, authorizeRole('admin'), categoryController.deleteCategory);

export default router;
