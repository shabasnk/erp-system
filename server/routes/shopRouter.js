// import express from 'express';
// import {
//   getShop,
//   updateShop,
// } from '../controller/shopController.js';
// import { authenticate } from '../middleware/';

// const router = express.Router();

// // Get current shop (authenticated user's shop)
// router.get('/me', authenticate, getShop);
// // Update shop information
// router.put('/me', authenticate, updateShop);

// export default router;


import express from 'express';
import { getShop, updateShop } from '../controller/shopController.js';
// import { verifyToken } from '../middleware/tokenVerification.js';
import { verifyToken } from '../middlewares/tokenVerification.js';



const router = express.Router();

// Protected routes
router.get('/shops', verifyToken, getShop);
router.put('/shops', verifyToken, updateShop);

export default router;