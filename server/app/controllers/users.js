const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const User = require('../models/User');
const { upload } = require('../../services/aws-s3/aws-s3');

/**
 * @api {put} /api/v1/users/:userId/profileImage
 * @apiName updateProfileImage
 * @apiGroup users
 * @apiPermission protected
 *
 * @apiDescription Update the user's profile image
 */
const updateProfileImage = asyncHandler(async (req, res, next) => {
  const { userId } = req.params;
  const user = await User.findById(userId);

  console.log(user);
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
};
