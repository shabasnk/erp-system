
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
















// //C:\coding\WEZ-ERP-APP\server\controller\reportController.js
// import { Op } from 'sequelize';
// import Product from '../models/ProductModel.js';
// import Order from '../models/orderModel.js';
// import Customer from '../models/customerModel.js'; // Make sure to import Customer
// import sequelize from '../connect/connect.js';

// // Helper function to determine inventory status
// const getInventoryStatus = (stockQuantity, lowStockThreshold = 10) => {
//     console.log("under getInventoryStatus");
    
//     if (stockQuantity <= 0) return 'Out of Stock';
//     if (stockQuantity <= lowStockThreshold) return 'Low Stock';
//     return 'In Stock';
// };

// // Helper function to format date ranges
// const getDateRange = (range) => {
//     console.log("under getDateRange");
    
//     const now = new Date();

//     console.log("now Date",now);
    
    
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
//         console.log("under getSalesReport");

//     try {
//         const { range, startDate, endDate } = req.query;

//         console.log("range, startDate, endDate",range, startDate, endDate);
        

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

//         console.log("salesData:",salesData);
        

//         res.json({
//             success: true,
//             data: salesData.map(item => ({
//                 date: item.get('date'),
//                 totalOrders: item.get('totalOrders'),
//                 totalSales: item.get('totalSales')
//             }))
//         });
//     } catch (error) {
//         console.log("getSalesReport:",error);
        

//         console.error('Error fetching sales report:', error);
//         res.status(500).json({
//             success: false,
//             error: 'Failed to fetch sales report'
//         });
//     }
// };

// // Single inventory report function (removed the duplicate)
// export const getInventoryReport = async (req, res) => {
//             console.log("under getInventoryReport");

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

//         // Calculate status counts (as object)
//         const statusCounts = inventoryItems.reduce((acc, item) => {
//             acc[item.status] = (acc[item.status] || 0) + 1;
//             return acc;
//         }, {});

//         // Convert statusCounts object to array format
//         const statusCountsArray = Object.entries(statusCounts).map(([status, count]) => ({
//             status,
//             count
//         }));

//         // Get low stock items (status = 'Low Stock' or 'Out of Stock')
//         const lowStockItems = inventoryItems.filter(item => 
//             item.status !== 'In Stock'
//         );

//         res.json({
//             success: true,
//             data: {
//                 statusCounts: statusCountsArray, // Now sending as array
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
//                 console.log("under getRevenueReport");

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
//                     console.log("under getProfitReport");

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
//                         console.log("under getRecentOrders");

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
//         console.log("error:",error);
        
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
import Customer from '../models/customerModel.js';
import sequelize from '../connect/connect.js';

// Helper function to determine inventory status
const getInventoryStatus = (stockQuantity, lowStockThreshold = 10) => {
    console.log("Determining inventory status for stock:", stockQuantity, "with threshold:", lowStockThreshold);
    if (stockQuantity <= 0) return 'Out of Stock';
    if (stockQuantity <= lowStockThreshold) return 'Low Stock';
    return 'In Stock';
};

// Helper function to format date ranges
const getDateRange = (range) => {
    console.log("Getting date range for:", range);
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
                start: new Date(0),
                end: new Date()
            };
    }
};

// Get sales report
export const getSalesReport = async (req, res) => {
    console.log("Entering getSalesReport controller");
    try {
        const { range, startDate, endDate } = req.query;
        console.log("Request query parameters:", { range, startDate, endDate });

        let dateFilter = {};
        if (startDate && endDate) {
            dateFilter = {
                createdAt: {
                    [Op.between]: [new Date(startDate), new Date(endDate)]
                }
            };
            console.log("Using custom date range filter:", dateFilter);
        } else if (range) {
            const { start, end } = getDateRange(range);
            dateFilter = {
                createdAt: {
                    [Op.between]: [start, end]
                }
            };
            console.log("Using predefined range filter:", dateFilter);
        }

        console.log("Executing Order.findAll with filter:", dateFilter);
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

        console.log("Raw sales data from database:", salesData);

        const formattedData = salesData.map(item => ({
            date: item.get('date'),
            totalOrders: item.get('totalOrders'),
            totalSales: item.get('totalSales')
        }));

        console.log("Formatted sales data response:", formattedData);
        
        res.json({
            success: true,
            data: formattedData
        });
    } catch (error) {
        console.error('Error in getSalesReport:', {
            message: error.message,
            stack: error.stack,
            requestQuery: req.query
        });
        res.status(500).json({
            success: false,
            error: 'Failed to fetch sales report',
            details: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
};

// Get inventory report
export const getInventoryReport = async (req, res) => {
    console.log("Entering getInventoryReport controller");
    try {
        const lowStockThreshold = req.query.threshold ? 
            parseInt(req.query.threshold) : 10;
        console.log("Using low stock threshold:", lowStockThreshold);

        console.log("Fetching all products for inventory report");
        const products = await Product.findAll({
            attributes: [
                'id',
                'name',
                'sku',
                'stockQuantity',
                'createdAt',
                'updatedAt'
            ],
            order: [['stockQuantity', 'ASC']]
        });

        console.log(`Found ${products.length} products`);
        
        const inventoryItems = products.map(product => ({
            id: product.id,
            name: product.name,
            sku: product.sku,
            currentStock: product.stockQuantity,
            lowStockThreshold,
            status: getInventoryStatus(product.stockQuantity, lowStockThreshold),
            lastUpdated: product.updatedAt
        }));

        const statusCounts = inventoryItems.reduce((acc, item) => {
            acc[item.status] = (acc[item.status] || 0) + 1;
            return acc;
        }, {});

        const statusCountsArray = Object.entries(statusCounts).map(([status, count]) => ({
            status,
            count
        }));

        const lowStockItems = inventoryItems.filter(item => 
            item.status !== 'In Stock'
        );

        console.log("Inventory report data:", {
            statusCounts: statusCountsArray,
            inventoryItems,
            lowStockItems,
            totalProducts: products.length,
            thresholdUsed: lowStockThreshold
        });

        res.json({
            success: true,
            data: {
                statusCounts: statusCountsArray,
                inventoryItems,
                lowStockItems,
                totalProducts: products.length,
                thresholdUsed: lowStockThreshold
            }
        });
    } catch (error) {
        console.error('Error in getInventoryReport:', {
            message: error.message,
            stack: error.stack
        });
        res.status(500).json({
            success: false,
            error: 'Failed to fetch inventory report',
            details: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
};

// Get revenue report
export const getRevenueReport = async (req, res) => {
    console.log("Entering getRevenueReport controller");
    try {
        console.log("Fetching revenue data grouped by month");
        const revenueData = await Order.findAll({
            attributes: [
                [sequelize.fn('date_trunc', 'month', sequelize.col('createdAt')), 'month'],
                [sequelize.fn('sum', sequelize.col('totalAmount')), 'revenue']
            ],
            group: ['month'],
            order: [['month', 'ASC']],
            limit: 12
        });

        console.log("Raw revenue data from database:", revenueData);

        const resultData = revenueData.map(item => ({
            month: item.get('month'),
            revenue: item.get('revenue')
        }));

        console.log("Formatted revenue data:", resultData);

        res.json({
            success: true,
            data: resultData
        });
    } catch (error) {
        console.error('Error in getRevenueReport:', {
            message: error.message,
            stack: error.stack
        });
        res.status(500).json({
            success: false,
            error: 'Failed to fetch revenue report',
            details: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
};

// Get profit report
export const getProfitReport = async (req, res) => {
    console.log("Entering getProfitReport controller");
    try {
        console.log("Fetching profit data grouped by month");
        const profitData = await Order.findAll({
            attributes: [
                [sequelize.fn('date_trunc', 'month', sequelize.col('createdAt')), 'month'],
                [sequelize.fn('sum', sequelize.col('profit')), 'profit']
            ],
            group: ['month'],
            order: [['month', 'ASC']],
            limit: 12
        });

        console.log("Raw profit data from database:", profitData);

        const resultData = profitData.map(item => ({
            month: item.get('month'),
            profit: item.get('profit')
        }));

        console.log("Formatted profit data:", resultData);

        res.json({
            success: true,
            data: resultData
        });
    } catch (error) {
        console.error('Error in getProfitReport:', {
            message: error.message,
            stack: error.stack
        });
        res.status(500).json({
            success: false,
            error: 'Failed to fetch profit report',
            details: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
};

// Get recent orders
export const getRecentOrders = async (req, res) => {
    console.log("Entering getRecentOrders controller");
    try {
        const limit = req.query.limit ? parseInt(req.query.limit) : 5;
        console.log("Fetching recent orders with limit:", limit);
        
        const orders = await Order.findAll({
            include: [{
                model: Customer,
                as: 'Customer',
                attributes: ['name']
            }],
            order: [['createdAt', 'DESC']],
            limit
        });

        console.log(`Found ${orders.length} recent orders`);

        const resultData = orders.map(order => ({
            id: order.id,
            customerName: order.Customer?.name || 'Unknown Customer',
            totalAmount: parseFloat(order.totalAmount), // Convert to number
            profit: parseFloat(order.profit),         // Convert to number
            status: order.status,
            createdAt: order.createdAt
        }));

        console.log("Formatted recent orders data:", resultData);

        res.json({
            success: true,
            data: resultData
        });
    } catch (error) {
        console.error('Error in getRecentOrders:', {
            message: error.message,
            stack: error.stack,
            requestQuery: req.query
        });
        res.status(500).json({
            success: false,
            error: 'Failed to fetch recent orders',
            details: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
};