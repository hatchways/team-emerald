const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const User = require('../models/User');

/**
 * Sends http response with token wrapped inside a cookie
 * @param {User} user - the User model
 * @param {number} statusCode - the http status code
 * @param {object} res - the response object
 */
const sendTokenResponse = (user, statusCode, res) => {
  // Create token
  const token = user.getSignedJwtToken();

  // Cookie options
  const options = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000,
    ),
    httpOnly: true, // Prevent cookies from being accessed client side
  };

  // Add secure option for production
  if (process.env.NODE_ENV === 'production') {
    options.secure = true; // Only send cookies with https protocol
  }

  res
    .status(statusCode)
    .cookie('token', token, options)
    .json({
      success: true,
      authenticated: true,
      user: user.toJSON(),
    });
};

/**
 * @api {get} /api/v1/auth/
 * @apiName getMe
 * @apiGroup auth
 * @apiPermission protected
 *
 * @apiDescription Get the current logged in user
 */
// eslint-disable-next-line no-unused-vars
const getMe = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user.id);

  res.status(200).json({
    success: true,
    authenticated: true,
    user: user.toJSON(),
  });
});

/**
 * @api {post} /api/v1/auth/register
 * @apiName register
 * @apiGroup auth
 * @apiPermission none
 *
 * @apiDescription Creates user in database
 */
// eslint-disable-next-line no-unused-vars
const register = asyncHandler(async (req, res, next) => {
  const { name, email, password } = req.body;

  // Create user
  const user = await User.create({
    name,
    email,
    password,
  });

  sendTokenResponse(user, 200, res);
});

/**
 * @api {post} /api/v1/auth/login
 * @apiName login
 * @apiGroup auth
 * @apiPermission none
 *
 * @apiDescription Login user
 */
// eslint-disable-next-line consistent-return
const login = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  // Validate email and password
  if (!email || !password) {
    return next(new ErrorResponse('Please provide an email and password', 400));
  }

  // Check for user
  const user = await User.findOne({ email }).select('+password');

  if (!user) {
    return next(new ErrorResponse('Invalid credentials', 401));
  }

  // Check if password matches
  const isMatch = await user.matchPassword(password);

  if (!isMatch) {
    return next(new ErrorResponse('Invalid credentials', 401));
  }

  sendTokenResponse(user, 200, res);
});

/**
 * @api {post} /api/v1/auth/logout
 * @apiName logout
 * @apiGroup auth
 * @apiPermission protected
 *
 * @apiDescription Logs user out and clears cookie
 */
// eslint-disable-next-line no-unused-vars
const logout = asyncHandler(async (req, res, next) => {
  res.clearCookie('token');

  res.status(200).json({
    success: true,
  });
});

module.exports = {
  getMe,
  register,
  login,
  logout,
};
