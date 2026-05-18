const PDFDocument = require('pdfkit');
const fs = require('fs');
const path = require('path');
const Invoice = require('../models/Invoice');

const invoiceDir = path.join(__dirname, '../invoices');

// Create invoices directory if it doesn't exist
if (!fs.existsSync(invoiceDir)) {
  fs.mkdirSync(invoiceDir, { recursive: true });
}

const generateInvoicePDF = async (invoiceData) => {
  return new Promise((resolve, reject) => {
    const doc = new PDFDocument();
    const filename = `invoice-${invoiceData.invoiceNumber}.pdf`;
    const filepath = path.join(invoiceDir, filename);

    const stream = fs.createWriteStream(filepath);
    doc.pipe(stream);

    // Header
    doc.fontSize(20).font('Helvetica-Bold').text('INVOICE', 50, 50);
    doc.fontSize(10).font('Helvetica').text(`Invoice #: ${invoiceData.invoiceNumber}`, 50, 80);
    doc.text(`Issue Date: ${new Date(invoiceData.issueDate).toLocaleDateString()}`, 50, 95);
    doc.text(`Due Date: ${new Date(invoiceData.dueDate).toLocaleDateString()}`, 50, 110);

    // Company Info
    doc.fontSize(12).font('Helvetica-Bold').text('SaaS Billing Portal', 50, 150);
    doc.fontSize(10).font('Helvetica').text('support@saasbilling.com', 50, 165);

    // Customer Info
    doc.fontSize(12).font('Helvetica-Bold').text('Bill To:', 350, 150);
    doc.fontSize(10).font('Helvetica').text(invoiceData.customerName, 350, 165);
    doc.text(invoiceData.customerEmail, 350, 180);

    // Line Items Table
    const tableTop = 250;
    const col1 = 50;
    const col2 = 300;
    const col3 = 400;
    const col4 = 500;

    doc.fontSize(11).font('Helvetica-Bold');
    doc.text('Description', col1, tableTop);
    doc.text('Quantity', col2, tableTop);
    doc.text('Unit Price', col3, tableTop);
    doc.text('Total', col4, tableTop);

    let y = tableTop + 25;
    doc.fontSize(10).font('Helvetica');

    invoiceData.lineItems.forEach((item) => {
      doc.text(item.description, col1, y);
      doc.text(item.quantity.toString(), col2, y);
      doc.text(`$${item.unitPrice.toFixed(2)}`, col3, y);
      doc.text(`$${item.total.toFixed(2)}`, col4, y);
      y += 30;
    });

    // Total
    y += 20;
    doc.fontSize(12).font('Helvetica-Bold');
    doc.text(`Total: $${invoiceData.amount.toFixed(2)}`, col4 - 100, y);

    // Footer
    doc.fontSize(9).font('Helvetica').text(
      'Thank you for your business!',
      50,
      doc.page.height - 50,
      { align: 'center' }
    );

    stream.on('finish', () => {
      resolve(filepath);
    });

    stream.on('error', (error) => {
      reject(error);
    });

    doc.end();
  });
};

const createInvoice = async (invoiceData) => {
  try {
    const invoice = new Invoice(invoiceData);
    await invoice.save();

    const pdfPath = await generateInvoicePDF({
      ...invoiceData,
      invoiceNumber: invoice._id,
    });

    invoice.pdfUrl = `/invoices/${path.basename(pdfPath)}`;
    invoice.status = 'sent';
    await invoice.save();

    return invoice;
  } catch (error) {
    console.error('Invoice creation failed:', error);
    throw error;
  }
};

module.exports = {
  generateInvoicePDF,
  createInvoice,
};
