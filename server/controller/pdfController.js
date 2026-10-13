// // server/controller/pdfController.js
// import { generateInvoicePDF } from '../services/pdfService.js';
// import fs from 'fs';
// import Invoice from '../models/invoiceModel.js';
// import InvoiceItem from '../models/invoiceItemModel.js';
// import Product from '../models/ProductModel.js';
// import Customer from '../models/customerModel.js';

// export const downloadInvoice = async (req, res) => {
//   try {
//     const { invoiceId } = req.params;
    
//     // Fetch invoice data from database
//     const invoice = await Invoice.findByPk(invoiceId, {
//       include: [
//         {
//           model: InvoiceItem,
//           include: [Product]
//         },
//         {
//           model: Customer
//         }
//       ]
//     });
    
//     if (!invoice) {
//       return res.status(404).json({
//         success: false,
//         message: 'Invoice not found'
//       });
//     }
    
//     // Format invoice data for PDF generation
//     const invoiceData = {
//       id: invoice.id,
//       invoiceNumber: invoice.invoiceNumber,
//       subtotal: parseFloat(invoice.subtotal),
//       tax: parseFloat(invoice.tax),
//       total: parseFloat(invoice.total),
//       items: invoice.InvoiceItems.map(item => ({
//         id: item.Product.id,
//         name: item.Product.name,
//         price: parseFloat(item.Product.price),
//         discountPrice: item.Product.discountPrice ? parseFloat(item.Product.discountPrice) : null,
//         quantity: item.quantity,
//         total: parseFloat(item.totalPrice)
//       })),
//       customerInfo: {
//         companyName: invoice.Customer.companyName,
//         name: invoice.Customer.name,
//         phone: invoice.Customer.phone,
//         email: invoice.Customer.email,
//         address: invoice.Customer.address,
//         gstNumber: invoice.Customer.gstNumber,
//         gstPercentage: invoice.gstPercentage || invoice.Customer.gstPercentage || "0"
//       },
//       paymentMethod: invoice.paymentMethod,
//       createdAt: invoice.createdAt
//     };
    
//     // Generate PDF
//     const { filePath, filename } = await generateInvoicePDF(invoiceData);
    
//     // Set headers for download
//     res.setHeader('Content-Type', 'application/pdf');
//     res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);
    
//     // Stream the file
//     const fileStream = fs.createReadStream(filePath);
//     fileStream.pipe(res);
    
//     // Clean up after streaming
//     fileStream.on('close', () => {
//       fs.unlinkSync(filePath);
//     });
    
//   } catch (error) {
//     console.error('Error generating PDF:', error);
//     res.status(500).json({
//       success: false,
//       message: 'Failed to generate invoice PDF'
//     });
//   }
// };








// // controller/pdfController.js
// import { generateInvoicePDF } from '../services/pdfService.js';
// import Invoice from '../models/invoiceModel.js';
// import InvoiceItem from '../models/invoiceItemModel.js';
// import Customer from '../models/customerModel.js';
// import Product from '../models/ProductModel.js';

// export const downloadInvoice = async (req, res) => {
//   try {
//     const { invoiceId } = req.params;
    
//     // Fetch invoice with related data
//     const invoice = await Invoice.findByPk(invoiceId, {
//       include: [
//         {
//           model: InvoiceItem,
//           include: [Product]
//         },
//         {
//           model: Customer
//         }
//       ]
//     });
    
//     if (!invoice) {
//       return res.status(404).json({
//         success: false,
//         message: 'Invoice not found'
//       });
//     }
    
//     // Format data for PDF generation
//     const invoiceData = {
//       invoiceNumber: invoice.invoiceNumber,
//       createdAt: invoice.createdAt,
//       subtotal: invoice.subtotal,
//       tax: invoice.tax,
//       total: invoice.total,
//       paymentMethod: invoice.paymentMethod,
//       customerInfo: {
//         companyName: invoice.Customer.companyName,
//         name: invoice.Customer.name,
//         phone: invoice.Customer.phone,
//         email: invoice.Customer.email,
//         address: invoice.Customer.address,
//         gstNumber: invoice.Customer.gstNumber,
//         gstPercentage: invoice.gstPercentage || "0"
//       },
//       items: invoice.InvoiceItems.map(item => ({
//         id: item.id,
//         name: item.Product.name,
//         price: item.unitPrice,
//         quantity: item.quantity,
//         discountPrice: null // Add logic if you have discount prices stored
//       }))
//     };
    
//     // Generate PDF
//     const { filePath, filename } = await generateInvoicePDF(invoiceData);
    
//     // Set headers for download
//     res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);
//     res.setHeader('Content-Type', 'application/pdf');
    
//     // Stream the file
//     const fileStream = fs.createReadStream(filePath);
//     fileStream.pipe(res);
    
//     // Clean up the temporary file after sending
//     fileStream.on('close', () => {
//       fs.unlinkSync(filePath);
//     });
    
//   } catch (error) {
//     console.error('Error generating invoice PDF:', error);
//     res.status(500).json({
//       success: false,
//       message: 'Failed to generate invoice PDF'
//     });
//   }
// };








// server/controller/pdfController.js
import { generateInvoicePDF } from '../services/pdfService.js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import Invoice from '../models/invoiceModel.js';
import InvoiceItem from '../models/invoiceItemModel.js';
import Product from '../models/ProductModel.js';
import Customer from '../models/customerModel.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export const downloadInvoice = async (req, res) => {
  try {
    const { invoiceId } = req.params;
    
    // Fetch invoice data from database
    const invoice = await Invoice.findByPk(invoiceId, {
      include: [
        {
          model: InvoiceItem,
          include: [Product]
        },
        {
          model: Customer
        }
      ]
    });
    
    if (!invoice) {
      return res.status(404).json({
        success: false,
        message: 'Invoice not found'
      });
    }
    
    // Format invoice data for PDF generation
    const invoiceData = {
      id: invoice.id,
      invoiceNumber: invoice.invoiceNumber,
      subtotal: parseFloat(invoice.subtotal),
      tax: parseFloat(invoice.tax),
      total: parseFloat(invoice.total),
      items: invoice.InvoiceItems.map(item => ({
        id: item.Product.id,
        name: item.Product.name,
        price: parseFloat(item.Product.price),
        discountPrice: item.Product.discountPrice ? parseFloat(item.Product.discountPrice) : null,
        quantity: item.quantity,
        total: parseFloat(item.totalPrice)
      })),
      customerInfo: {
        companyName: invoice.Customer.companyName,
        name: invoice.Customer.name,
        phone: invoice.Customer.phone,
        email: invoice.Customer.email,
        address: invoice.Customer.address,
        gstNumber: invoice.Customer.gstNumber,
        gstPercentage: invoice.gstPercentage || invoice.Customer.gstPercentage || "0"
      },
      paymentMethod: invoice.paymentMethod,
      createdAt: invoice.createdAt
    };
    
    // Generate PDF
    const { filePath, filename } = await generateInvoicePDF(invoiceData);
    
    // Set proper headers
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);
    res.setHeader('Content-Length', fs.statSync(filePath).size);
    
    // Stream the file with error handling
    const fileStream = fs.createReadStream(filePath);
    
    fileStream.on('error', (error) => {
      console.error('File stream error:', error);
      res.status(500).json({
        success: false,
        message: 'Error streaming PDF file'
      });
    });
    
    fileStream.pipe(res);
    
    // Clean up after streaming
    res.on('finish', () => {
      try {
        if (fs.existsSync(filePath)) {
          fs.unlinkSync(filePath);
        }
      } catch (cleanupError) {
        console.error('Cleanup error:', cleanupError);
      }
    });
    
  } catch (error) {
    console.error('Error generating PDF:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to generate invoice PDF',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};