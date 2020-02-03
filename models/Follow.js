/* eslint-disable no-param-reassign, no-underscore-dangle */
const mongoose = require('mongoose');

const options = {
  timestamps: true,
};

const FollowSchema = mongoose.Schema(
  {
    follower: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: [true, 'Please add a follower'],
    },
    followee: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: [true, 'Please add a followee'],
    },
  },
  options,
);

// Removes unnecessary properties before
// converting the document to a JSON object
FollowSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
    delete returnedObject.createdAt;
    delete returnedObject.updatedAt;
  },
});

module.exports = mongoose.model('Follow', FollowSchema);
