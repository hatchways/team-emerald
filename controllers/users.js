const { ObjectId } = require('mongoose').Types;
const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const User = require('../models/User');
const Follow = require('../models/Follow');
const { upload } = require('../services/aws-s3/aws-s3');

/**
 * @api {get} /api/v1/users
 * @apiName getAllUsers
 * @apiGroup users
 * @apiPermission protected
 *
 * @apiDescription Get all users in db. Development only.
 */
const getAllUsers = asyncHandler(async (req, res, next) => {
  const userId = req.user ? req.user.id : '';

  try {
    const usersOutput = await User.find();
    const users = usersOutput.map(person => {
      const json = person.toJSON();
      delete json.email;
      return json;
    });

    const followsOutput = await Follow.find({ follower: ObjectId(userId) });
    const follows = followsOutput.map(follow => follow.toJSON());

    return res.status(200).json({ users, follows });
  } catch (err) {
    return next(new ErrorResponse('Bad Request', 400));
  }
});

/**
 * @api {put} /api/v1/users/:userId/profile-image
 * @apiName updateProfileImage
 * @apiGroup users
 * @apiPermission protected
 *
 * @apiDescription Update the user's profile image
 */
const updateProfileImage = asyncHandler(async (req, res, next) => {
  const { userId } = req.params;
  const user = await User.findById(userId);

  if (!user) {
    return next(
      new ErrorResponse(`Resource not found with id of ${userId}`, 404),
    );
  }

  // Check that the user updating his own profile image
  // eslint-disable-next-line no-underscore-dangle
  if (req.user._id.toString() !== userId) {
    return next(
      new ErrorResponse(
        `User ${userId} is not authorized to update the profile image`,
        401,
      ),
    );
  }

  if (!req.files) {
    return next(new ErrorResponse(`Please upload a file`, 400));
  }

  const { file } = req.files;

  // Check that the file is a photo
  if (!file.mimetype.startsWith('image')) {
    return next(new ErrorResponse(`Please upload an image file`, 400));
  }

  // Check that the file is at most 1 MB
  if (file.size > process.env.MAX_FILE_UPLOAD) {
    return next(
      new ErrorResponse(
        `Please upload an image less than ${process.env.MAX_FILE_UPLOAD}`,
        400,
      ),
    );
  }

  let s3res;
  try {
    // Upload image to S3
    s3res = await upload(file);

    // Save image url to user
    user.photoUrl = s3res.Location;
    await user.save();
  } catch (error) {
    return next(new ErrorResponse(`Server Error`, 500));
  }

  return res.status(200).json({ success: true, photoUrl: s3res.Location });
});

module.exports = {
  updateProfileImage,
  getAllUsers,
};
