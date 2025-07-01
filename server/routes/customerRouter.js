import express from 'express';
import {
  createCustomer,

} from '../controller/customerController.js';
import { verifyToken } from '../middlewares/tokenVerification.js';

const router = express.Router();

// Apply token verification to all customer routes
router.use(verifyToken);
console.log("customerrouter hitted");

// RESTful routes
router.route('/create')
  .post(createCustomer)    // POST /api/customers

export default router;