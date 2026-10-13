// routes/billingRouter.js
import express from 'express';
import { searchProducts, createInvoice } from '../controller/billingController.js';
import { verifyToken } from '../middlewares/tokenVerification.js';
import { downloadInvoice } from '../controller/pdfController.js'; // Import the new controller

const router = express.Router();

router.use(verifyToken)

// Search products by name
router.get('/search', searchProducts);

// Create new invoice
router.post('/create', createInvoice);


router.get('/download-invoice/:invoiceId', downloadInvoice);


export default router;