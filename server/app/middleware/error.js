require('colors');
const ErrorResponse = require('../utils/errorResponse');

/**
 * The next middleware function in the stack.
 * @callback nextCallback
 */

/**
 * Returns the response object with an error message and status code.
 * @param {Error} err - the error object
 * @param {object} req - the request object
 * @param {object} res - the response object
 * @param {nextCallback} next
 */
/* eslint-disable-next-line no-unused-vars */
const errorHandler = (err, req, res, next) => {
  let error = { ...err };
  error.message = err.message;

  // Log to console for dev
  if (process.env.NODE_ENV === 'development') {
    console.log(err.stack.red);
  }

  // Mongoose bad ObjectId
  if (err.name === 'CastError') {
    const message = `Resource not found`;
    error = new ErrorResponse(message, 404);
  }

  // Mongoose duplicate key
  if (error.name === 'MongoError' && error.code === 11000) {
    const message = `Duplicate field value entered`;
    error = new ErrorResponse(message, 400);
  }

  // Mongoose validation error
  if (err.name === 'ValidationError') {
    const message = Object.values(err.errors).map(value => value.message);
    error = new ErrorResponse(message, 400);
  }

  return res.status(error.statusCode || 500).json({
    success: false,
    error: error.message || 'Server Error',
  });
};

module.exports = errorHandler;
