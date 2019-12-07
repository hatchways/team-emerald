/* eslint-disable no-param-reassign */
/* eslint-disable no-underscore-dangle */
const mongoose = require('mongoose');

const options = {
  timestamps: true,
};

const ListSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please enter a list name'],
    },
    coverUrl: {
      type: String,
      required: [true, 'Please add a cover URL'],
    },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: true,
    },
    products: {
      type: [mongoose.Schema.ObjectId],
      ref: 'Product',
    },
  },
  options,
);

// Removes unnecessary properties before converting the document
// to a JSON object
ListSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    // returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
    delete returnedObject.createdAt;
    delete returnedObject.updatedAt;
  },
});

module.exports = mongoose.model('List', ListSchema);
