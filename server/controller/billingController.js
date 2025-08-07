// controller/billingController.js
import Product from '../models/ProductModel.js';
import { Op } from 'sequelize';
import Invoice from '../models/invoiceModel.js';
import InvoiceItem from '../models/invoiceItemModel.js';
import sequelize from '../connect/connect.js';
import Customer from '../models/customerModel.js';
// import { generateInvoicePDF } from '../services/pdfService.js';
// import WhatsAppService from '../services/whatsappService.js';



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
  console.log("Starting invoice creation");
  
  let transaction;
  try {
    transaction = await sequelize.transaction();
    const invoiceNumber = `INV-${Date.now()}-${Math.floor(Math.random() * 1000)}`;

    const { products, customerId, paymentMethod, total, gstPercentage } = req.body;
    
    // Validate required fields
    if (!products || !Array.isArray(products) || products.length === 0) {
      await transaction.rollback();
      return res.status(400).json({
        success: false,
        message: 'Products array with at least one item is required'
      });
    }

    if (!customerId) {
      await transaction.rollback();
      return res.status(400).json({
        success: false,
        message: 'Customer ID is required'
      });
    }

    if (!paymentMethod || !['cash', 'card', 'upi', 'bank_transfer'].includes(paymentMethod)) {
      await transaction.rollback();
      return res.status(400).json({
        success: false,
        message: 'Valid payment method is required'
      });
    }

    // Validate product data
    for (const item of products) {
      if (!item.id || !item.quantity || item.quantity < 1) {
        await transaction.rollback();
        return res.status(400).json({
          success: false,
          message: 'Invalid product data - missing ID or quantity'
        });
      }
      
      if (typeof item.price !== 'number' || item.price < 0) {
        await transaction.rollback();
        return res.status(400).json({
          success: false,
          message: 'Invalid product price'
        });
      }
      
      if (item.discountPrice && (typeof item.discountPrice !== 'number' || item.discountPrice < 0)) {
        await transaction.rollback();
        return res.status(400).json({
          success: false,
          message: 'Invalid discount price'
        });
      }
    }

    // Calculate and validate totals
    // Calculate and validate totals
const subtotal = parseFloat(products.reduce((sum, item) => {
  const price = item.discountPrice || item.price;
  return sum + (price * item.quantity);
}, 0).toFixed(2));

const gstAmount = gstPercentage 
  ? parseFloat(((subtotal * parseFloat(gstPercentage))) / 100).toFixed(2)
  : 0;

const calculatedTotal = parseFloat((subtotal + gstAmount).toFixed(2));

    if (Math.abs(calculatedTotal - total) > 0.01) {
      await transaction.rollback();
      return res.status(400).json({
        success: false,
        message: 'Total amount mismatch'
      });
    }

    // Check product availability and update inventory
    for (const item of products) {
      const product = await Product.findByPk(item.id, { transaction });
      if (!product) {
        await transaction.rollback();
        return res.status(400).json({
          success: false,
          message: `Product with ID ${item.id} not found`
        });
      }

      if (product.stockQuantity < item.quantity) {
        await transaction.rollback();
        return res.status(400).json({
          success: false,
          message: `Insufficient stock for product ${product.name}`
        });
      }

      // Update product stock
      product.stockQuantity -= item.quantity;
      await product.save({ transaction });
    }

    // Create invoice
    const invoice = await Invoice.create({
      invoiceNumber,
      customerId,
      subtotal,
      tax: gstAmount,
      total: calculatedTotal,
      paymentMethod,
      status: 'completed',
      gstPercentage: gstPercentage || null
    }, { transaction });

    // Create invoice items
    const invoiceItems = await Promise.all(
      products.map(async item => {
        const product = await Product.findByPk(item.id, { transaction });
        return InvoiceItem.create({
          invoiceId: invoice.id,
          productId: item.id,
          quantity: item.quantity,
          unitPrice: item.discountPrice || item.price,
          totalPrice: (item.discountPrice || item.price) * item.quantity,
          productName: product.name // Store product name for reference
        }, { transaction });
      })
    );

    // Fetch customer details for the response
    const customer = await Customer.findByPk(customerId, { transaction });
    if (!customer) {
      await transaction.rollback();
      return res.status(400).json({
        success: false,
        message: 'Customer not found'
      });
    }

    await transaction.commit();

    // Format response to match frontend expectations
    const responseData = {
      success: true,
      message: 'Invoice created successfully',
      invoice: {
        id: invoice.id,
        invoiceNumber: invoice.invoiceNumber,
        subtotal,
        tax: gstAmount,
        total: calculatedTotal,
        items: await Promise.all(products.map(async (item) => {
          const product = await Product.findByPk(item.id);
          return {
            id: item.id,
            name: product.name,
            price: item.price,
            discountPrice: item.discountPrice || null,
            quantity: item.quantity,
            total: (item.discountPrice || item.price) * item.quantity
          };
        })),
        customerInfo: {
          companyName: customer.companyName,
          name: customer.name,
          phone: customer.phone,
          email: customer.email,
          address: customer.address,
          gstNumber: customer.gstNumber,
          gstPercentage: gstPercentage || customer.gstPercentage || "0",
          useSameAsPhone: customer.whatsappNumber === customer.phone
        },
        paymentMethod,
        createdAt: invoice.createdAt
      }
    };

    console.log("Invoice created successfully:", invoice.id);
    res.status(201).json(responseData);

  } catch (error) {
    console.error('Error creating invoice:', error);
    
    if (transaction) {
      await transaction.rollback();
    }
    
    if (error.name === 'SequelizeValidationError') {
      console.error('Validation errors:', error.errors);
      return res.status(400).json({
        success: false,
        message: 'Validation error',
        errors: error.errors.map(err => err.message)
      });
    }

    if (error.name === 'SequelizeDatabaseError') {
      console.error('Database error:', error);
      return res.status(500).json({
        success: false,
        message: 'Database error occurred'
      });
    }

    res.status(500).json({
      success: false,
      message: 'Failed to create invoice',
      error: error.message
    });
  }
};

















// // green api second trial 
// // controller/billingController.js
// import Product from '../models/ProductModel.js';
// import { Op } from 'sequelize';
// import Invoice from '../models/invoiceModel.js';
// import InvoiceItem from '../models/invoiceItemModel.js';
// import sequelize from '../connect/connect.js';
// import Customer from '../models/customerModel.js';
// import WhatsAppService from '../services/whatsappService.js';
// import { generateInvoicePDF } from '../services/pdfService.js';
// import { formatCurrency } from '../utils.js';
// import fs from 'fs';
// // import { formatCurrency, calculateSubtotal, calculateGst } from './utils.js';
// // import { generateInvoicePDF } from '../services/pdfService.js';
// // import WhatsAppService from '../services/whatsappService.js';



// export const searchProducts = async (req, res) => {
//     console.log("under search products");
    
//   try {

//     console.log("under Try");
    
//     const { query } = req.query;

//     console.log("query:",query);
    
    
//     if (!query || query.length < 2) {
//       return res.status(400).json({ 
//         success: false,
//         message: 'Search query must be at least 2 characters long'
//       });
//     }

//     const products = await Product.findAll({
//       where: {
//         name: {
//           [Op.iLike]: `%${query}%`
//         },
//         isActive: true
//       },
//       limit: 10,
//       attributes: ['id', 'name', 'price', 'description', 'discountPrice']
//     });

//     res.status(200).json({
//       success: true,
//       products
//     });
//   } catch (error) {
//     console.error('Error searching products:', error);
//     res.status(500).json({
//       success: false,
//       message: 'Internal server error'
//     });
//   }
// };





// export const createInvoice = async (req, res) => {
//   console.log("Starting invoice creation process");
  
//   let transaction;
//   try {
//     transaction = await sequelize.transaction();
//     const invoiceNumber = `INV-${Date.now()}-${Math.floor(Math.random() * 1000)}`;

//     const { products, customerId, paymentMethod, total, gstPercentage } = req.body;
    
//     // ===== VALIDATION =====
//     if (!products || !Array.isArray(products) || products.length === 0) {
//       await transaction.rollback();
//       return res.status(400).json({
//         success: false,
//         message: 'Products array with at least one item is required'
//       });
//     }

//     if (!customerId) {
//       await transaction.rollback();
//       return res.status(400).json({
//         success: false,
//         message: 'Customer ID is required'
//       });
//     }

//     if (!paymentMethod || !['cash', 'card', 'upi', 'bank_transfer'].includes(paymentMethod)) {
//       await transaction.rollback();
//       return res.status(400).json({
//         success: false,
//         message: 'Valid payment method is required'
//       });
//     }

//     // ===== PRODUCT VALIDATION =====
//     const productValidationErrors = [];
//     for (const item of products) {
//       if (!item.id || !item.quantity || item.quantity < 1) {
//         productValidationErrors.push(`Invalid product data for item ${item.id || 'unknown'}`);
//       }
      
//       const product = await Product.findByPk(item.id, { transaction });
//       if (!product) {
//         productValidationErrors.push(`Product ${item.id} not found`);
//       } else if (product.stockQuantity < item.quantity) {
//         productValidationErrors.push(`Insufficient stock for ${product.name}`);
//       }
//     }

//     if (productValidationErrors.length > 0) {
//       await transaction.rollback();
//       return res.status(400).json({
//         success: false,
//         message: 'Product validation failed',
//         errors: productValidationErrors
//       });
//     }

//     // ===== CALCULATIONS =====
//     const subtotal = parseFloat(products.reduce((sum, item) => {
//       const price = item.discountPrice || item.price;
//       return sum + (price * item.quantity);
//     }, 0).toFixed(2));

//     const gstAmount = gstPercentage 
//       ? parseFloat((subtotal * parseFloat(gstPercentage) / 100).toFixed(2))
//       : 0;

//     const calculatedTotal = parseFloat((subtotal + gstAmount).toFixed(2));

//     if (Math.abs(calculatedTotal - total) > 0.01) {
//       await transaction.rollback();
//       return res.status(400).json({
//         success: false,
//         message: `Total amount mismatch (sent: ${total}, calculated: ${calculatedTotal})`
//       });
//     }

//     // ===== INVENTORY UPDATE =====
//     for (const item of products) {
//       const product = await Product.findByPk(item.id, { transaction });
//       product.stockQuantity -= item.quantity;
//       await product.save({ transaction });
//     }

//     // ===== INVOICE CREATION =====
//     const invoice = await Invoice.create({
//       invoiceNumber,
//       customerId,
//       subtotal,
//       tax: gstAmount,
//       total: calculatedTotal,
//       paymentMethod,
//       status: 'completed',
//       gstPercentage: gstPercentage || null
//     }, { transaction });

//     // ===== INVOICE ITEMS =====
//     const invoiceItems = await Promise.all(
//       products.map(async item => {
//         const product = await Product.findByPk(item.id, { transaction });
//         return InvoiceItem.create({
//           invoiceId: invoice.id,
//           productId: item.id,
//           quantity: item.quantity,
//           unitPrice: item.discountPrice || item.price,
//           totalPrice: (item.discountPrice || item.price) * item.quantity,
//           productName: product.name
//         }, { transaction });
//       })
//     );

//     // ===== CUSTOMER DETAILS =====
//     const customer = await Customer.findByPk(customerId, { transaction });
//     if (!customer) {
//       await transaction.rollback();
//       return res.status(400).json({
//         success: false,
//         message: 'Customer not found'
//       });
//     }

//     await transaction.commit();

//     // ===== RESPONSE FORMATTING =====
//     const responseData = {
//       success: true,
//       message: 'Invoice created successfully',
//       invoice: {
//         id: invoice.id,
//         invoiceNumber: invoice.invoiceNumber,
//         subtotal,
//         tax: gstAmount,
//         total: calculatedTotal,
//         items: await Promise.all(products.map(async (item) => {
//           const product = await Product.findByPk(item.id);
//           return {
//             id: item.id,
//             name: product.name,
//             price: item.price,
//             discountPrice: item.discountPrice || null,
//             quantity: item.quantity,
//             total: (item.discountPrice || item.price) * item.quantity
//           };
//         })),
//         customerInfo: {
//           companyName: customer.companyName,
//           name: customer.name,
//           phone: customer.phone,
//           email: customer.email,
//           address: customer.address,
//           gstNumber: customer.gstNumber,
//           gstPercentage: gstPercentage || customer.gstPercentage || "0",
//           useSameAsPhone: customer.whatsappNumber === customer.phone
//         },
//         paymentMethod,
//         createdAt: invoice.createdAt
//       }
//     };

//     // ===== WHATSAPP INTEGRATION =====
//     try {
//       console.log('Starting WhatsApp integration...');
      
//       // 1. Generate PDF
//       const pdfPath = await generateInvoicePDF(responseData.invoice, customer);
//       console.log('PDF generated successfully:', {
//         path: pdfPath,
//         exists: fs.existsSync(pdfPath),
//         size: `${(fs.statSync(pdfPath).size / 1024)} KB`
//       });

//       // 2. Prepare WhatsApp service
//       const whatsappService = new WhatsAppService();
//       console.log('WhatsApp service initialized with instance:', whatsappService.config.idInstance);

//       // 3. Determine recipient
//       const recipientNumber = customer.whatsappNumber || customer.phone;
//       console.log('Attempting to send to:', recipientNumber);

//       // 4. Send via WhatsApp
//       const result = await whatsappService.sendFile(
//         recipientNumber,
//         pdfPath,
//         `Invoice #${invoice.invoiceNumber}\nAmount: ₹${calculatedTotal.toFixed(2)}`
//       );

//       console.log('WhatsApp delivery result:', {
//         success: result.success,
//         messageId: result.data?.idMessage || 'N/A'
//       });

//       // 5. Cleanup
//       fs.unlink(pdfPath, (err) => {
//         if (err) console.error('PDF cleanup error:', err);
//         else console.log('Temporary PDF removed successfully');
//       });

//     } catch (whatsappError) {
//       console.error('WhatsApp integration failed:', {
//         error: whatsappError.message,
//         stack: whatsappError.stack,
//         response: whatsappError.response?.data
//       });
//       // Continue with success response even if WhatsApp fails
//     }

//     console.log("Invoice created successfully:", invoice.id);
//     return res.status(201).json(responseData);

//   } catch (error) {
//     console.error('Invoice creation failed:', {
//       error: error.message,
//       stack: error.stack,
//       validationErrors: error.errors
//     });

//     if (transaction) {
//       await transaction.rollback();
//       console.log('Database transaction rolled back');
//     }

//     const errorResponse = {
//       success: false,
//       message: 'Failed to create invoice',
//       error: error.message
//     };

//     if (error.name === 'SequelizeValidationError') {
//       errorResponse.message = 'Validation error';
//       errorResponse.errors = error.errors.map(err => ({
//         field: err.path,
//         message: err.message
//       }));
//       return res.status(400).json(errorResponse);
//     }

//     if (error.name === 'SequelizeDatabaseError') {
//       errorResponse.message = 'Database error occurred';
//       return res.status(500).json(errorResponse);
//     }

//     return res.status(500).json(errorResponse);
//   }
// };