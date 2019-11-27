const mongoose = require('mongoose');

const options = {
  timestamps: true,
};

const ListSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please enter a list name'],
  },
  coverUrl: {
    type: String,
    required: [true, 'Please add a cover URL'],
  },
  UserId: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: [true],
  },
  products: {
    type: [mongoose.Schema.ObjectId],
    ref: 'Product',
    required: [true],
  },
  options,
});

module.exports = mongoose.model('List', ListSchema);
