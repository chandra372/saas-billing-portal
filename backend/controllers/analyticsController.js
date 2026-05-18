const AnalyticsEvent = require('../models/AnalyticsEvent');

const trackEvent = async (req, res) => {
  try {
    const { eventType, metadata } = req.body;
    const { userId } = req.user;

    const event = new AnalyticsEvent({
      user: userId,
      eventType,
      metadata,
      timestamp: new Date(),
    });

    await event.save();
    res.status(201).json({ message: 'Event tracked' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getAnalytics = async (req, res) => {
  try {
    const { userId } = req.user;
    const { startDate, endDate } = req.query;

    const query = { user: userId };
    if (startDate && endDate) {
      query.timestamp = {
        $gte: new Date(startDate),
        $lte: new Date(endDate),
      };
    }

    const events = await AnalyticsEvent.find(query).sort({ timestamp: -1 });

    // Calculate statistics
    const stats = {
      totalEvents: events.length,
      eventsByType: {},
      dailyEvents: {},
    };

    events.forEach((event) => {
      stats.eventsByType[event.eventType] = (stats.eventsByType[event.eventType] || 0) + 1;

      const date = event.timestamp.toISOString().split('T')[0];
      stats.dailyEvents[date] = (stats.dailyEvents[date] || 0) + 1;
    });

    res.json({ events, stats });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  trackEvent,
  getAnalytics,
};
