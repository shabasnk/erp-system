// server/controller/pdfController.js
import { generateInvoicePDF } from '../services/pdfService.js';
import fs from 'fs';
import Invoice from '../models/invoiceModel.js';
import InvoiceItem from '../models/invoiceItemModel.js';
import Product from '../models/ProductModel.js';
import Customer from '../models/customerModel.js';

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
    
    // Set headers for download
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);
    
    // Stream the file
    const fileStream = fs.createReadStream(filePath);
    fileStream.pipe(res);
    
    // Clean up after streaming
    fileStream.on('close', () => {
      fs.unlinkSync(filePath);
    });
    
  } catch (error) {
    console.error('Error generating PDF:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to generate invoice PDF'
    });
  }
};