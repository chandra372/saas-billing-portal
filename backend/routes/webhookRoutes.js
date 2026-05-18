const express = require('express');
const { handleStripeWebhook } = require('../controllers/webhookController');

const router = express.Router();

// Webhook endpoint for Stripe
router.post('/stripe', handleStripeWebhook);

module.exports = router;
