const express = require('express');
const { getInvoices, getInvoice, createInvoiceForSubscription } = require('../controllers/invoiceController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/', protect, getInvoices);
router.get('/:id', protect, getInvoice);
router.post('/', protect, createInvoiceForSubscription);

module.exports = router;
