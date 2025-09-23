import express from 'express';
import { getShop, updateShop } from '../controller/shopController.js';
// import { verifyToken } from '../middleware/tokenVerification.js';
import { verifyToken } from '../middlewares/tokenVerification.js';



const router = express.Router();

// Protected routes
router.get('/shops', verifyToken, getShop);
router.put('/shops', verifyToken, updateShop);

export default router;