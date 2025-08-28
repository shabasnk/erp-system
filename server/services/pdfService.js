// //C:\coding\WEZ-ERP-APP\server\services\pdfService.js
// import PDFDocument from 'pdfkit';
// import fs from 'fs';
// import path from 'path';
// import { fileURLToPath } from 'url';

// const __dirname = path.dirname(fileURLToPath(import.meta.url));

// export const generateInvoicePDF = async (invoiceData, customer) => {
//   // ===== SAFETY CHECKS =====
//   const safeNumber = (value) => {
//     if (value === null || value === undefined) return 0;
//     const num = typeof value === 'string' ? parseFloat(value) : value;
//     return isNaN(num) ? 0 : num;
//   };

//   // Convert and validate all numeric values
//   const subtotal = safeNumber(invoiceData.subtotal);
//   const tax = safeNumber(invoiceData.tax);
//   const total = safeNumber(invoiceData.total);

//   // Debug log
//   console.log('PDF Input Verification:', {
//     subtotal: { value: subtotal, type: typeof subtotal },
//     tax: { value: tax, type: typeof tax },
//     total: { value: total, type: typeof total },
//     items: invoiceData.items.map(i => ({
//       price: { value: safeNumber(i.price), type: typeof i.price },
//       total: { value: safeNumber(i.total), type: typeof i.total }
//     }))
//   });

//   // ===== PDF GENERATION =====
//   const doc = new PDFDocument({ margin: 50 });
//   const fileName = `invoice_${invoiceData.invoiceNumber}.pdf`;
//   const filePath = path.join(__dirname, '../temp', fileName);
  
//   // Ensure temp directory exists
//   if (!fs.existsSync(path.dirname(filePath))) {
//     fs.mkdirSync(path.dirname(filePath), { recursive: true });
//   }

//   // PDF Generation
//   doc.pipe(fs.createWriteStream(filePath));

//   // Header
//   doc.fontSize(25).text('INVOICE', { align: 'center' });
//   doc.moveDown();
  
//   // Invoice Info
//   doc.fontSize(12)
//      .text(`Invoice #: ${invoiceData.invoiceNumber}`)
//      .text(`Date: ${new Date(invoiceData.createdAt).toLocaleDateString()}`)
//      .text(`Customer: ${customer.name}`)
//      .moveDown();

//   // Customer Info
//   doc.text(`Company: ${customer.companyName || 'N/A'}`)
//      .text(`Phone: ${customer.phone}`)
//      .text(`WhatsApp: ${customer.whatsappNumber || customer.phone}`)
//      .text(`GST: ${customer.gstNumber || 'N/A'}`)
//      .moveDown();

//   // Items Table Header
//   doc.font('Helvetica-Bold')
//      .text('Description', 50, 200)
//      .text('Price', 300, 200)
//      .text('Qty', 400, 200)
//      .text('Total', 450, 200);
//   doc.font('Helvetica');

//   // Items Table Rows
//   let y = 220;
//   invoiceData.items.forEach(item => {
//     const itemPrice = safeNumber(item.price);
//     const itemTotal = safeNumber(item.total);
    
//     doc.text(item.name, 50, y)
//        .text(`₹${itemPrice.toFixed(2)}`, 300, y)
//        .text(item.quantity.toString(), 400, y)
//        .text(`₹${itemTotal.toFixed(2)}`, 450, y);
//     y += 20;
//   });

//   // Totals
//   doc.moveTo(50, y + 20).lineTo(550, y + 20).stroke();
//   doc.font('Helvetica-Bold')
//      .text('SUBTOTAL:', 350, y + 30)
//      .text(`₹${subtotal.toFixed(2)}`, 450, y + 30)
//      .text('TAX:', 350, y + 50)
//      .text(`₹${tax.toFixed(2)}`, 450, y + 50)
//      .text('TOTAL:', 350, y + 70)
//      .text(`₹${total.toFixed(2)}`, 450, y + 70);

//   doc.end();

//   // Wait for PDF generation
//   return new Promise((resolve) => {
//     doc.on('finish', () => resolve(filePath));
//   });
// };















// server/services/pdfService.js
import PDFDocument from 'pdfkit';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const generateInvoicePDF = async (invoiceData) => {
  return new Promise((resolve, reject) => {
    try {
      // Create a document
      const doc = new PDFDocument({ margin: 50 });
      
      // Generate a filename
      const filename = `invoice_${invoiceData.invoiceNumber}.pdf`;
      const filePath = path.join(__dirname, '../temp', filename);
      
      // Ensure temp directory exists
      if (!fs.existsSync(path.dirname(filePath))) {
        fs.mkdirSync(path.dirname(filePath), { recursive: true });
      }
      
      // Pipe the PDF to a file
      const stream = fs.createWriteStream(filePath);
      doc.pipe(stream);
      
      // Add content to the PDF
      generateHeader(doc, invoiceData);
      generateCustomerInformation(doc, invoiceData);
      generateInvoiceTable(doc, invoiceData);
      generateFooter(doc);
      
      // Finalize the PDF
      doc.end();
      
      stream.on('finish', () => {
        resolve({ filePath, filename });
      });
      
      stream.on('error', (error) => {
        reject(error);
      });
    } catch (error) {
      reject(error);
    }
  });
};

function generateHeader(doc, invoice) {
  doc
    .fillColor('#444444')
    .fontSize(20)
    .text('INVOICE', 50, 50)
    .fontSize(10)
    .text(`Invoice Number: ${invoice.invoiceNumber}`, 50, 80)
    .text(`Invoice Date: ${new Date(invoice.createdAt).toLocaleDateString()}`, 50, 95)
    .moveDown();
}

function generateCustomerInformation(doc, invoice) {
  doc
    .fillColor('#444444')
    .fontSize(15)
    .text('Bill To:', 50, 150)
    .fontSize(10)
    .text(invoice.customerInfo.companyName, 50, 170)
    .text(invoice.customerInfo.name, 50, 185)
    .text(invoice.customerInfo.address, 50, 200)
    .text(`Phone: ${invoice.customerInfo.phone}`, 50, 215)
    .text(`Email: ${invoice.customerInfo.email}`, 50, 230);
    
  if (invoice.customerInfo.gstNumber) {
    doc.text(`GST Number: ${invoice.customerInfo.gstNumber}`, 50, 245);
  }
}

function generateInvoiceTable(doc, invoice) {
  let i;
  const invoiceTableTop = 300;
  
  // Table headers
  doc.fontSize(10);
  generateTableRow(
    doc,
    invoiceTableTop,
    'Item',
    'Unit Price',
    'Quantity',
    'Total'
  );
  
  // Table rows
  for (i = 0; i < invoice.items.length; i++) {
    const item = invoice.items[i];
    const position = invoiceTableTop + 25 + (i * 25);
    
    generateTableRow(
      doc,
      position,
      item.name,
      formatCurrency(item.discountPrice || item.price),
      item.quantity,
      formatCurrency((item.discountPrice || item.price) * item.quantity)
    );
  }
  
  // Summary
  const summaryTop = invoiceTableTop + 25 + (invoice.items.length * 25) + 20;
  
  doc
    .text(`Subtotal: ${formatCurrency(invoice.subtotal)}`, 400, summaryTop)
    .text(`GST (${invoice.customerInfo.gstPercentage}%): ${formatCurrency(invoice.tax)}`, 400, summaryTop + 15)
    .fontSize(12)
    .font('Helvetica-Bold')
    .text(`Total: ${formatCurrency(invoice.total)}`, 400, summaryTop + 40)
    .font('Helvetica');
}

function generateTableRow(doc, y, item, unitPrice, quantity, lineTotal) {
  doc
    .fontSize(10)
    .text(item, 50, y)
    .text(unitPrice, 280, y, { width: 90, align: 'right' })
    .text(quantity, 370, y, { width: 90, align: 'right' })
    .text(lineTotal, 0, y, { align: 'right' });
}

function generateFooter(doc) {
  doc
    .fontSize(10)
    .text('Thank you for your business!', 50, 700, {
      align: 'center',
      width: 500
    });
}

function formatCurrency(amount) {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(amount);
}