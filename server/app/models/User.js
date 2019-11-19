const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const ErrorResponse = require('../utils/errorResponse');

const options = {
  timestamps: true,
};

const UserSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please add a name'],
    },
    email: {
      type: String,
      required: [true, 'Please add an email'],
      unique: true,
      match: [
        // eslint-disable-next-line no-useless-escape
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        'Please add a valid email',
      ],
    },
    password: {
      type: String,
      required: [true, 'Please add a password'],
      minlength: [6, 'Password must be at least 6 characters'],
      select: false,
    },
  },
  options,
);

// Encrypt password using bcrypt
UserSchema.pre('save', async function encryptPassword(next) {
  // Only run if the password is modified
  if (!this.isModified('password')) {
    next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Custom middleware error handler after save
UserSchema.post('save', (error, doc, next) => {
  console.log(error);
  if (
    error.name === 'MongoError' &&
    error.code === 11000 &&
    error.keyPattern.email
  ) {
    next(new ErrorResponse('The email entered is already taken', 400));
  } else {
    next();
  }
});

// Sign JWT and return
UserSchema.methods.getSignedJwtToken = function getSignedJwtToken() {
  // eslint-disable-next-line no-underscore-dangle
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};

// Match user entered password to hashed password in database
UserSchema.methods.matchPassword = async function matchPassword(
  enteredPassword,
) {
  // eslint-disable-next-line no-return-await
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model('User', UserSchema);
