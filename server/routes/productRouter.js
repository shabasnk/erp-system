// routes/productRouter.js
import express from 'express';
import {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct
} from '../controller/productController.js';

const router = express.Router();

console.log("under product router");


// Product routes
router.route('/product')
  .post(createProduct);

router.route('/products')
  .get(getProducts);

router.route('/:id')
  .get(getProductById)
  .put(updateProduct)
  .delete(deleteProduct);

export default router;