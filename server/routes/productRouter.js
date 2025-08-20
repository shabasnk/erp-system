import express from 'express';
import { verifyToken } from '../middlewares/tokenVerification.js';
import { createProduct, getProducts } from '../controller/productController.js';

const router = express.Router();

router.use(verifyToken);

// Product routes
router.route('/product')
  .post(createProduct)  // For creating a product
  .get(getProducts);    // For getting all products

export default router;
