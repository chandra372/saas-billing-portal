const express = require('express');
const { getSubscriptionPlans, getUserSubscription, upgradeSubscription, cancelSubscription } = require('../controllers/billingController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/plans', getSubscriptionPlans);
router.get('/subscription', protect, getUserSubscription);
router.post('/upgrade', protect, upgradeSubscription);
router.post('/cancel', protect, cancelSubscription);

module.exports = router;