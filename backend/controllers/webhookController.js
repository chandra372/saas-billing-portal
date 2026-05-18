const Stripe = require('stripe');
const Subscription = require('../models/Subscription');
const Invoice = require('../models/Invoice');
const User = require('../models/User');

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const handleStripeWebhook = async (req, res) => {
  const sig = req.headers['stripe-signature'];
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  let event;

  try {
    event = stripe.webhooks.constructEvent(req.rawBody, sig, webhookSecret);
  } catch (error) {
    console.error('Webhook verification failed:', error.message);
    return res.status(400).send(`Webhook Error: ${error.message}`);
  }

  try {
    switch (event.type) {
      case 'invoice.payment_succeeded':
        await handleInvoicePaymentSucceeded(event.data.object);
        break;
      case 'invoice.payment_failed':
        await handleInvoicePaymentFailed(event.data.object);
        break;
      case 'customer.subscription.deleted':
        await handleSubscriptionDeleted(event.data.object);
        break;
      case 'customer.subscription.updated':
        await handleSubscriptionUpdated(event.data.object);
        break;
      default:
        console.log(`Unhandled event type: ${event.type}`);
    }

    res.json({ received: true });
  } catch (error) {
    console.error('Webhook handling error:', error);
    res.status(500).json({ error: 'Webhook handler failed' });
  }
};

const handleInvoicePaymentSucceeded = async (stripeInvoice) => {
  try {
    const invoice = await Invoice.findOne({ stripeInvoiceId: stripeInvoice.id });
    if (invoice) {
      invoice.status = 'paid';
      invoice.paidDate = new Date();
      await invoice.save();
    }
  } catch (error) {
    console.error('Error handling invoice payment succeeded:', error);
  }
};

const handleInvoicePaymentFailed = async (stripeInvoice) => {
  try {
    const invoice = await Invoice.findOne({ stripeInvoiceId: stripeInvoice.id });
    if (invoice) {
      invoice.status = 'failed';
      await invoice.save();
    }
  } catch (error) {
    console.error('Error handling invoice payment failed:', error);
  }
};

const handleSubscriptionDeleted = async (stripeSubscription) => {
  try {
    const subscription = await Subscription.findOne({ stripeSubscriptionId: stripeSubscription.id });
    if (subscription) {
      subscription.status = 'cancelled';
      subscription.endDate = new Date();
      await subscription.save();

      const user = await User.findById(subscription.user);
      if (user) {
        user.subscriptionStatus = 'cancelled';
        await user.save();
      }
    }
  } catch (error) {
    console.error('Error handling subscription deleted:', error);
  }
};

const handleSubscriptionUpdated = async (stripeSubscription) => {
  try {
    const subscription = await Subscription.findOne({ stripeSubscriptionId: stripeSubscription.id });
    if (subscription) {
      subscription.status = stripeSubscription.status === 'active' ? 'active' : 'paused';
      await subscription.save();
    }
  } catch (error) {
    console.error('Error handling subscription updated:', error);
  }
};

module.exports = {
  handleStripeWebhook,
};
