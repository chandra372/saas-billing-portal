const express = require('express');
const { trackEvent, getAnalytics } = require('../controllers/analyticsController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/track', protect, trackEvent);
router.get('/', protect, getAnalytics);

module.exports = router;
