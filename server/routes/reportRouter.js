//C:\coding\WEZ-ERP-APP\server\routes\reportRouter.js
import express from 'express';
import { verifyToken } from '../middlewares/tokenVerification.js';
import {
  getSalesReport,
  getInventoryReport,
  getRevenueReport,
  getProfitReport
} from '../controller/reportController.js';

const router = express.Router();

router.use(verifyToken);
console.log("hitched reprtRouter")
// Report routes
router.get('/sales', getSalesReport);
router.get('/inventory', getInventoryReport);
router.get('/revenue', getRevenueReport);
router.get('/profit', getProfitReport);

export default router;