// // server/services/pdfService.js
// import PDFDocument from 'pdfkit';
// import fs from 'fs';
// import path from 'path';
// import { fileURLToPath } from 'url';

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// export const generateInvoicePDF = async (invoiceData) => {
//   return new Promise((resolve, reject) => {
//     try {
//       // Create a document
//       const doc = new PDFDocument({ margin: 50 });
      
//       // Generate a filename
//       const filename = `invoice_${invoiceData.invoiceNumber}.pdf`;
//       const filePath = path.join(__dirname, '../temp', filename);
      
//       // Ensure temp directory exists
//       if (!fs.existsSync(path.dirname(filePath))) {
//         fs.mkdirSync(path.dirname(filePath), { recursive: true });
//       }
      
//       // Pipe the PDF to a file
//       const stream = fs.createWriteStream(filePath);
//       doc.pipe(stream);
      
//       // Add content to the PDF
//       generateHeader(doc, invoiceData);
//       generateCustomerInformation(doc, invoiceData);
//       generateInvoiceTable(doc, invoiceData);
//       generateFooter(doc);
      
//       // Finalize the PDF
//       doc.end();
      
//       stream.on('finish', () => {
//         resolve({ filePath, filename });
//       });
      
//       stream.on('error', (error) => {
//         reject(error);
//       });
//     } catch (error) {
//       reject(error);
//     }
//   });
// };

// function generateHeader(doc, invoice) {
//   doc
//     .fillColor('#444444')
//     .fontSize(20)
//     .text('INVOICE', 50, 50)
//     .fontSize(10)
//     .text(`Invoice Number: ${invoice.invoiceNumber}`, 50, 80)
//     .text(`Invoice Date: ${new Date(invoice.createdAt).toLocaleDateString()}`, 50, 95)
//     .moveDown();
// }

// function generateCustomerInformation(doc, invoice) {
//   doc
//     .fillColor('#444444')
//     .fontSize(15)
//     .text('Bill To:', 50, 150)
//     .fontSize(10)
//     .text(invoice.customerInfo.companyName, 50, 170)
//     .text(invoice.customerInfo.name, 50, 185)
//     .text(invoice.customerInfo.address, 50, 200)
//     .text(`Phone: ${invoice.customerInfo.phone}`, 50, 215)
//     .text(`Email: ${invoice.customerInfo.email}`, 50, 230);
    
//   if (invoice.customerInfo.gstNumber) {
//     doc.text(`GST Number: ${invoice.customerInfo.gstNumber}`, 50, 245);
//   }
// }

// function generateInvoiceTable(doc, invoice) {
//   let i;
//   const invoiceTableTop = 300;
  
//   // Table headers
//   doc.fontSize(10);
//   generateTableRow(
//     doc,
//     invoiceTableTop,
//     'Item',
//     'Unit Price',
//     'Quantity',
//     'Total'
//   );
  
//   // Table rows
//   for (i = 0; i < invoice.items.length; i++) {
//     const item = invoice.items[i];
//     const position = invoiceTableTop + 25 + (i * 25);
    
//     generateTableRow(
//       doc,
//       position,
//       item.name,
//       formatCurrency(item.discountPrice || item.price),
//       item.quantity,
//       formatCurrency((item.discountPrice || item.price) * item.quantity)
//     );
//   }
  
//   // Summary
//   const summaryTop = invoiceTableTop + 25 + (invoice.items.length * 25) + 20;
  
//   doc
//     .text(`Subtotal: ${formatCurrency(invoice.subtotal)}`, 400, summaryTop)
//     .text(`GST (${invoice.customerInfo.gstPercentage}%): ${formatCurrency(invoice.tax)}`, 400, summaryTop + 15)
//     .fontSize(12)
//     .font('Helvetica-Bold')
//     .text(`Total: ${formatCurrency(invoice.total)}`, 400, summaryTop + 40)
//     .font('Helvetica');
// }

// function generateTableRow(doc, y, item, unitPrice, quantity, lineTotal) {
//   doc
//     .fontSize(10)
//     .text(item, 50, y)
//     .text(unitPrice, 280, y, { width: 90, align: 'right' })
//     .text(quantity, 370, y, { width: 90, align: 'right' })
//     .text(lineTotal, 0, y, { align: 'right' });
// }

// function generateFooter(doc) {
//   doc
//     .fontSize(10)
//     .text('Thank you for your business!', 50, 700, {
//       align: 'center',
//       width: 500
//     });
// }

// function formatCurrency(amount) {
//   return new Intl.NumberFormat('en-IN', {
//     style: 'currency',
//     currency: 'INR',
//     minimumFractionDigits: 2,
//     maximumFractionDigits: 2
//   }).format(amount);
// }





















// server/services/pdfService.js
import puppeteer from 'puppeteer';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export const generateInvoicePDF = async (invoiceData) => {
  let browser = null;
  try {
    browser = await puppeteer.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    
    const page = await browser.newPage();
    
    // Generate HTML content
    const htmlContent = generateInvoiceHTML(invoiceData);
    
    // Set content and wait for rendering
    await page.setContent(htmlContent, { waitUntil: 'networkidle0' });
    
    // Set proper PDF options
    const pdfOptions = {
      path: `invoice_${invoiceData.invoiceNumber}.pdf`,
      format: 'A4',
      printBackground: true,
      margin: {
        top: '20mm',
        right: '15mm',
        bottom: '20mm',
        left: '15mm'
      },
      preferCSSPageSize: true
    };
    
    const pdfBuffer = await page.pdf(pdfOptions);
    
    // Save to temporary file
    const filename = `invoice_${invoiceData.invoiceNumber}_${Date.now()}.pdf`;
    const filePath = path.join(__dirname, '../temp', filename);
    
    // Ensure temp directory exists
    if (!fs.existsSync(path.dirname(filePath))) {
      fs.mkdirSync(path.dirname(filePath), { recursive: true });
    }
    
    fs.writeFileSync(filePath, pdfBuffer);
    
    return { filePath, filename };
    
  } catch (error) {
    console.error('PDF generation error:', error);
    throw error;
  } finally {
    if (browser) {
      await browser.close();
    }
  }
};

const generateInvoiceHTML = (invoiceData) => {
  return `
  <!DOCTYPE html>
  <html>
  <head>
    <meta charset="UTF-8">
    <title>Invoice ${invoiceData.invoiceNumber}</title>
    <style>
      body {
        font-family: 'Arial', sans-serif;
        margin: 0;
        padding: 20px;
        color: #333;
        line-height: 1.6;
      }
      
      .invoice-container {
        max-width: 800px;
        margin: 0 auto;
        padding: 30px;
        border: 1px solid #ddd;
        border-radius: 8px;
        background: white;
      }
      
      .header {
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
        margin-bottom: 30px;
        padding-bottom: 20px;
        border-bottom: 2px solid #e74c3c;
      }
      
      .company-info {
        flex: 1;
      }
      
      .invoice-info {
        text-align: right;
        flex: 1;
      }
      
      h1 {
        color: #e74c3c;
        margin: 0 0 10px 0;
        font-size: 28px;
      }
      
      h2 {
        color: #2c3e50;
        margin: 20px 0 10px 0;
        font-size: 18px;
        border-bottom: 1px solid #eee;
        padding-bottom: 5px;
      }
      
      .customer-details, .invoice-details {
        margin-bottom: 30px;
      }
      
      .details-grid {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 20px;
        margin-bottom: 20px;
      }
      
      .detail-item {
        margin-bottom: 8px;
      }
      
      .detail-label {
        font-weight: bold;
        color: #555;
        margin-right: 8px;
      }
      
      table {
        width: 100%;
        border-collapse: collapse;
        margin: 20px 0;
      }
      
      th {
        background-color: #f8f9fa;
        padding: 12px;
        text-align: left;
        border-bottom: 2px solid #ddd;
        font-weight: bold;
      }
      
      td {
        padding: 12px;
        border-bottom: 1px solid #eee;
      }
      
      .text-right {
        text-align: right;
      }
      
      .text-center {
        text-align: center;
      }
      
      .totals {
        margin-top: 30px;
        width: 100%;
      }
      
      .total-row {
        display: flex;
        justify-content: space-between;
        padding: 8px 0;
        border-bottom: 1px solid #eee;
      }
      
      .total-row:last-child {
        border-bottom: 2px solid #2c3e50;
        font-weight: bold;
        font-size: 18px;
      }
      
      .footer {
        margin-top: 50px;
        text-align: center;
        color: #777;
        font-size: 14px;
        border-top: 1px solid #ddd;
        padding-top: 20px;
      }
      
      .signature {
        margin-top: 60px;
        border-top: 1px solid #000;
        width: 200px;
        text-align: center;
        padding-top: 10px;
      }
      
      @media print {
        body {
          padding: 0;
        }
        
        .invoice-container {
          border: none;
          padding: 0;
        }
      }
    </style>
  </head>
  <body>
    <div class="invoice-container">
      <div class="header">
        <div class="company-info">
          <h1>WEZ STORE</h1>
          <p>Your Trusted Shopping Partner</p>
          <p>📍 Store Address, City, State</p>
          <p>📞 +91 XXXXXXXXXX</p>
          <p>📧 info@wezstore.com</p>
        </div>
        
        <div class="invoice-info">
          <h1>INVOICE</h1>
          <p><strong>Invoice No:</strong> ${invoiceData.invoiceNumber}</p>
          <p><strong>Date:</strong> ${new Date(invoiceData.createdAt).toLocaleDateString()}</p>
        </div>
      </div>
      
      <div class="details-grid">
        <div class="customer-details">
          <h2>Bill To:</h2>
          <p><strong>${invoiceData.customerInfo.companyName || invoiceData.customerInfo.name}</strong></p>
          <p>${invoiceData.customerInfo.name}</p>
          <p>📞 ${invoiceData.customerInfo.phone}</p>
          ${invoiceData.customerInfo.email ? `<p>📧 ${invoiceData.customerInfo.email}</p>` : ''}
          <p>${invoiceData.customerInfo.address}</p>
          ${invoiceData.customerInfo.gstNumber ? `<p><strong>GSTIN:</strong> ${invoiceData.customerInfo.gstNumber}</p>` : ''}
        </div>
        
        <div class="invoice-details">
          <h2>Invoice Details:</h2>
          <p><strong>Payment Method:</strong> ${invoiceData.paymentMethod.toUpperCase()}</p>
          <p><strong>Invoice Date:</strong> ${new Date(invoiceData.createdAt).toLocaleDateString()}</p>
          ${invoiceData.customerInfo.gstNumber ? `<p><strong>GST %:</strong> ${invoiceData.customerInfo.gstPercentage}%</p>` : ''}
        </div>
      </div>
      
      <h2>Items</h2>
      <table>
        <thead>
          <tr>
            <th>Item</th>
            <th>Price</th>
            <th>Qty</th>
            <th class="text-right">Amount</th>
          </tr>
        </thead>
        <tbody>
          ${invoiceData.items.map(item => `
            <tr>
              <td>${item.name}</td>
              <td>₹${(item.discountPrice || item.price).toFixed(2)}</td>
              <td>${item.quantity}</td>
              <td class="text-right">₹${item.total.toFixed(2)}</td>
            </tr>
          `).join('')}
        </tbody>
      </table>
      
      <div class="totals">
        <div class="total-row">
          <span>Subtotal:</span>
          <span>₹${invoiceData.subtotal.toFixed(2)}</span>
        </div>
        ${invoiceData.tax > 0 ? `
        <div class="total-row">
          <span>GST (${invoiceData.customerInfo.gstPercentage}%):</span>
          <span>₹${invoiceData.tax.toFixed(2)}</span>
        </div>
        ` : ''}
        <div class="total-row">
          <span><strong>Total Amount:</strong></span>
          <span><strong>₹${invoiceData.total.toFixed(2)}</strong></span>
        </div>
      </div>
      
      <div class="footer">
        <p>Thank you for your business!</p>
        <p>Terms: Payment due upon receipt</p>
        <p>WEZ STORE - Quality Products, Best Prices</p>
        
        <div style="margin-top: 40px;">
          <div class="signature">
            <p>Authorized Signature</p>
          </div>
        </div>
      </div>
    </div>
  </body>
  </html>
  `;
};
