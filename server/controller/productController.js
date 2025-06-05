// controllers/productController.js
import Product from '../models/ProductModel.js';
import { Op } from 'sequelize';

// @desc    Create a new product
// @route   POST /api/product/product
// @access  Private/Admin
console.log("under controller");


const createProduct = async (req, res) => {
    console.log("under create product");
    
  try {
    console.log("under try");
    
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

    // Check if product with same name or SKU already exists
    const existingProduct = await Product.findOne({
      where: {
        [Op.or]: [
          { name },
          { sku: sku || null },
          { barcode: barcode || null }
        ]
      }
    });

    if (existingProduct) {
      return res.status(400).json({
        error: 'Product with this name, SKU or barcode already exists'
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

// @desc    Get all products
// @route   GET /api/product/products
// @access  Public
const getProducts = async (req, res) => {
  try {
    const { page = 1, limit = 10, search, categoryId } = req.query;
    const offset = (page - 1) * limit;

    const whereClause = {};
    if (search) {
      whereClause[Op.or] = [
        { name: { [Op.iLike]: `%${search}%` } },
        { description: { [Op.iLike]: `%${search}%` } },
        { brand: { [Op.iLike]: `%${search}%` } }
      ];
    }
    if (categoryId) {
      whereClause.categoryId = categoryId;
    }

    const { count, rows } = await Product.findAndCountAll({
      where: whereClause,
      limit: parseInt(limit),
      offset: parseInt(offset),
      order: [['createdAt', 'DESC']]
    });

    res.json({
      success: true,
      products: rows,
      totalProducts: count,
      totalPages: Math.ceil(count / limit),
      currentPage: parseInt(page)
    });
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({
      error: 'Server error',
      details: error.message
    });
  }
};

// @desc    Get single product
// @route   GET /api/product/:id
// @access  Public
const getProductById = async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id);

    if (!product) {
      return res.status(404).json({
        error: 'Product not found'
      });
    }

    res.json({
      success: true,
      product
    });
  } catch (error) {
    console.error('Error fetching product:', error);
    res.status(500).json({
      error: 'Server error',
      details: error.message
    });
  }
};

// @desc    Update product
// @route   PUT /api/product/:id
// @access  Private/Admin
const updateProduct = async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id);

    if (!product) {
      return res.status(404).json({
        error: 'Product not found'
      });
    }

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
      isActive
    } = req.body;

    // Check if another product with the same name or SKU exists
    if (name || sku || barcode) {
      const whereClause = {
        id: { [Op.ne]: product.id },
        [Op.or]: []
      };

      if (name) whereClause[Op.or].push({ name });
      if (sku) whereClause[Op.or].push({ sku });
      if (barcode) whereClause[Op.or].push({ barcode });

      const existingProduct = await Product.findOne({
        where: whereClause
      });

      if (existingProduct) {
        return res.status(400).json({
          error: 'Another product with this name, SKU or barcode already exists'
        });
      }
    }

    const updatedProduct = await product.update({
      name: name || product.name,
      price: price || product.price,
      description: description || product.description,
      categoryId: categoryId || product.categoryId,
      stockQuantity: stockQuantity || product.stockQuantity,
      image: image || product.image,
      discountPrice: discountPrice !== undefined ? discountPrice : product.discountPrice,
      sku: sku || product.sku,
      serialNumber: serialNumber || product.serialNumber,
      barcode: barcode || product.barcode,
      brand: brand || product.brand,
      weight: weight || product.weight,
      dimensions: dimensions || product.dimensions,
      expirationDate: expirationDate || product.expirationDate,
      tags: tags ? tags.split(',').map(tag => tag.trim()) : product.tags,
      unitId: unitId || product.unitId,
      isActive: isActive !== undefined ? isActive : product.isActive
    });

    res.json({
      success: true,
      message: 'Product updated successfully',
      product: updatedProduct
    });
  } catch (error) {
    console.error('Error updating product:', error);
    res.status(500).json({
      error: 'Server error',
      details: error.message
    });
  }
};

// @desc    Delete product
// @route   DELETE /api/product/:id
// @access  Private/Admin
const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id);

    if (!product) {
      return res.status(404).json({
        error: 'Product not found'
      });
    }

    await product.destroy();

    res.json({
      success: true,
      message: 'Product removed'
    });
  } catch (error) {
    console.error('Error deleting product:', error);
    res.status(500).json({
      error: 'Server error',
      details: error.message
    });
  }
};

export {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct
};