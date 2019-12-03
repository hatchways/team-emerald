const mongoose = require('mongoose');

const options = {
  timestamps: true,
};

const NotificationSchema = mongoose.Schema({
  viewed: Boolean,
  userId: {
    type: [mongoose.Schema.ObjectId],
    ref: 'User',
  },
  productId: {
    type: [mongoose.Schema.ObjectId],
    ref: 'Product',
  },
  previousPrice: Number,
  currentPrice: Number,
  options,
});

module.exports = mongoose.model('Notification', NotificationSchema);
