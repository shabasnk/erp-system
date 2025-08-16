//C:\coding\WEZ-ERP-APP\server\services\pdfService.js
import PDFDocument from 'pdfkit';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export const generateInvoicePDF = async (invoiceData, customer) => {
  // ===== SAFETY CHECKS =====
  const safeNumber = (value) => {
    if (value === null || value === undefined) return 0;
    const num = typeof value === 'string' ? parseFloat(value) : value;
    return isNaN(num) ? 0 : num;
  };

  // Convert and validate all numeric values
  const subtotal = safeNumber(invoiceData.subtotal);
  const tax = safeNumber(invoiceData.tax);
  const total = safeNumber(invoiceData.total);

  // Debug log
  console.log('PDF Input Verification:', {
    subtotal: { value: subtotal, type: typeof subtotal },
    tax: { value: tax, type: typeof tax },
    total: { value: total, type: typeof total },
    items: invoiceData.items.map(i => ({
      price: { value: safeNumber(i.price), type: typeof i.price },
      total: { value: safeNumber(i.total), type: typeof i.total }
    }))
  });

  // ===== PDF GENERATION =====
  const doc = new PDFDocument({ margin: 50 });
  const fileName = `invoice_${invoiceData.invoiceNumber}.pdf`;
  const filePath = path.join(__dirname, '../temp', fileName);
  
  // Ensure temp directory exists
  if (!fs.existsSync(path.dirname(filePath))) {
    fs.mkdirSync(path.dirname(filePath), { recursive: true });
  }

  // PDF Generation
  doc.pipe(fs.createWriteStream(filePath));

  // Header
  doc.fontSize(25).text('INVOICE', { align: 'center' });
  doc.moveDown();
  
  // Invoice Info
  doc.fontSize(12)
     .text(`Invoice #: ${invoiceData.invoiceNumber}`)
     .text(`Date: ${new Date(invoiceData.createdAt).toLocaleDateString()}`)
     .text(`Customer: ${customer.name}`)
     .moveDown();

  // Customer Info
  doc.text(`Company: ${customer.companyName || 'N/A'}`)
     .text(`Phone: ${customer.phone}`)
     .text(`WhatsApp: ${customer.whatsappNumber || customer.phone}`)
     .text(`GST: ${customer.gstNumber || 'N/A'}`)
     .moveDown();

  // Items Table Header
  doc.font('Helvetica-Bold')
     .text('Description', 50, 200)
     .text('Price', 300, 200)
     .text('Qty', 400, 200)
     .text('Total', 450, 200);
  doc.font('Helvetica');

  // Items Table Rows
  let y = 220;
  invoiceData.items.forEach(item => {
    const itemPrice = safeNumber(item.price);
    const itemTotal = safeNumber(item.total);
    
    doc.text(item.name, 50, y)
       .text(`₹${itemPrice.toFixed(2)}`, 300, y)
       .text(item.quantity.toString(), 400, y)
       .text(`₹${itemTotal.toFixed(2)}`, 450, y);
    y += 20;
  });

  // Totals
  doc.moveTo(50, y + 20).lineTo(550, y + 20).stroke();
  doc.font('Helvetica-Bold')
     .text('SUBTOTAL:', 350, y + 30)
     .text(`₹${subtotal.toFixed(2)}`, 450, y + 30)
     .text('TAX:', 350, y + 50)
     .text(`₹${tax.toFixed(2)}`, 450, y + 50)
     .text('TOTAL:', 350, y + 70)
     .text(`₹${total.toFixed(2)}`, 450, y + 70);

  doc.end();

  // Wait for PDF generation
  return new Promise((resolve) => {
    doc.on('finish', () => resolve(filePath));
  });
};