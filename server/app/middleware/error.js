const ErrorResponse = require('../utils/errorResponse');

/* eslint-disable-next-line no-unused-vars */
const errorHandler = (err, req, res, next) => {
  let error = { ...err };
  error.message = err.message;

  // Log to console for dev
  if (process.env.NODE_ENV === 'development') {
    console.log(err.stack.red);
  }

  return res.status(error.statusCode || 500).json({
    success: false,
    error: error.message || 'Server Error',
  });
};

module.exports = errorHandler;
