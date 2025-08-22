// import { Op } from 'sequelize';
// import Product from '../models/ProductModel.js';
// import Order from '../models/orderModel.js';
// import Customer from '../models/customerModel.js';
// import sequelize from '../connect/connect.js';

// // Helper function to determine inventory status
// const getInventoryStatus = (stockQuantity, lowStockThreshold = 10) => {
//     if (stockQuantity <= 0) return 'Out of Stock';
//     if (stockQuantity <= lowStockThreshold) return 'Low Stock';
//     return 'In Stock';
// };

// // Helper function to format date ranges
// const getDateRange = (range) => {
//     const now = new Date();
//     switch(range) {
//         case 'today':
//             return {
//                 start: new Date(now.setHours(0, 0, 0, 0)),
//                 end: new Date(now.setHours(23, 59, 59, 999))
//             };
//         case 'week':
//             return {
//                 start: new Date(now.setDate(now.getDate() - 7)),
//                 end: new Date()
//             };
//         case 'month':
//             return {
//                 start: new Date(now.setMonth(now.getMonth() - 1)),
//                 end: new Date()
//             };
//         case 'year':
//             return {
//                 start: new Date(now.setFullYear(now.getFullYear() - 1)),
//                 end: new Date()
//             };
//         default:
//             return {
//                 start: new Date(0),
//                 end: new Date()
//             };
//     }
// };

// // Get sales report
// export const getSalesReport = async (req, res) => {
//     try {
//         const { range, startDate, endDate } = req.query;
//         let dateFilter = {};

//         if (startDate && endDate) {
//             dateFilter = {
//                 createdAt: {
//                     [Op.between]: [new Date(startDate), new Date(endDate)]
//                 }
//             };
//         } else if (range) {
//             const { start, end } = getDateRange(range);
//             dateFilter = {
//                 createdAt: {
//                     [Op.between]: [start, end]
//                 }
//             };
//         }

//         const salesData = await Order.findAll({
//             where: dateFilter,
//             attributes: [
//                 [sequelize.fn('date_trunc', 'day', sequelize.col('createdAt')), 'date'],
//                 [sequelize.fn('count', '*'), 'totalOrders'],
//                 [sequelize.fn('sum', sequelize.col('totalAmount')), 'totalSales']
//             ],
//             group: ['date'],
//             order: [['date', 'ASC']]
//         });

//         const formattedData = salesData.map(item => ({
//             date: item.get('date'),
//             totalOrders: Number(item.get('totalOrders')),
//             totalSales: Number(item.get('totalSales'))
//         }));

//         res.json({
//             success: true,
//             data: formattedData
//         });
//     } catch (error) {
//         console.error('Error fetching sales report:', error);
//         res.status(500).json({
//             success: false,
//             error: 'Failed to fetch sales report',
//             details: process.env.NODE_ENV === 'development' ? error.message : undefined
//         });
//     }
// };

// // Get inventory report
// export const getInventoryReport = async (req, res) => {
//     try {
//         const lowStockThreshold = req.query.threshold ? parseInt(req.query.threshold) : 10;
//         const products = await Product.findAll({
//             attributes: ['id', 'name', 'sku', 'stockQuantity', 'createdAt', 'updatedAt'],
//             order: [['stockQuantity', 'ASC']]
//         });

//         const inventoryItems = products.map(product => ({
//             id: product.id,
//             name: product.name,
//             sku: product.sku,
//             currentStock: product.stockQuantity,
//             lowStockThreshold,
//             status: getInventoryStatus(product.stockQuantity, lowStockThreshold),
//             lastUpdated: product.updatedAt
//         }));

//         const statusCounts = inventoryItems.reduce((acc, item) => {
//             acc[item.status] = (acc[item.status] || 0) + 1;
//             return acc;
//         }, {});

//         const statusCountsArray = Object.entries(statusCounts).map(([status, count]) => ({
//             status,
//             count
//         }));

//         const lowStockItems = inventoryItems.filter(item => item.status !== 'In Stock');

//         res.json({
//             success: true,
//             data: {
//                 statusCounts: statusCountsArray,
//                 inventoryItems,
//                 lowStockItems,
//                 totalProducts: products.length,
//                 thresholdUsed: lowStockThreshold
//             }
//         });
//     } catch (error) {
//         console.error('Error fetching inventory report:', error);
//         res.status(500).json({
//             success: false,
//             error: 'Failed to fetch inventory report',
//             details: process.env.NODE_ENV === 'development' ? error.message : undefined
//         });
//     }
// };

// // Get revenue report
// export const getRevenueReport = async (req, res) => {
//     try {
//         const revenueData = await Order.findAll({
//             attributes: [
//                 [sequelize.fn('date_trunc', 'month', sequelize.col('createdAt')), 'month'],
//                 [sequelize.fn('sum', sequelize.col('totalAmount')), 'revenue']
//             ],
//             group: ['month'],
//             order: [['month', 'ASC']],
//             limit: 12
//         });

//         const resultData = revenueData.map(item => ({
//             month: item.get('month'),
//             revenue: Number(item.get('revenue'))
//         }));

//         res.json({
//             success: true,
//             data: resultData
//         });
//     } catch (error) {
//         console.error('Error fetching revenue report:', error);
//         res.status(500).json({
//             success: false,
//             error: 'Failed to fetch revenue report',
//             details: process.env.NODE_ENV === 'development' ? error.message : undefined
//         });
//     }
// };

// // Get profit report
// export const getProfitReport = async (req, res) => {
//     try {
//         const profitData = await Order.findAll({
//             attributes: [
//                 [sequelize.fn('date_trunc', 'month', sequelize.col('createdAt')), 'month'],
//                 [sequelize.fn('sum', sequelize.col('profit')), 'profit']
//             ],
//             group: ['month'],
//             order: [['month', 'ASC']],
//             limit: 12
//         });

//         const resultData = profitData.map(item => ({
//             month: item.get('month'),
//             profit: Number(item.get('profit'))
//         }));

//         res.json({
//             success: true,
//             data: resultData
//         });
//     } catch (error) {
//         console.error('Error fetching profit report:', error);
//         res.status(500).json({
//             success: false,
//             error: 'Failed to fetch profit report',
//             details: process.env.NODE_ENV === 'development' ? error.message : undefined
//         });
//     }
// };

// // Get recent orders
// export const getRecentOrders = async (req, res) => {
//     try {
//         const limit = req.query.limit ? parseInt(req.query.limit) : 5;
//         const orders = await Order.findAll({
//             include: [{
//                 model: Customer,
//                 as: 'Customer',
//                 attributes: ['name']
//             }],
//             order: [['createdAt', 'DESC']],
//             limit
//         });

//         const resultData = orders.map(order => ({
//             id: order.id,
//             customerName: order.Customer?.name || 'Unknown Customer',
//             totalAmount: Number(order.totalAmount),
//             profit: Number(order.profit),
//             status: order.status,
//             createdAt: order.createdAt
//         }));

//         res.json({
//             success: true,
//             data: resultData
//         });
//     } catch (error) {
//         console.error('Error fetching recent orders:', error);
//         res.status(500).json({
//             success: false,
//             error: 'Failed to fetch recent orders',
//             details: process.env.NODE_ENV === 'development' ? error.message : undefined
//         });
//     }
// };















// aftr chnging frm ordrs tble
import { Op } from 'sequelize';
import Invoice from '../models/invoiceModel.js';
import InvoiceItem from '../models/invoiceItemModel.js';
import Product from '../models/ProductModel.js';
import sequelize from '../connect/connect.js';
import Customer from '../models/customerModel.js'; // ADD THIS IMPORT




const getInventoryStatus = (stockQuantity, threshold) => {
  if (stockQuantity <= 0) return 'Out of Stock';
  if (stockQuantity <= threshold) return 'Low Stock';
  return 'In Stock';
};





export const getSalesReport = async (req, res) => {
  try {
    const { startDate, endDate } = req.query;
    let dateFilter = {};

    if (startDate && endDate) {
      dateFilter = {
        createdAt: {
          [Op.between]: [new Date(startDate), new Date(endDate)]
        }
      };
    }

    const salesData = await Invoice.findAll({
      where: {
        ...dateFilter,
        status: 'completed' // Only count completed invoices
      },
      include: [{
        model: InvoiceItem,
        include: [Product]
      }],
      order: [['createdAt', 'ASC']]
    });

    // Format data for daily aggregation
    const formattedData = salesData.reduce((acc, invoice) => {
      const date = invoice.createdAt.toISOString().split('T')[0];
      if (!acc[date]) {
        acc[date] = {
          date: date,
          totalSales: 0,
          totalOrders: 0,
          totalProfit: 0
        };
      }
      
      // Calculate profit (assuming 25% profit margin for each item)
      const invoiceProfit = invoice.InvoiceItems.reduce((profit, item) => {
        const costPrice = item.unitPrice * 0.75; // 75% cost, 25% profit
        return profit + ((item.unitPrice - costPrice) * item.quantity);
      }, 0);
      
      acc[date].totalSales += parseFloat(invoice.total);
      acc[date].totalOrders += 1;
      acc[date].totalProfit += invoiceProfit;
      
      return acc;
    }, {});

    res.json({
      success: true,
      data: Object.values(formattedData)
    });
  } catch (error) {
    console.error('Error fetching sales report:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch sales report'
    });
  }
};

export const getRevenueReport = async (req, res) => {
  try {
    const revenueData = await Invoice.findAll({
      where: {
        status: 'completed'
      },
      attributes: [
        [sequelize.fn('date_trunc', 'month', sequelize.col('createdAt')), 'month'],
        [sequelize.fn('sum', sequelize.col('total')), 'revenue'],
        [sequelize.fn('count', sequelize.col('id')), 'totalOrders']
      ],
      group: [sequelize.fn('date_trunc', 'month', sequelize.col('createdAt'))],
      order: [[sequelize.fn('date_trunc', 'month', sequelize.col('createdAt')), 'ASC']],
      limit: 12,
      raw: true
    });

    const resultData = revenueData.map(item => ({
      month: item.month,
      revenue: Number(item.revenue) || 0,
      totalOrders: Number(item.totalOrders) || 0
    }));

    res.json({
      success: true,
      data: resultData
    });
  } catch (error) {
    console.error('Error fetching revenue report:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch revenue report'
    });
  }
};

export const getProfitReport = async (req, res) => {
  try {
    const profitData = await Invoice.findAll({
      where: {
        status: 'completed'
      },
      attributes: [
        [sequelize.fn('date_trunc', 'month', sequelize.col('createdAt')), 'month'],
        [sequelize.fn('sum', sequelize.col('total')), 'revenue']
      ],
      group: [sequelize.fn('date_trunc', 'month', sequelize.col('createdAt'))],
      order: [[sequelize.fn('date_trunc', 'month', sequelize.col('createdAt')), 'ASC']],
      limit: 12,
      raw: true
    });

    // Calculate profit (25% of revenue as profit)
    const resultData = profitData.map(item => ({
      month: item.month,
      profit: Number(item.revenue) * 0.25 || 0, // 25% profit margin
      revenue: Number(item.revenue) || 0
    }));

    res.json({
      success: true,
      data: resultData
    });
  } catch (error) {
    console.error('Error fetching profit report:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch profit report'
    });
  }
};

export const getDashboardSummary = async (req, res) => {
  try {
    console.log('Fetching dashboard summary...');
    
    const now = new Date();
    const todayStart = new Date(now.setHours(0, 0, 0, 0));
    const todayEnd = new Date(now.setHours(23, 59, 59, 999));
    
    // Add debug logs to see what dates are being used
    console.log('Today range:', todayStart, 'to', todayEnd);
    
    // Today's sales
    const todaySales = await Invoice.sum('total', {
      where: {
        createdAt: { [Op.between]: [todayStart, todayEnd] },
        status: 'completed'
      }
    });
    
    console.log('Today sales result:', todaySales);
    
    const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);
    const yearStart = new Date(now.getFullYear(), 0, 1);

    // Monthly sales
    const monthlySales = await Invoice.sum('total', {
      where: {
        createdAt: { [Op.gte]: monthStart },
        status: 'completed'
      }
    });

    console.log('Monthly sales result:', monthlySales);

    // Yearly sales (total revenue)
    const yearlySales = await Invoice.sum('total', {
      where: {
        createdAt: { [Op.gte]: yearStart },
        status: 'completed'
      }
    });

    console.log('Yearly sales result:', yearlySales);

    // Total profit (25% of total revenue)
    const totalProfit = yearlySales * 0.25;

    // Monthly profit
    const monthlyProfit = monthlySales * 0.25;

    // Pending orders
    const pendingOrders = await Invoice.count({
      where: {
        status: 'pending'
      }
    });

    console.log('Pending orders result:', pendingOrders);

    const result = {
      dailySales: Number(todaySales) || 0,
      monthlySales: Number(monthlySales) || 0,
      yearlySales: Number(yearlySales) || 0,
      totalRevenue: Number(yearlySales) || 0,
      totalProfit: Number(totalProfit) || 0,
      monthlyProfit: Number(monthlyProfit) || 0,
      pendingOrders: Number(pendingOrders) || 0
    };
    
    console.log('Dashboard summary result:', result);
    
    res.json({
      success: true,
      data: result
    });
    
  } catch (error) {
    console.error('Error in getDashboardSummary:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch dashboard summary'
    });
  }
};

export const getRecentOrders = async (req, res) => {
  try {
    const limit = req.query.limit ? parseInt(req.query.limit) : 5;
    
    const orders = await Invoice.findAll({
      where: {
        status: { [Op.in]: ['completed', 'pending'] }
      },
      include: [{
        model: Customer,
        attributes: ['name', 'companyName']
      }],
      order: [['createdAt', 'DESC']],
      limit
    });

    const resultData = orders.map(order => ({
      id: order.id,
      customerName: order.Customer?.name || order.Customer?.companyName || 'Unknown Customer',
      totalAmount: Number(order.total),
      status: order.status === 'completed' ? 'Completed' : 
              order.status === 'pending' ? 'Pending' : 'Cancelled',
      date: order.createdAt
    }));

    res.json({
      success: true,
      data: resultData
    });
  } catch (error) {
    console.error('Error fetching recent orders:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch recent orders'
    });
  }
};





// Add these helper functions to your reportController.js

export const getDailySales = async (req, res) => {
  try {
    const { days = 30 } = req.query;
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - parseInt(days));

    const dailySales = await Invoice.findAll({
      where: {
        createdAt: { [Op.gte]: startDate },
        status: 'completed'
      },
      attributes: [
        [sequelize.fn('date', sequelize.col('createdAt')), 'date'],
        [sequelize.fn('sum', sequelize.col('total')), 'totalSales'],
        [sequelize.fn('count', sequelize.col('id')), 'totalOrders']
      ],
      group: [sequelize.fn('date', sequelize.col('createdAt'))],
      order: [[sequelize.fn('date', sequelize.col('createdAt')), 'ASC']],
      raw: true
    });

    res.json({
      success: true,
      data: dailySales.map(item => ({
        date: item.date,
        totalSales: Number(item.totalSales) || 0,
        totalOrders: Number(item.totalOrders) || 0
      }))
    });
  } catch (error) {
    console.error('Error fetching daily sales:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch daily sales'
    });
  }
};








// In reportController.js - getInventoryReport function
export const getInventoryReport = async (req, res) => {
  try {
    const lowStockThreshold = req.query.threshold ? parseInt(req.query.threshold) : 10;
    const products = await Product.findAll({
      attributes: ['id', 'name', 'sku', 'stockQuantity'], // This is correct
      order: [['stockQuantity', 'ASC']]
    });

    const inventoryItems = products.map(product => ({
      id: product.id,
      name: product.name,
      sku: product.sku || '',
      currentStock: product.stockQuantity || 0, // Map stockQuantity to currentStock
      lowStockThreshold: lowStockThreshold,
      status: getInventoryStatus(product.stockQuantity, lowStockThreshold)
    }));

    res.json({
      success: true,
      data: {
        inventoryItems, // This should now have currentStock field
        totalProducts: products.length,
        thresholdUsed: lowStockThreshold
      }
    });
  } catch (error) {
    console.error('Error fetching inventory report:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch inventory report'
    });
  }
};