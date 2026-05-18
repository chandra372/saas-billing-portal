const Invoice = require('../models/Invoice');
const Subscription = require('../models/Subscription');
const { createInvoice } = require('../services/invoiceService');
const { sendInvoice } = require('../services/emailService');

const getInvoices = async (req, res) => {
  try {
    const { userId } = req.user;
    const invoices = await Invoice.find({ user: userId }).sort({ issueDate: -1 });
    res.json(invoices);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getInvoice = async (req, res) => {
  try {
    const invoice = await Invoice.findById(req.params.id);
    if (!invoice) {
      return res.status(404).json({ message: 'Invoice not found' });
    }
    res.json(invoice);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createInvoiceForSubscription = async (req, res) => {
  try {
    const { subscriptionId, amount, description } = req.body;
    const { userId } = req.user;

    const subscription = await Subscription.findById(subscriptionId);
    if (!subscription || subscription.user.toString() !== userId) {
      return res.status(404).json({ message: 'Subscription not found' });
    }

    const invoiceNumber = `INV-${Date.now()}`;
    const invoiceData = {
      invoiceNumber,
      user: userId,
      subscription: subscriptionId,
      amount,
      description,
      issueDate: new Date(),
      dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
      lineItems: [
        {
          description: description || subscription.plan,
          quantity: 1,
          unitPrice: amount,
          total: amount,
        },
      ],
      status: 'draft',
    };

    const invoice = await createInvoice(invoiceData);
    await sendInvoice(req.user.email, invoiceNumber, invoice.pdfUrl);

    res.status(201).json(invoice);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getInvoices,
  getInvoice,
  createInvoiceForSubscription,
};
