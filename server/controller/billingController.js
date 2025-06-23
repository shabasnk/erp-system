// controller/billingController.js
import Product from '../models/ProductModel.js';
import { Op } from 'sequelize';
console.log("under billing controller");

export const searchProducts = async (req, res) => {
    console.log("under search products");
    
  try {

    console.log("under Try");
    
    const { query } = req.query;

    console.log("query:",query);
    
    
    if (!query || query.length < 2) {
      return res.status(400).json({ 
        success: false,
        message: 'Search query must be at least 2 characters long'
      });
    }

    const products = await Product.findAll({
      where: {
        name: {
          [Op.iLike]: `%${query}%`
        },
        isActive: true
      },
      limit: 10,
      attributes: ['id', 'name', 'price', 'description', 'discountPrice']
    });

    res.status(200).json({
      success: true,
      products
    });
  } catch (error) {
    console.error('Error searching products:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
};

export const createInvoice = async (req, res) => {
  try {
    const { products, customerInfo, paymentMethod } = req.body;
    
    // Validate input
    if (!products || !Array.isArray(products)) {
      return res.status(400).json({
        success: false,
        message: 'Products array is required'
      });
    }

    // Calculate totals
    const subtotal = products.reduce((sum, item) => {
      const price = item.discountPrice || item.price;
      return sum + (price * item.quantity);
    }, 0);

    // In a real application, you would:
    // 1. Create an invoice record
    // 2. Create invoice items
    // 3. Process payment
    // 4. Update inventory
    
    // For now, we'll just return a success response
    res.status(201).json({
      success: true,
      message: 'Invoice created successfully',
      invoice: {
        id: Math.floor(Math.random() * 10000), // Temporary mock ID
        subtotal,
        tax: 0, // You would calculate this
        total: subtotal,
        items: products,
        customerInfo,
        paymentMethod,
        createdAt: new Date()
      }
    });
  } catch (error) {
    console.error('Error creating invoice:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to create invoice'
    });
  }
};