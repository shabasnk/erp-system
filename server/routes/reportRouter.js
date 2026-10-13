// reportRouter.js
import express from 'express';
import { verifyToken } from '../middlewares/tokenVerification.js';
import {
  getSalesReport,
  getInventoryReport,
  getRevenueReport,
  getProfitReport,
  getRecentOrders,
  getDashboardSummary,    // ADD THIS IMPORT
  getDailySales          // ADD THIS IMPORT
} from '../controller/reportController.js';

console.log("from report Router.js");

const router = express.Router();

router.use(verifyToken);

// Report routes
router.get('/sales', getSalesReport);
router.get('/inventory', getInventoryReport);
router.get('/revenue', getRevenueReport);
router.get('/profit', getProfitReport);
router.get('/recent-orders', getRecentOrders);
router.get('/dashboard-summary', getDashboardSummary);  // ADD THIS ROUTE
router.get('/daily-sales', getDailySales);              // ADD THIS ROUTE

export default router;