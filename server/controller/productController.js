// import Product from "../models/ProductModel.js";
// import { Op } from "sequelize";

// // @desc    Get all products
// // @route   GET /api/product/product
// // @access  Private/Admin
// const getProducts = async (req, res) => {
//   try {
//     const products = await Product.findAll();
//     res.status(200).json({
//       success: true,
//       products,
//     });
//   } catch (error) {
//     console.error("Error fetching products:", error);
//     res.status(500).json({
//       success: false,
//       message: "Server error",
//       details: error.message,
//     });
//   }
// };

// // @desc    Create a new product
// // @route   POST /api/product/product
// // @access  Private/Admin

// // Add this new function to your productController.js
// // @desc    Check if a field value is unique
// // @route   GET /api/product/check-unique
// // @access  Public
// const checkUniqueField = async (req, res) => {
//   try {
//     const { field, value } = req.query;

//     if (!value) {
//       return res.json({ exists: false });
//     }

//     // List of allowed fields to check
//     const allowedFields = ["sku", "serialNumber", "barcode"];

//     if (!allowedFields.includes(field)) {
//       return res.status(400).json({
//         error: "Invalid field",
//         message: `Can only check uniqueness for: ${allowedFields.join(", ")}`,
//       });
//     }

//     const product = await Product.findOne({
//       where: {
//         [field]: value,
//       },
//     });

//     res.json({
//       exists: !!product,
//       field,
//       value,
//     });
//   } catch (error) {
//     console.error("Error checking unique field:", error);
//     res.status(500).json({
//       error: "Server error",
//       details: error.message,
//     });
//   }
// };

// const toNumber = (v) =>
//   v === null || v === undefined || v === "" ? null : Number(v);

// const badReq = (res, msg) =>
//   res.status(400).json({ success: false, error: "Bad Request", message: msg });

// const createProduct = async (req, res) => {
//   try {
//     if (!req.user) {
//       return res.status(401).json({
//         success: false,
//         error: "Authentication required",
//         message: "No user information found in request",
//       });
//     }

//     const {
//       name,
//       price,
//       description,
//       categoryId,
//       stockQuantity,
//       image,
//       discountPrice,
//       sku,
//       serialNumber,
//       barcode,
//       brand,
//       weight,
//       dimensions,
//       expirationDate,
//       tags,
//       unitId,
//     } = req.body;

//     // --- basic presence checks
//     if (!name?.trim()) return badReq(res, "Product name is required");
//     if (!image?.trim()) return badReq(res, "Image URL is required");

//     // --- numeric coercion
//     const nPrice = toNumber(price);
//     const nDiscount = toNumber(discountPrice);
//     const nCategoryId = toNumber(categoryId);
//     const nUnitId = toNumber(unitId);
//     const nStock = toNumber(stockQuantity);
//     const nWeight = toNumber(weight);
//     console.log({ nPrice, nDiscount, nCategoryId, nUnitId, nStock, nWeight });
//     // --- numeric validation
//     if (!Number.isFinite(nPrice) || nPrice <= 0)
//       return badReq(res, "Invalid price");
//     if (nDiscount !== null) {
//       if (!Number.isFinite(nDiscount) || nDiscount < 0 || nDiscount >= nPrice) {
//         return badReq(res, "Invalid discountPrice");
//       }
//     }
//     if (!Number.isInteger(nCategoryId) || nCategoryId <= 0)
//       return badReq(res, "Invalid categoryId");
//     if (!Number.isInteger(nUnitId) || nUnitId <= 0)
//       return badReq(res, "Invalid unitId");
//     if (!Number.isInteger(nStock) || nStock < 0)
//       return badReq(res, "Invalid stockQuantity");

//     // server-side caps to avoid INT overflow elsewhere
//     if (nUnitId > 2_147_483_647) return badReq(res, "unitId is too large");
//     if (nCategoryId > 2_147_483_647)
//       return badReq(res, "categoryId is too large");
//     if (nStock > 2_147_483_647)
//       return badReq(res, "stockQuantity is too large");

//     if (nWeight !== null && (!Number.isFinite(nWeight) || nWeight <= 0)) {
//       return badReq(res, "Invalid weight");
//     }

//     // --- tags normalization
//     const normTags = Array.isArray(tags)
//       ? tags.map((t) => String(t).trim()).filter(Boolean)
//       : typeof tags === "string"
//       ? tags
//           .split(",")
//           .map((t) => t.trim())
//           .filter(Boolean)
//       : [];

//     // --- uniqueness check
//     const whereClause = { [Op.or]: [{ name }] };
//     if (sku) whereClause[Op.or].push({ sku });
//     if (barcode) whereClause[Op.or].push({ barcode });

//     const existing = await Product.findOne({ where: whereClause });
//     if (existing) {
//       let conflictField = "name";
//       if (sku && existing.sku === sku) conflictField = "SKU";
//       if (barcode && existing.barcode === barcode) conflictField = "barcode";
//       return res
//         .status(409)
//         .json({
//           success: false,
//           error: `Product with this ${conflictField} already exists`,
//         });
//     }

//     // --- create
//     const product = await Product.create({
//       name: name.trim(),
//       price: nPrice, // DECIMAL in DB
//       discountPrice: nDiscount ?? null,
//       description: description ?? null,
//       categoryId: nCategoryId,
//       stockQuantity: nStock,
//       image: image.trim(),
//       sku: sku?.trim() || null,
//       serialNumber: serialNumber?.trim() || null,
//       barcode: barcode?.trim() || null,
//       brand: brand?.trim() || null,
//       weight: nWeight ?? null,
//       dimensions: dimensions?.trim() || null,
//       expirationDate: expirationDate || null,
//       tags: normTags,
//       unitId: nUnitId,
//       isActive: true,
//     });

//     res
//       .status(201)
//       .json({
//         success: true,
//         message: "Product created successfully",
//         product,
//       });
//   } catch (error) {
//     console.error("Error creating product:", error);

//     // JWT
//     if (error?.name === "JsonWebTokenError") {
//       return res
//         .status(401)
//         .json({
//           success: false,
//           error: "Authentication failed",
//           message: "Invalid token",
//         });
//     }

//     // Surface useful DB detail if available
//     if (error?.name === "SequelizeDatabaseError") {
//       return res.status(400).json({
//         success: false,
//         error: "Database error",
//         details: error.message,
//       });
//     }

//     res
//       .status(500)
//       .json({ success: false, error: "Server error", details: error.message });
//   }
// };

// export { createProduct, checkUniqueField, getProducts };
















// fr solving aftr the issue shpownr based rprtmngment
// controller/productController.js
import Product from "../models/ProductModel.js";
import { Op } from "sequelize";

// @desc    Get all products for the authenticated shop
// @route   GET /api/product/product
// @access  Private/ShopOwner
const getProducts = async (req, res) => {
  try {
    // Extract shopId from authenticated user
    const shopId = req.user.shopId;
    
    if (!shopId) {
      return res.status(400).json({
        success: false,
        message: 'Shop ID is required',
      });
    }

    // Only fetch products for this specific shop
    const products = await Product.findAll({
      where: {
        shopId: shopId
      },
      order: [['createdAt', 'DESC']] // Optional: order by creation date
    });
    
    res.status(200).json({
      success: true,
      products,
    });
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
      details: error.message,
    });
  }
};

// @desc    Create a new product for the authenticated shop
// @route   POST /api/product/product
// @access  Private/ShopOwner
const createProduct = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        error: "Authentication required",
        message: "No user information found in request",
      });
    }

    // Extract shopId from authenticated user
    const shopId = req.user.shopId;
    
    if (!shopId) {
      return res.status(400).json({
        success: false,
        message: 'Shop ID is required',
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
    } = req.body;

    // --- basic presence checks
    if (!name?.trim()) return badReq(res, "Product name is required");
    if (!image?.trim()) return badReq(res, "Image URL is required");

    // --- numeric coercion
    const nPrice = toNumber(price);
    const nDiscount = toNumber(discountPrice);
    const nCategoryId = toNumber(categoryId);
    const nUnitId = toNumber(unitId);
    const nStock = toNumber(stockQuantity);
    const nWeight = toNumber(weight);

    // --- numeric validation
    if (!Number.isFinite(nPrice) || nPrice <= 0)
      return badReq(res, "Invalid price");
    if (nDiscount !== null) {
      if (!Number.isFinite(nDiscount) || nDiscount < 0 || nDiscount >= nPrice) {
        return badReq(res, "Invalid discountPrice");
      }
    }
    if (!Number.isInteger(nCategoryId) || nCategoryId <= 0)
      return badReq(res, "Invalid categoryId");
    if (!Number.isInteger(nUnitId) || nUnitId <= 0)
      return badReq(res, "Invalid unitId");
    if (!Number.isInteger(nStock) || nStock < 0)
      return badReq(res, "Invalid stockQuantity");

    // server-side caps to avoid INT overflow elsewhere
    if (nUnitId > 2_147_483_647) return badReq(res, "unitId is too large");
    if (nCategoryId > 2_147_483_647)
      return badReq(res, "categoryId is too large");
    if (nStock > 2_147_483_647)
      return badReq(res, "stockQuantity is too large");

    if (nWeight !== null && (!Number.isFinite(nWeight) || nWeight <= 0)) {
      return badReq(res, "Invalid weight");
    }

    // --- tags normalization
    const normTags = Array.isArray(tags)
      ? tags.map((t) => String(t).trim()).filter(Boolean)
      : typeof tags === "string"
      ? tags
          .split(",")
          .map((t) => t.trim())
          .filter(Boolean)
      : [];

    // --- uniqueness check - include shopId to ensure uniqueness within the same shop
    const whereClause = { 
      [Op.or]: [],
      shopId: shopId // Only check uniqueness within this shop
    };
    
    if (name) whereClause[Op.or].push({ name });
    if (sku) whereClause[Op.or].push({ sku });
    if (barcode) whereClause[Op.or].push({ barcode });
    if (serialNumber) whereClause[Op.or].push({ serialNumber });

    // Only check if we have criteria
    if (whereClause[Op.or].length > 0) {
      const existing = await Product.findOne({ where: whereClause });
      if (existing) {
        let conflictField = "name";
        if (sku && existing.sku === sku) conflictField = "SKU";
        if (barcode && existing.barcode === barcode) conflictField = "barcode";
        if (serialNumber && existing.serialNumber === serialNumber) conflictField = "serial number";
        
        return res.status(409).json({
          success: false,
          error: `Product with this ${conflictField} already exists in your shop`,
        });
      }
    }

    // --- create product with shopId
    const product = await Product.create({
      name: name.trim(),
      price: nPrice,
      discountPrice: nDiscount ?? null,
      description: description ?? null,
      categoryId: nCategoryId,
      stockQuantity: nStock,
      image: image.trim(),
      sku: sku?.trim() || null,
      serialNumber: serialNumber?.trim() || null,
      barcode: barcode?.trim() || null,
      brand: brand?.trim() || null,
      weight: nWeight ?? null,
      dimensions: dimensions?.trim() || null,
      expirationDate: expirationDate || null,
      tags: normTags,
      unitId: nUnitId,
      isActive: true,
      shopId: shopId // Add shopId here
    });

    res.status(201).json({
      success: true,
      message: "Product created successfully",
      product,
    });
  } catch (error) {
    console.error("Error creating product:", error);

    // JWT errors
    if (error?.name === "JsonWebTokenError") {
      return res.status(401).json({
        success: false,
        error: "Authentication failed",
        message: "Invalid token",
      });
    }

    // Sequelize validation errors
    if (error?.name === "SequelizeValidationError") {
      return res.status(400).json({
        success: false,
        error: "Validation error",
        details: error.errors.map(err => err.message),
      });
    }

    // Database errors
    if (error?.name === "SequelizeDatabaseError") {
      return res.status(400).json({
        success: false,
        error: "Database error",
        details: error.message,
      });
    }

    // Unique constraint errors
    if (error?.name === "SequelizeUniqueConstraintError") {
      return res.status(409).json({
        success: false,
        error: "Duplicate entry",
        message: "A product with these details already exists in your shop",
      });
    }

    res.status(500).json({
      success: false,
      error: "Server error",
      details: error.message,
    });
  }
};

// @desc    Check if a field value is unique within the shop
// @route   GET /api/product/check-unique
// @access  Private/ShopOwner
const checkUniqueField = async (req, res) => {
  try {
    const { field, value } = req.query;
    const shopId = req.user.shopId;

    if (!shopId) {
      return res.status(400).json({
        error: "Shop ID required",
        message: "Authentication required",
      });
    }

    if (!value) {
      return res.json({ exists: false });
    }

    // List of allowed fields to check
    const allowedFields = ["sku", "serialNumber", "barcode", "name"];

    if (!allowedFields.includes(field)) {
      return res.status(400).json({
        error: "Invalid field",
        message: `Can only check uniqueness for: ${allowedFields.join(", ")}`,
      });
    }

    const product = await Product.findOne({
      where: {
        [field]: value,
        shopId: shopId // Check uniqueness within the same shop
      },
    });

    res.json({
      exists: !!product,
      field,
      value,
      shopId,
    });
  } catch (error) {
    console.error("Error checking unique field:", error);
    res.status(500).json({
      error: "Server error",
      details: error.message,
    });
  }
};

// Utility functions
const toNumber = (v) =>
  v === null || v === undefined || v === "" ? null : Number(v);

const badReq = (res, msg) =>
  res.status(400).json({ success: false, error: "Bad Request", message: msg });

export { createProduct, checkUniqueField, getProducts };