const mongoose = require('mongoose');

const subscriptionSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    plan: {
      type: String,
      enum: ['starter', 'professional', 'enterprise'],
      required: true,
    },
    status: {
      type: String,
      enum: ['active', 'cancelled', 'past_due', 'paused'],
      default: 'active',
    },
    stripeSubscriptionId: String,
    pricePerMonth: Number,
    billingCycle: {
      type: String,
      enum: ['monthly', 'yearly'],
      default: 'monthly',
    },
    startDate: Date,
    endDate: Date,
    renewalDate: Date,
    features: {
      apiCallsLimit: Number,
      storageLimit: Number,
      teamMembers: Number,
      supportLevel: String,
    },
    autoRenew: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Subscription', subscriptionSchema);