// // //C:\coding\WEZ-ERP-APP\server\controller\reportController.js
// // import { Op } from 'sequelize';
// // import Order from '../models/orderModel.js';
// // import Product from '../models/ProductModel.js';
// // import Customer from '../models/customerModel.js';
// // import sequelize from '../connect/connect.js'; // Add this line


// // // Helper function to format date ranges
// // const getDateRange = (range) => {
// //   console.log("hitched getDateRange");
  
// //   const now = new Date();
  
// //   switch(range) {
// //     case 'today':
// //       return {
// //         start: new Date(now.setHours(0, 0, 0, 0)),
// //         end: new Date(now.setHours(23, 59, 59, 999))
// //       };
// //     case 'week':
// //       return {
// //         start: new Date(now.setDate(now.getDate() - 7)),
// //         end: new Date()
// //       };
// //     case 'month':
// //       return {
// //         start: new Date(now.setMonth(now.getMonth() - 1)),
// //         end: new Date()
// //       };
// //     case 'year':
// //       return {
// //         start: new Date(now.setFullYear(now.getFullYear() - 1)),
// //         end: new Date()
// //       };
// //     default:
// //       return {
// //         start: new Date(0), // All time
// //         end: new Date()
// //       };
// //   }
// // };

// // // Get sales report
// // export const getSalesReport = async (req, res) => {
// //     console.log("hitched getSalesReport");

// //   try {
// //     const { range, startDate, endDate } = req.query;
    
// //     let dateFilter = {};
// //     if (startDate && endDate) {
// //       dateFilter = {
// //         createdAt: {
// //           [Op.between]: [new Date(startDate), new Date(endDate)]
// //         }
// //       };
// //     } else if (range) {
// //       const { start, end } = getDateRange(range);
// //       dateFilter = {
// //         createdAt: {
// //           [Op.between]: [start, end]
// //         }
// //       };
// //     }

// //     const salesData = await Order.findAll({
// //       where: dateFilter,
// //       attributes: [
// //         [sequelize.fn('date_trunc', 'day', sequelize.col('createdAt')), 'date'],
// //         [sequelize.fn('count', '*'), 'totalOrders'],
// //         [sequelize.fn('sum', sequelize.col('totalAmount')), 'totalSales']
// //       ],
// //       group: ['date'],
// //       order: [['date', 'ASC']]
// //     });

// //     res.json({
// //       success: true,
// //       data: salesData.map(item => ({
// //         date: item.get('date'),
// //         totalOrders: item.get('totalOrders'),
// //         totalSales: item.get('totalSales')
// //       }))
// //     });
// //   } catch (error) {
// //     console.error('Error fetching sales report:', error);
// //     res.status(500).json({
// //       success: false,
// //       error: 'Failed to fetch sales report'
// //     });
// //   }
// // };

// // // Get inventory report
// // export const getInventoryReport = async (req, res) => {
// //     console.log("hitched getInventoryReport");

// //   try {
// //     const inventoryStatus = await Product.findAll({
// //       attributes: [
// //         'status',
// //         [sequelize.fn('count', '*'), 'count']
// //       ],
// //       group: ['status']
// //     });

// //     const lowStockItems = await Product.findAll({
// //       where: {
// //         status: 'Low Stock'
// //       },
// //       limit: 10,
// //       order: [['currentStock', 'ASC']]
// //     });

// //     res.json({
// //       success: true,
// //       data: {
// //         statusCounts: inventoryStatus,
// //         lowStockItems
// //       }
// //     });
// //   } catch (error) {
// //     console.error('Error fetching inventory report:', error);
// //     res.status(500).json({
// //       success: false,
// //       error: 'Failed to fetch inventory report'
// //     });
// //   }
// // };

// // // Get revenue report (monthly)
// // export const getRevenueReport = async (req, res) => {
// //       console.log("hitched getRevenueReport");

// //   try {
// //     const revenueData = await Order.findAll({
// //       attributes: [
// //         [sequelize.fn('date_trunc', 'month', sequelize.col('createdAt')), 'month'],
// //         [sequelize.fn('sum', sequelize.col('totalAmount')), 'revenue']
// //       ],
// //       group: ['month'],
// //       order: [['month', 'ASC']],
// //       limit: 12
// //     });

// //     res.json({
// //       success: true,
// //       data: revenueData.map(item => ({
// //         month: item.get('month'),
// //         revenue: item.get('revenue')
// //       }))
// //     });
// //   } catch (error) {
// //     console.error('Error fetching revenue report:', error);
// //     res.status(500).json({
// //       success: false,
// //       error: 'Failed to fetch revenue report'
// //     });
// //   }
// // };

// // // Get profit report (monthly)
// // export const getProfitReport = async (req, res) => {
// //         console.log("hitched getProfitReport");

// //   try {
// //     const profitData = await Order.findAll({
// //       attributes: [
// //         [sequelize.fn('date_trunc', 'month', sequelize.col('createdAt')), 'month'],
// //         [sequelize.fn('sum', sequelize.col('totalAmount')), 'revenue'],
// //         [sequelize.fn('sum', sequelize.col('profit')), 'profit']
// //       ],
// //       group: ['month'],
// //       order: [['month', 'ASC']],
// //       limit: 12
// //     });

// //     res.json({
// //       success: true,
// //       data: profitData.map(item => ({
// //         month: item.get('month'),
// //         profit: item.get('profit')
// //       }))
// //     });
// //   } catch (error) {
// //     console.error('Error fetching profit report:', error);
// //     res.status(500).json({
// //       success: false,
// //       error: 'Failed to fetch profit report'
// //     });
// //   }
// // };














// import { Op } from 'sequelize';
// import Product from '../models/ProductModel.js';
// import Order from '../models/orderModel.js';
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
//                 start: new Date(0), // All time
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

//         res.json({
//             success: true,
//             data: salesData.map(item => ({
//                 date: item.get('date'),
//                 totalOrders: item.get('totalOrders'),
//                 totalSales: item.get('totalSales')
//             }))
//         });
//     } catch (error) {
//         console.error('Error fetching sales report:', error);
//         res.status(500).json({
//             success: false,
//             error: 'Failed to fetch sales report'
//         });
//     }
// };

// // Get inventory report with dynamic status calculation
// export const getInventoryReport = async (req, res) => {
//     try {
//         // Get threshold from query or use default (10)
//         const lowStockThreshold = req.query.threshold ? 
//             parseInt(req.query.threshold) : 10;
        
//         // Get all products with their stock quantities
//         const products = await Product.findAll({
//             attributes: [
//                 'id',
//                 'name',
//                 'sku',
//                 'stockQuantity',
//                 'createdAt',
//                 'updatedAt'
//             ],
//             order: [['stockQuantity', 'ASC']] // Sort by stock quantity (lowest first)
//         });

//         // Add status to each product
//         const inventoryItems = products.map(product => ({
//             id: product.id,
//             name: product.name,
//             sku: product.sku,
//             currentStock: product.stockQuantity,
//             lowStockThreshold, // Using the same threshold for all products
//             status: getInventoryStatus(product.stockQuantity, lowStockThreshold),
//             lastUpdated: product.updatedAt
//         }));

//         // Calculate status counts
//         const statusCounts = inventoryItems.reduce((acc, item) => {
//             acc[item.status] = (acc[item.status] || 0) + 1;
//             return acc;
//         }, {});

//         // Get low stock items (status = 'Low Stock' or 'Out of Stock')
//         const lowStockItems = inventoryItems.filter(item => 
//             item.status !== 'In Stock'
//         );

//         res.json({
//             success: true,
//             data: {
//                 statusCounts,
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
//             error: 'Failed to fetch inventory report'
//         });
//     }
// };

// // Get revenue report (monthly)
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

//         res.json({
//             success: true,
//             data: revenueData.map(item => ({
//                 month: item.get('month'),
//                 revenue: item.get('revenue')
//             }))
//         });
//     } catch (error) {
//         console.error('Error fetching revenue report:', error);
//         res.status(500).json({
//             success: false,
//             error: 'Failed to fetch revenue report'
//         });
//     }
// };

// // Get profit report (monthly)
// export const getProfitReport = async (req, res) => {
//     try {
//         const profitData = await Order.findAll({
//             attributes: [
//                 [sequelize.fn('date_trunc', 'month', sequelize.col('createdAt')), 'month'],
//                 [sequelize.fn('sum', sequelize.col('totalAmount')), 'revenue'],
//                 [sequelize.fn('sum', sequelize.col('profit')), 'profit']
//             ],
//             group: ['month'],
//             order: [['month', 'ASC']],
//             limit: 12
//         });

//         res.json({
//             success: true,
//             data: profitData.map(item => ({
//                 month: item.get('month'),
//                 profit: item.get('profit')
//             }))
//         });
//     } catch (error) {
//         console.error('Error fetching profit report:', error);
//         res.status(500).json({
//             success: false,
//             error: 'Failed to fetch profit report'
//         });
//     }
// };

// // Get recent orders (for dashboard)
// export const getRecentOrders = async (req, res) => {
//     try {
//         const limit = req.query.limit ? parseInt(req.query.limit) : 5;
        
//         const orders = await Order.findAll({
//             include: [{
//                 model: Customer,
//                 attributes: ['name']
//             }],
//             order: [['createdAt', 'DESC']],
//             limit
//         });

//         res.json({
//             success: true,
//             data: orders.map(order => ({
//                 id: order.id,
//                 customerName: order.Customer?.name || 'Unknown Customer',
//                 totalAmount: order.totalAmount,
//                 status: order.status,
//                 createdAt: order.createdAt
//             }))
//         });
//     } catch (error) {
//         console.error('Error fetching recent orders:', error);
//         res.status(500).json({
//             success: false,
//             error: 'Failed to fetch recent orders'
//         });
//     }
// };








// //C:\coding\WEZ-ERP-APP\server\controller\reportController.js
// import { Op } from 'sequelize';
// import Order from '../models/orderModel.js';
// import Product from '../models/ProductModel.js';
// import Customer from '../models/customerModel.js';
// import sequelize from '../connect/connect.js'; // Add this line


// // Helper function to format date ranges
// const getDateRange = (range) => {
//   console.log("hitched getDateRange");
  
//   const now = new Date();
  
//   switch(range) {
//     case 'today':
//       return {
//         start: new Date(now.setHours(0, 0, 0, 0)),
//         end: new Date(now.setHours(23, 59, 59, 999))
//       };
//     case 'week':
//       return {
//         start: new Date(now.setDate(now.getDate() - 7)),
//         end: new Date()
//       };
//     case 'month':
//       return {
//         start: new Date(now.setMonth(now.getMonth() - 1)),
//         end: new Date()
//       };
//     case 'year':
//       return {
//         start: new Date(now.setFullYear(now.getFullYear() - 1)),
//         end: new Date()
//       };
//     default:
//       return {
//         start: new Date(0), // All time
//         end: new Date()
//       };
//   }
// };

// // Get sales report
// export const getSalesReport = async (req, res) => {
//     console.log("hitched getSalesReport");

//   try {
//     const { range, startDate, endDate } = req.query;
    
//     let dateFilter = {};
//     if (startDate && endDate) {
//       dateFilter = {
//         createdAt: {
//           [Op.between]: [new Date(startDate), new Date(endDate)]
//         }
//       };
//     } else if (range) {
//       const { start, end } = getDateRange(range);
//       dateFilter = {
//         createdAt: {
//           [Op.between]: [start, end]
//         }
//       };
//     }

//     const salesData = await Order.findAll({
//       where: dateFilter,
//       attributes: [
//         [sequelize.fn('date_trunc', 'day', sequelize.col('createdAt')), 'date'],
//         [sequelize.fn('count', '*'), 'totalOrders'],
//         [sequelize.fn('sum', sequelize.col('totalAmount')), 'totalSales']
//       ],
//       group: ['date'],
//       order: [['date', 'ASC']]
//     });

//     res.json({
//       success: true,
//       data: salesData.map(item => ({
//         date: item.get('date'),
//         totalOrders: item.get('totalOrders'),
//         totalSales: item.get('totalSales')
//       }))
//     });
//   } catch (error) {
//     console.error('Error fetching sales report:', error);
//     res.status(500).json({
//       success: false,
//       error: 'Failed to fetch sales report'
//     });
//   }
// };

// // Get inventory report
// export const getInventoryReport = async (req, res) => {
//     console.log("hitched getInventoryReport");

//   try {
//     const inventoryStatus = await Product.findAll({
//       attributes: [
//         'status',
//         [sequelize.fn('count', '*'), 'count']
//       ],
//       group: ['status']
//     });

//     const lowStockItems = await Product.findAll({
//       where: {
//         status: 'Low Stock'
//       },
//       limit: 10,
//       order: [['currentStock', 'ASC']]
//     });

//     res.json({
//       success: true,
//       data: {
//         statusCounts: inventoryStatus,
//         lowStockItems
//       }
//     });
//   } catch (error) {
//     console.error('Error fetching inventory report:', error);
//     res.status(500).json({
//       success: false,
//       error: 'Failed to fetch inventory report'
//     });
//   }
// };

// // Get revenue report (monthly)
// export const getRevenueReport = async (req, res) => {
//       console.log("hitched getRevenueReport");

//   try {
//     const revenueData = await Order.findAll({
//       attributes: [
//         [sequelize.fn('date_trunc', 'month', sequelize.col('createdAt')), 'month'],
//         [sequelize.fn('sum', sequelize.col('totalAmount')), 'revenue']
//       ],
//       group: ['month'],
//       order: [['month', 'ASC']],
//       limit: 12
//     });

//     res.json({
//       success: true,
//       data: revenueData.map(item => ({
//         month: item.get('month'),
//         revenue: item.get('revenue')
//       }))
//     });
//   } catch (error) {
//     console.error('Error fetching revenue report:', error);
//     res.status(500).json({
//       success: false,
//       error: 'Failed to fetch revenue report'
//     });
//   }
// };

// // Get profit report (monthly)
// export const getProfitReport = async (req, res) => {
//         console.log("hitched getProfitReport");

//   try {
//     const profitData = await Order.findAll({
//       attributes: [
//         [sequelize.fn('date_trunc', 'month', sequelize.col('createdAt')), 'month'],
//         [sequelize.fn('sum', sequelize.col('totalAmount')), 'revenue'],
//         [sequelize.fn('sum', sequelize.col('profit')), 'profit']
//       ],
//       group: ['month'],
//       order: [['month', 'ASC']],
//       limit: 12
//     });

//     res.json({
//       success: true,
//       data: profitData.map(item => ({
//         month: item.get('month'),
//         profit: item.get('profit')
//       }))
//     });
//   } catch (error) {
//     console.error('Error fetching profit report:', error);
//     res.status(500).json({
//       success: false,
//       error: 'Failed to fetch profit report'
//     });
//   }
// };













// //C:\coding\WEZ-ERP-APP\server\controller\reportController.js
// import { Op } from 'sequelize';
// import Product from '../models/ProductModel.js';
// import Order from '../models/orderModel.js';
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
//                 start: new Date(0), // All time
//                 end: new Date()
//             };
//     }
// };

// // Get sales report
// export const getInventoryReport = async (req, res) => {
//     try {
//         // Get threshold from query or use default (10)
//         const lowStockThreshold = req.query.threshold ? 
//             parseInt(req.query.threshold) : 10;
        
//         // Get all products with their stock quantities
//         const products = await Product.findAll({
//             attributes: [
//                 'id',
//                 'name',
//                 'sku',
//                 'stockQuantity',
//                 'createdAt',
//                 'updatedAt'
//             ],
//             order: [['stockQuantity', 'ASC']] // Sort by stock quantity (lowest first)
//         });

//         // Add status to each product
//         const inventoryItems = products.map(product => ({
//             id: product.id,
//             name: product.name,
//             sku: product.sku,
//             currentStock: product.stockQuantity,
//             lowStockThreshold, // Using the same threshold for all products
//             status: getInventoryStatus(product.stockQuantity, lowStockThreshold),
//             lastUpdated: product.updatedAt
//         }));

//         // Calculate status counts
//         const statusCounts = inventoryItems.reduce((acc, item) => {
//             acc[item.status] = (acc[item.status] || 0) + 1;
//             return acc;
//         }, {});

//         res.json({
//             success: true,
//             data: {
//                 statusCounts,
//                 inventoryItems,
//                 totalProducts: products.length,
//                 thresholdUsed: lowStockThreshold
//             }
//         });
//     } catch (error) {
//         console.error('Error fetching inventory report:', error);
//         res.status(500).json({
//             success: false,
//             error: 'Failed to fetch inventory report'
//         });
//     }
// };

// // Get inventory report with dynamic status calculation
// export const getInventoryReport = async (req, res) => {
//     try {
//         // Get threshold from query or use default (10)
//         const lowStockThreshold = req.query.threshold ? 
//             parseInt(req.query.threshold) : 10;
        
//         // Get all products with their stock quantities
//         const products = await Product.findAll({
//             attributes: [
//                 'id',
//                 'name',
//                 'sku',
//                 'stockQuantity',
//                 'createdAt',
//                 'updatedAt'
//             ],
//             order: [['stockQuantity', 'ASC']] // Sort by stock quantity (lowest first)
//         });

//         // Add status to each product
//         const inventoryItems = products.map(product => ({
//             id: product.id,
//             name: product.name,
//             sku: product.sku,
//             currentStock: product.stockQuantity,
//             lowStockThreshold, // Using the same threshold for all products
//             status: getInventoryStatus(product.stockQuantity, lowStockThreshold),
//             lastUpdated: product.updatedAt
//         }));

//         // Calculate status counts
//         const statusCounts = inventoryItems.reduce((acc, item) => {
//             acc[item.status] = (acc[item.status] || 0) + 1;
//             return acc;
//         }, {});

//         // Get low stock items (status = 'Low Stock' or 'Out of Stock')
//         const lowStockItems = inventoryItems.filter(item => 
//             item.status !== 'In Stock'
//         );

//         res.json({
//             success: true,
//             data: {
//                 statusCounts,
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
//             error: 'Failed to fetch inventory report'
//         });
//     }
// };

// // Get revenue report (monthly)
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

//         res.json({
//             success: true,
//             data: revenueData.map(item => ({
//                 month: item.get('month'),
//                 revenue: item.get('revenue')
//             }))
//         });
//     } catch (error) {
//         console.error('Error fetching revenue report:', error);
//         res.status(500).json({
//             success: false,
//             error: 'Failed to fetch revenue report'
//         });
//     }
// };

// // Get profit report (monthly)
// export const getProfitReport = async (req, res) => {
//     try {
//         const profitData = await Order.findAll({
//             attributes: [
//                 [sequelize.fn('date_trunc', 'month', sequelize.col('createdAt')), 'month'],
//                 [sequelize.fn('sum', sequelize.col('totalAmount')), 'revenue'],
//                 [sequelize.fn('sum', sequelize.col('profit')), 'profit']
//             ],
//             group: ['month'],
//             order: [['month', 'ASC']],
//             limit: 12
//         });

//         res.json({
//             success: true,
//             data: profitData.map(item => ({
//                 month: item.get('month'),
//                 profit: item.get('profit')
//             }))
//         });
//     } catch (error) {
//         console.error('Error fetching profit report:', error);
//         res.status(500).json({
//             success: false,
//             error: 'Failed to fetch profit report'
//         });
//     }
// };

// // Get recent orders (for dashboard)
// export const getRecentOrders = async (req, res) => {
//     try {
//         const limit = req.query.limit ? parseInt(req.query.limit) : 5;
        
//         const orders = await Order.findAll({
//             include: [{
//                 model: Customer,
//                 attributes: ['name']
//             }],
//             order: [['createdAt', 'DESC']],
//             limit
//         });

//         res.json({
//             success: true,
//             data: orders.map(order => ({
//                 id: order.id,
//                 customerName: order.Customer?.name || 'Unknown Customer',
//                 totalAmount: order.totalAmount,
//                 status: order.status,
//                 createdAt: order.createdAt
//             }))
//         });
//     } catch (error) {
//         console.error('Error fetching recent orders:', error);
//         res.status(500).json({
//             success: false,
//             error: 'Failed to fetch recent orders'
//         });
//     }
// };












//C:\coding\WEZ-ERP-APP\server\controller\reportController.js
import { Op } from 'sequelize';
import Product from '../models/ProductModel.js';
import Order from '../models/orderModel.js';
import Customer from '../models/customerModel.js'; // Make sure to import Customer
import sequelize from '../connect/connect.js';

// Helper function to determine inventory status
const getInventoryStatus = (stockQuantity, lowStockThreshold = 10) => {
    if (stockQuantity <= 0) return 'Out of Stock';
    if (stockQuantity <= lowStockThreshold) return 'Low Stock';
    return 'In Stock';
};

// Helper function to format date ranges
const getDateRange = (range) => {
    const now = new Date();
    
    switch(range) {
        case 'today':
            return {
                start: new Date(now.setHours(0, 0, 0, 0)),
                end: new Date(now.setHours(23, 59, 59, 999))
            };
        case 'week':
            return {
                start: new Date(now.setDate(now.getDate() - 7)),
                end: new Date()
            };
        case 'month':
            return {
                start: new Date(now.setMonth(now.getMonth() - 1)),
                end: new Date()
            };
        case 'year':
            return {
                start: new Date(now.setFullYear(now.getFullYear() - 1)),
                end: new Date()
            };
        default:
            return {
                start: new Date(0), // All time
                end: new Date()
            };
    }
};

// Get sales report
export const getSalesReport = async (req, res) => {
    try {
        const { range, startDate, endDate } = req.query;
        
        let dateFilter = {};
        if (startDate && endDate) {
            dateFilter = {
                createdAt: {
                    [Op.between]: [new Date(startDate), new Date(endDate)]
                }
            };
        } else if (range) {
            const { start, end } = getDateRange(range);
            dateFilter = {
                createdAt: {
                    [Op.between]: [start, end]
                }
            };
        }

        const salesData = await Order.findAll({
            where: dateFilter,
            attributes: [
                [sequelize.fn('date_trunc', 'day', sequelize.col('createdAt')), 'date'],
                [sequelize.fn('count', '*'), 'totalOrders'],
                [sequelize.fn('sum', sequelize.col('totalAmount')), 'totalSales']
            ],
            group: ['date'],
            order: [['date', 'ASC']]
        });

        res.json({
            success: true,
            data: salesData.map(item => ({
                date: item.get('date'),
                totalOrders: item.get('totalOrders'),
                totalSales: item.get('totalSales')
            }))
        });
    } catch (error) {
        console.error('Error fetching sales report:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to fetch sales report'
        });
    }
};

// Single inventory report function (removed the duplicate)
export const getInventoryReport = async (req, res) => {
    try {
        // Get threshold from query or use default (10)
        const lowStockThreshold = req.query.threshold ? 
            parseInt(req.query.threshold) : 10;
        
        // Get all products with their stock quantities
        const products = await Product.findAll({
            attributes: [
                'id',
                'name',
                'sku',
                'stockQuantity',
                'createdAt',
                'updatedAt'
            ],
            order: [['stockQuantity', 'ASC']] // Sort by stock quantity (lowest first)
        });

        // Add status to each product
        const inventoryItems = products.map(product => ({
            id: product.id,
            name: product.name,
            sku: product.sku,
            currentStock: product.stockQuantity,
            lowStockThreshold, // Using the same threshold for all products
            status: getInventoryStatus(product.stockQuantity, lowStockThreshold),
            lastUpdated: product.updatedAt
        }));

        // Calculate status counts
        const statusCounts = inventoryItems.reduce((acc, item) => {
            acc[item.status] = (acc[item.status] || 0) + 1;
            return acc;
        }, {});

        // Get low stock items (status = 'Low Stock' or 'Out of Stock')
        const lowStockItems = inventoryItems.filter(item => 
            item.status !== 'In Stock'
        );

        res.json({
            success: true,
            data: {
                statusCounts,
                inventoryItems,
                lowStockItems,
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

// Get revenue report (monthly)
export const getRevenueReport = async (req, res) => {
    try {
        const revenueData = await Order.findAll({
            attributes: [
                [sequelize.fn('date_trunc', 'month', sequelize.col('createdAt')), 'month'],
                [sequelize.fn('sum', sequelize.col('totalAmount')), 'revenue']
            ],
            group: ['month'],
            order: [['month', 'ASC']],
            limit: 12
        });

        res.json({
            success: true,
            data: revenueData.map(item => ({
                month: item.get('month'),
                revenue: item.get('revenue')
            }))
        });
    } catch (error) {
        console.error('Error fetching revenue report:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to fetch revenue report'
        });
    }
};

// Get profit report (monthly)
export const getProfitReport = async (req, res) => {
    try {
        const profitData = await Order.findAll({
            attributes: [
                [sequelize.fn('date_trunc', 'month', sequelize.col('createdAt')), 'month'],
                [sequelize.fn('sum', sequelize.col('totalAmount')), 'revenue'],
                [sequelize.fn('sum', sequelize.col('profit')), 'profit']
            ],
            group: ['month'],
            order: [['month', 'ASC']],
            limit: 12
        });

        res.json({
            success: true,
            data: profitData.map(item => ({
                month: item.get('month'),
                profit: item.get('profit')
            }))
        });
    } catch (error) {
        console.error('Error fetching profit report:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to fetch profit report'
        });
    }
};

// Get recent orders (for dashboard)
export const getRecentOrders = async (req, res) => {
    try {
        const limit = req.query.limit ? parseInt(req.query.limit) : 5;
        
        const orders = await Order.findAll({
            include: [{
                model: Customer,
                attributes: ['name']
            }],
            order: [['createdAt', 'DESC']],
            limit
        });

        res.json({
            success: true,
            data: orders.map(order => ({
                id: order.id,
                customerName: order.Customer?.name || 'Unknown Customer',
                totalAmount: order.totalAmount,
                status: order.status,
                createdAt: order.createdAt
            }))
        });
    } catch (error) {
        console.error('Error fetching recent orders:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to fetch recent orders'
        });
    }
};