import { Op } from 'sequelize';
import Product from '../models/ProductModel.js';
import Order from '../models/orderModel.js';
import Customer from '../models/customerModel.js';
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
                start: new Date(0),
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

        const formattedData = salesData.map(item => ({
            date: item.get('date'),
            totalOrders: Number(item.get('totalOrders')),
            totalSales: Number(item.get('totalSales'))
        }));

        res.json({
            success: true,
            data: formattedData
        });
    } catch (error) {
        console.error('Error fetching sales report:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to fetch sales report',
            details: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
};

// Get inventory report
export const getInventoryReport = async (req, res) => {
    try {
        const lowStockThreshold = req.query.threshold ? parseInt(req.query.threshold) : 10;
        const products = await Product.findAll({
            attributes: ['id', 'name', 'sku', 'stockQuantity', 'createdAt', 'updatedAt'],
            order: [['stockQuantity', 'ASC']]
        });

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

        const lowStockItems = inventoryItems.filter(item => item.status !== 'In Stock');

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
        console.error('Error fetching inventory report:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to fetch inventory report',
            details: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
};

// Get revenue report
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

        const resultData = revenueData.map(item => ({
            month: item.get('month'),
            revenue: Number(item.get('revenue'))
        }));

        res.json({
            success: true,
            data: resultData
        });
    } catch (error) {
        console.error('Error fetching revenue report:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to fetch revenue report',
            details: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
};

// Get profit report
export const getProfitReport = async (req, res) => {
    try {
        const profitData = await Order.findAll({
            attributes: [
                [sequelize.fn('date_trunc', 'month', sequelize.col('createdAt')), 'month'],
                [sequelize.fn('sum', sequelize.col('profit')), 'profit']
            ],
            group: ['month'],
            order: [['month', 'ASC']],
            limit: 12
        });

        const resultData = profitData.map(item => ({
            month: item.get('month'),
            profit: Number(item.get('profit'))
        }));

        res.json({
            success: true,
            data: resultData
        });
    } catch (error) {
        console.error('Error fetching profit report:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to fetch profit report',
            details: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
};

// Get recent orders
export const getRecentOrders = async (req, res) => {
    try {
        const limit = req.query.limit ? parseInt(req.query.limit) : 5;
        const orders = await Order.findAll({
            include: [{
                model: Customer,
                as: 'Customer',
                attributes: ['name']
            }],
            order: [['createdAt', 'DESC']],
            limit
        });

        const resultData = orders.map(order => ({
            id: order.id,
            customerName: order.Customer?.name || 'Unknown Customer',
            totalAmount: Number(order.totalAmount),
            profit: Number(order.profit),
            status: order.status,
            createdAt: order.createdAt
        }));

        res.json({
            success: true,
            data: resultData
        });
    } catch (error) {
        console.error('Error fetching recent orders:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to fetch recent orders',
            details: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
};
