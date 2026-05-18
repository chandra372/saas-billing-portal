const Subscription = require('../models/Subscription');
const User = require('../models/User');
const AnalyticsEvent = require('../models/AnalyticsEvent');

const getSubscriptionPlans = (req, res) => {
  const plans = [
    {
      id: 'starter',
      name: 'Starter',
      price: 29,
      features: {
        apiCallsLimit: 10000,
        storageLimit: 10,
        teamMembers: 1,
        supportLevel: 'email',
      },
    },
    {
      id: 'professional',
      name: 'Professional',
      price: 99,
      features: {
        apiCallsLimit: 100000,
        storageLimit: 100,
        teamMembers: 5,
        supportLevel: 'priority',
      },
    },
    {
      id: 'enterprise',
      name: 'Enterprise',
      price: 299,
      features: {
        apiCallsLimit: Infinity,
        storageLimit: Infinity,
        teamMembers: Infinity,
        supportLevel: '24/7',
      },
    },
  ];
  res.json(plans);
};

const getUserSubscription = async (req, res) => {
  try {
    const subscription = await Subscription.findOne({ user: req.user.userId });
    if (!subscription) {
      return res.status(404).json({ message: 'No subscription found' });
    }
    res.json(subscription);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const upgradeSubscription = async (req, res) => {
  try {
    const { plan, billingCycle } = req.body;
    const { userId } = req.user;

    let subscription = await Subscription.findOne({ user: userId });

    if (!subscription) {
      subscription = new Subscription({
        user: userId,
        plan,
        billingCycle,
        status: 'active',
        startDate: new Date(),
        renewalDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
      });
    } else {
      subscription.plan = plan;
      subscription.billingCycle = billingCycle;
    }

    const planDetails = {
      starter: { price: 29, limit: 10000, storage: 10 },
      professional: { price: 99, limit: 100000, storage: 100 },
      enterprise: { price: 299, limit: Infinity, storage: Infinity },
    };

    const details = planDetails[plan];
    subscription.pricePerMonth = details.price;
    subscription.features = {
      apiCallsLimit: details.limit,
      storageLimit: details.storage,
      teamMembers: plan === 'starter' ? 1 : plan === 'professional' ? 5 : Infinity,
      supportLevel: plan === 'starter' ? 'email' : plan === 'professional' ? 'priority' : '24/7',
    };

    await subscription.save();

    const user = await User.findById(userId);
    user.currentPlan = plan;
    user.subscriptionStatus = 'active';
    await user.save();

    res.json(subscription);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const cancelSubscription = async (req, res) => {
  try {
    const subscription = await Subscription.findOne({ user: req.user.userId });
    if (!subscription) {
      return res.status(404).json({ message: 'Subscription not found' });
    }

    subscription.status = 'cancelled';
    subscription.endDate = new Date();
    await subscription.save();

    const user = await User.findById(req.user.userId);
    user.subscriptionStatus = 'cancelled';
    await user.save();

    res.json({ message: 'Subscription cancelled' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getSubscriptionPlans,
  getUserSubscription,
  upgradeSubscription,
  cancelSubscription,
};