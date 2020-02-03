const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const User = require('../models/User');
const Follow = require('../models/Follow');

/**
 * @api {get} /api/v1/public/:userId
 * @apiName getPublicProfile
 * @apiGroup public-profile
 * @apiPermission none
 *
 * @apiDescription Get the user's public profile
 */
// eslint-disable-next-line no-unused-vars
const getPublicProfile = asyncHandler(async (req, res, next) => {
  const { userId } = req.params;
  const user = await User.findById(userId);
  if (!user) {
    return next(new ErrorResponse('Resource not found.', 404));
  }

  const follow = await Follow.findOne({
    follower: req.user.id,
    followee: userId,
  });

  const userJSON = user.toJSON();
  delete userJSON.email;
  userJSON.isFollowed = !!follow;

  res.status(200).json({
    success: true,
    user: userJSON,
  });
});

module.exports = {
  getPublicProfile,
};
