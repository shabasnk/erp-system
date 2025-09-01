// controller/billingController.js
import Product from "../models/ProductModel.js";
import { Op } from "sequelize";
import Invoice from "../models/invoiceModel.js";
import InvoiceItem from "../models/invoiceItemModel.js";
import sequelize from "../connect/connect.js";
import Customer from "../models/customerModel.js";
// import { generateInvoicePDF } from '../services/pdfService.js';
// import WhatsAppService from '../services/whatsappService.js';

export const searchProducts = async (req, res) => {

  try {

    const { query } = req.query;


    if (!query || query.length < 2) {
      return res.status(400).json({
        success: false,
        message: "Search query must be at least 2 characters long",
      });
    }

    const products = await Product.findAll({
      where: {
        name: {
          [Op.iLike]: `%${query}%`,
        },
        isActive: true,
      },
      limit: 10,
      attributes: ["id", "name", "price", "description", "discountPrice"],
    });

    res.status(200).json({
      success: true,
      products,
    });
  } catch (error) {
    console.error("Error searching products:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const createInvoice = async (req, res) => {
  console.log("Starting invoice creation");

  let transaction;
  try {
    transaction = await sequelize.transaction();
    const invoiceNumber = `INV-${Date.now()}-${Math.floor(
      Math.random() * 1000
    )}`;

    const { products, customerId, paymentMethod, total, gstPercentage } =
      req.body;

    // Validate required fields
    if (!products || !Array.isArray(products) || products.length === 0) {
      await transaction.rollback();
      return res.status(400).json({
        success: false,
        message: "Products array with at least one item is required",
      });
    }

    if (!customerId) {
      await transaction.rollback();
      return res.status(400).json({
        success: false,
        message: "Customer ID is required",
      });
    }

    if (
      !paymentMethod ||
      !["cash", "card", "upi", "bank_transfer"].includes(paymentMethod)
    ) {
      await transaction.rollback();
      return res.status(400).json({
        success: false,
        message: "Valid payment method is required",
      });
    }

    // Validate product data
    for (const item of products) {
      if (!item.id || !item.quantity || item.quantity < 1) {
        await transaction.rollback();
        return res.status(400).json({
          success: false,
          message: "Invalid product data - missing ID or quantity",
        });
      }

      // Ensure price and discountPrice are parsed as numbers
      const price = parseFloat(item.price);
      const discountPrice = item.discountPrice
        ? parseFloat(item.discountPrice)
        : null;

      if (isNaN(price) || price < 0) {
        await transaction.rollback();
        return res.status(400).json({
          success: false,
          message: "Invalid product price",
        });
      }

      if (
        discountPrice !== null &&
        (isNaN(discountPrice) || discountPrice < 0)
      ) {
        await transaction.rollback();
        return res.status(400).json({
          success: false,
          message: "Invalid discount price",
        });
      }

      // Ensure price and discountPrice logic
      if (discountPrice !== null && discountPrice >= price) {
        await transaction.rollback();
        return res.status(400).json({
          success: false,
          message: "Discount price cannot be higher than price",
        });
      }
    }

    // Calculate and validate totals
    const subtotal = products.reduce((sum, item) => {
      const price = parseFloat(item.discountPrice || item.price); // Ensure price is a number
      if (isNaN(price)) {
        return sum; // Skip if price is invalid (not a number)
      }
      return sum + price * item.quantity;
    }, 0);

    // Ensure gstAmount is parsed as a number
    const gstAmount = gstPercentage
      ? parseFloat(((subtotal * parseFloat(gstPercentage)) / 100).toFixed(2))
      : 0;

    // Ensure calculatedTotal is a number and handle decimal precision
    const calculatedTotal = parseFloat((subtotal + gstAmount).toFixed(2));

    // Validate total
    if (Math.abs(calculatedTotal - total) > 0.01) {
      await transaction.rollback();
      return res.status(400).json({
        success: false,
        message: "Total amount mismatch",
      });
    }

    console.log("Subtotal:", subtotal);
    console.log("GST Amount:", gstAmount);
    console.log("Calculated Total:", calculatedTotal);

    // Check product availability and update inventory
    for (const item of products) {
      const product = await Product.findByPk(item.id, { transaction });
      if (!product) {
        await transaction.rollback();
        return res.status(400).json({
          success: false,
          message: `Product with ID ${item.id} not found`,
        });
      }

      if (product.stockQuantity < item.quantity) {
        await transaction.rollback();
        return res.status(400).json({
          success: false,
          message: `Insufficient stock for product ${product.name}`,
        });
      }

      // Update product stock
      product.stockQuantity -= item.quantity;
      await product.save({ transaction });
    }

    // Create invoice
    const invoice = await Invoice.create(
      {
        invoiceNumber,
        customerId,
        subtotal,
        tax: gstAmount,
        total: calculatedTotal,
        paymentMethod,
        status: "completed",
        gstPercentage: gstPercentage || null,
      },
      { transaction }
    );

    // Create invoice items
    const invoiceItems = await Promise.all(
      products.map(async (item) => {
        const product = await Product.findByPk(item.id, { transaction });
        return InvoiceItem.create(
          {
            invoiceId: invoice.id,
            productId: item.id,
            quantity: item.quantity,
            unitPrice: item.discountPrice || item.price,
            totalPrice: (item.discountPrice || item.price) * item.quantity,
            productName: product.name, // Store product name for reference
          },
          { transaction }
        );
      })
    );

    // Fetch customer details for the response
    const customer = await Customer.findByPk(customerId, { transaction });
    if (!customer) {
      await transaction.rollback();
      return res.status(400).json({
        success: false,
        message: "Customer not found",
      });
    }

    await transaction.commit();

    // Format response to match frontend expectations
    const responseData = {
      success: true,
      message: "Invoice created successfully",
      invoice: {
        id: invoice.id,
        invoiceNumber: invoice.invoiceNumber,
        subtotal,
        tax: gstAmount,
        total: calculatedTotal,
        items: await Promise.all(
          products.map(async (item) => {
            const product = await Product.findByPk(item.id);
            return {
              id: item.id,
              name: product.name,
              price: item.price,
              discountPrice: item.discountPrice || null,
              quantity: item.quantity,
              total: (item.discountPrice || item.price) * item.quantity,
            };
          })
        ),
        customerInfo: {
          companyName: customer.companyName,
          name: customer.name,
          phone: customer.phone,
          email: customer.email,
          address: customer.address,
          gstNumber: customer.gstNumber,
          gstPercentage: gstPercentage || customer.gstPercentage || "0",
          useSameAsPhone: customer.whatsappNumber === customer.phone,
        },
        paymentMethod,
        createdAt: invoice.createdAt,
      },
    };

    console.log("Invoice created successfully:", invoice.id);
    res.status(201).json(responseData);
  } catch (error) {
    console.error("Error creating invoice:", error);

    if (transaction) {
      await transaction.rollback();
    }

    if (error.name === "SequelizeValidationError") {
      console.error("Validation errors:", error.errors);
      return res.status(400).json({
        success: false,
        message: "Validation error",
        errors: error.errors.map((err) => err.message),
      });
    }

    if (error.name === "SequelizeDatabaseError") {
      console.error("Database error:", error);
      return res.status(500).json({
        success: false,
        message: "Database error occurred",
      });
    }

    res.status(500).json({
      success: false,
      message: "Failed to create invoice",
      error: error.message,
    });
  }
};
