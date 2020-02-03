/* eslint-disable no-param-reassign */
/* eslint-disable no-underscore-dangle */
const mongoose = require('mongoose');

const options = {
  timestamps: true,
};

const ProductSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please add the product name'],
    },
    link: {
      type: String,
      required: [true, 'Please add the product link'],
    },
    imageUrl: {
      type: String,
      default: '',
    },
    currentPrice: {
      type: Number,
      required: [true, `Please add the product's current price`],
    },
    previousPrice: {
      type: Number,
    },
    lists: {
      type: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'List',
        },
      ],
    },
  },
  options,
);

// Removes unnecessary properties before converting
//  the document to a JSON object
ProductSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
    delete returnedObject.createdAt;
    delete returnedObject.updatedAt;
  },
});

module.exports = mongoose.model('Product', ProductSchema);
