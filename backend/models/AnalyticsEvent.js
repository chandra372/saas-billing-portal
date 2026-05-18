const mongoose = require('mongoose');

const analyticsEventSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    team: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Team',
    },
    eventType: {
      type: String,
      enum: ['api_call', 'storage_used', 'login', 'export', 'upload'],
      required: true,
    },
    metadata: {
      apiEndpoint: String,
      dataSize: Number,
      duration: Number,
      status: String,
    },
    timestamp: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

analyticsEventSchema.index({ user: 1, timestamp: -1 });
analyticsEventSchema.index({ team: 1, timestamp: -1 });

module.exports = mongoose.model('AnalyticsEvent', analyticsEventSchema);
