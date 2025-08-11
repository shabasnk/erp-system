import { Op } from 'sequelize';
import Order from '../models/orderModel.js';
import Product from '../models/productModel.js';
import Customer from '../models/customerModel.js';

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

// Get inventory report
export const getInventoryReport = async (req, res) => {
  try {
    const inventoryStatus = await Product.findAll({
      attributes: [
        'status',
        [sequelize.fn('count', '*'), 'count']
      ],
      group: ['status']
    });

    const lowStockItems = await Product.findAll({
      where: {
        status: 'Low Stock'
      },
      limit: 10,
      order: [['currentStock', 'ASC']]
    });

    res.json({
      success: true,
      data: {
        statusCounts: inventoryStatus,
        lowStockItems
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