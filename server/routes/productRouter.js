import express from 'express';
import {
  createProduct,
} from '../controller/productController.js';

const router = express.Router();

console.log("under product router");

// Product routes
router.route('/product')
  .post(createProduct);

export default router;