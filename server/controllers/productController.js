import { productModel } from '../models/productModel.js';
import { categoryModel } from '../models/categoryModel.js';

export const productController = {
  async getAllProducts(req, res, next) {
    try {
      const filters = {
        category_id: req.query.category_id,
        featured: req.query.featured === 'true',
        search: req.query.search,
        min_price: req.query.min_price,
        max_price: req.query.max_price,
        limit: req.query.limit ? parseInt(req.query.limit) : undefined
      };

      const products = await productModel.findAll(filters);
      res.json({ products, count: products.length });
    } catch (error) {
      next(error);
    }
  },

  async getProductById(req, res, next) {
    try {
      const product = await productModel.findById(req.params.id);
      if (!product) {
        return res.status(404).json({ error: 'Product not found' });
      }
      res.json({ product });
    } catch (error) {
      next(error);
    }
  },

  async createProduct(req, res, next) {
    try {
      const productData = {
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        category_id: req.body.category_id,
        image: req.body.image,
        stock: req.body.stock,
        sku: req.body.sku,
        featured: req.body.featured || false
      };

      const product = await productModel.create(productData);
      res.status(201).json({
        message: 'Product created successfully',
        product
      });
    } catch (error) {
      next(error);
    }
  },

  async updateProduct(req, res, next) {
    try {
      const updates = {
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        category_id: req.body.category_id,
        image: req.body.image,
        stock: req.body.stock,
        featured: req.body.featured
      };

      const product = await productModel.update(req.params.id, updates);
      if (!product) {
        return res.status(404).json({ error: 'Product not found' });
      }

      res.json({
        message: 'Product updated successfully',
        product
      });
    } catch (error) {
      next(error);
    }
  },

  async deleteProduct(req, res, next) {
    try {
      await productModel.delete(req.params.id);
      res.json({ message: 'Product deleted successfully' });
    } catch (error) {
      next(error);
    }
  },

  async getLowStockProducts(req, res, next) {
    try {
      const threshold = req.query.threshold || 10;
      const products = await productModel.getLowStockProducts(threshold);
      res.json({ products, count: products.length });
    } catch (error) {
      next(error);
    }
  }
};

export const categoryController = {
  async getAllCategories(req, res, next) {
    try {
      const categories = await categoryModel.findAll();
      res.json({ categories, count: categories.length });
    } catch (error) {
      next(error);
    }
  },

  async getCategoryById(req, res, next) {
    try {
      const category = await categoryModel.findById(req.params.id);
      if (!category) {
        return res.status(404).json({ error: 'Category not found' });
      }
      res.json({ category });
    } catch (error) {
      next(error);
    }
  },

  async createCategory(req, res, next) {
    try {
      const category = await categoryModel.create(req.body);
      res.status(201).json({
        message: 'Category created successfully',
        category
      });
    } catch (error) {
      next(error);
    }
  },

  async updateCategory(req, res, next) {
    try {
      const category = await categoryModel.update(req.params.id, req.body);
      if (!category) {
        return res.status(404).json({ error: 'Category not found' });
      }
      res.json({
        message: 'Category updated successfully',
        category
      });
    } catch (error) {
      next(error);
    }
  },

  async deleteCategory(req, res, next) {
    try {
      await categoryModel.delete(req.params.id);
      res.json({ message: 'Category deleted successfully' });
    } catch (error) {
      next(error);
    }
  }
};
