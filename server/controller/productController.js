import Product from '../models/ProductModel.js';
import { Op } from 'sequelize';

// @desc    Create a new product
// @route   POST /api/product/product
// @access  Private/Admin
console.log("under controller");

  // Add this new function to your productController.js
// @desc    Check if a field value is unique
// @route   GET /api/product/check-unique
// @access  Public
const checkUniqueField = async (req, res) => {
  try {
    const { field, value } = req.query;
    
    if (!value) {

      return res.json({ exists: false });
    }

    // List of allowed fields to check
    const allowedFields = ['sku', 'serialNumber', 'barcode',];
    
    if (!allowedFields.includes(field)) {
      return res.status(400).json({ 
        error: 'Invalid field',
        message: `Can only check uniqueness for: ${allowedFields.join(', ')}`
      });
    }

    const product = await Product.findOne({ 
      where: { 
        [field]: value 
      } 
    });

    res.json({ 
      exists: !!product,
      field,
      value
    });
  } catch (error) {
    console.error('Error checking unique field:', error);
    res.status(500).json({
      error: 'Server error',
      details: error.message
    });
  }
};

const createProduct = async (req, res) => {
  try {
    const {
      name,
      price,
      description,
      categoryId,
      stockQuantity,
      image,
      discountPrice,
      sku,
      serialNumber,
      barcode,
      brand,
      weight,
      dimensions,
      expirationDate,
      tags,
      unitId,
    } = req.body;

    // Build the where clause conditionally
    const whereClause = { [Op.or]: [] };
    
    // Always check for name
    whereClause[Op.or].push({ name });
    
    // Only check SKU if it has a value
    if (sku) {
      whereClause[Op.or].push({ sku });
    }
    
    // Only check barcode if it has a value
    if (barcode) {
      whereClause[Op.or].push({ barcode });
    }

    // Check if product with same name or SKU or barcode already exists
    const existingProduct = await Product.findOne({
      where: whereClause
    });

    if (existingProduct) {
      let conflictField = 'name';
      if (existingProduct.sku === sku) conflictField = 'SKU';
      if (existingProduct.barcode === barcode) conflictField = 'barcode';
      
      return res.status(400).json({
        error: `Product with this ${conflictField} already exists`
      });
    }

    const product = await Product.create({
      name,
      price,
      description,
      categoryId,
      stockQuantity,
      image,
      discountPrice,
      sku,
      serialNumber,
      barcode,
      brand,
      weight,
      dimensions,
      expirationDate,
      tags: tags && tags.length > 0 ? tags.split(',').map(tag => tag.trim()) : [],
      unitId,
      isActive: true
    });

    res.status(201).json({
      success: true,
      message: 'Product created successfully',
      product
    });
  } catch (error) {
    console.error('Error creating product:', error);
    res.status(500).json({
      error: 'Server error',
      details: error.message
    });
  }
};

export {
  createProduct,
  checkUniqueField // Add this to your exports
};
