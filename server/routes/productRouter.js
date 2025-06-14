import express from 'express';
import { verifyToken } from '../middlewares/tokenVerification.js';
import {
  createProduct,
} from '../controller/productController.js';

const router = express.Router();

router.use(verifyToken)


console.log("under product router");

// Product routes
router.route('/product')
  .post(createProduct);

export default router;