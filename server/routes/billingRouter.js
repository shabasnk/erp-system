// import express from 'express';
// import { searchProducts } from '../controller/billingController.js';

// const router = express.Router();

// // Search products by name
// router.get('/search', searchProducts);

// export default router;



// routes/billingRouter.js
import express from 'express';
import { searchProducts, createInvoice } from '../controller/billingController.js';
import { verifyToken } from '../middlewares/tokenVerification.js';
const router = express.Router();

router.use(verifyToken)

// Search products by name
router.get('/search', searchProducts);

// Create new invoice
router.post('/create', createInvoice);

export default router;