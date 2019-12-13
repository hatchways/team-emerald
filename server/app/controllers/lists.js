const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const List = require('../models/List');
const { upload } = require('../services/aws-s3/aws-s3');

/**
 * @api {get} api/v1/users/:userId/lists
 * @apiName getLists
 * @apiGroup lists
 * @apiPermission none
 *
 * @apiDescription Get all of the lists for a user
 */
// eslint-disable-next-line no-unused-vars
const getLists = asyncHandler(async (req, res, next) => {
  const { userId } = req.params;

  const lists = await List.find({ followers: userId })
    .select('-followers')
    .populate({
      path: 'products',
      select: 'name link imageUrl currentPrice previousPrice',
    });

  return res.status(200).json({ success: true, lists });
});

/**
 * @api {get} api/v1/users/:userId/lists/:listId
 * @apiName getList
 * @apiGroup lists
 * @apiPermission protected
 *
 * @apiDescription Get one list for the user
 */
// eslint-disable-next-line no-unused-vars
const getList = asyncHandler(async (req, res, next) => {
  const { userId, listId } = req.params;
  const user = req.user.toJSON();

  if (user.id !== userId) {
    return next(
      new ErrorResponse(
        `User with id ${user.id} not authorized to get list with id ${listId}`,
        401,
      ),
    );
  }

  const list = await List.findById(listId)
    .select('-followers')
    .populate({
      path: 'products',
      select: 'name link imageUrl currentPrice previousPrice',
    });

  return res.status(200).json({ success: true, list });
});

/**
 * @api {post} /api/v1/lists
 * @apiName postList
 * @apiGroup lists
 * @apiPermission protected
 *
 * @apiDescription Creates list in database
 */
const postList = asyncHandler(async (req, res, next) => {
  let list;

  const { name } = req.body;
  const user = req.user.toJSON();

  if (!req.files) {
    list = await List.create({ name, creator: user.id, followers: [user.id] });
  } else {
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

      list = await List.create({
        name,
        coverUrl: s3res.Location,
        creator: user.id,
        followers: [user.id],
      });
    } catch (error) {
      return next(new ErrorResponse(`Server Error`, 500));
    }
  }

  return res.status(201).json({ success: true, list });
});

module.exports = {
  getLists,
  getList,
  postList,
};
