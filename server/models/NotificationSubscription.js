const mongoose = require('mongoose');

const notificationSubscriptionSchema = new mongoose.Schema({
  endpoint: {
    type: String,
    required: true,
  },
  expirationTime: {
    type: Number,
    required: false,
  },
  keys: {
    p256dh: {
      type: String,
      required: true,
    },
    auth: {
      type: String,
      required: true,
    },
  },
});

module.exports = mongoose.model('NotificationSubscription', notificationSubscriptionSchema);