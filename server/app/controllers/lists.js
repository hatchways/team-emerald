const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const List = require('../models/List');

/**
 * @api {get} api/v1/users/:userId/lists
 * @apiName getLists
 * @apiGroup lists
 *
 * @apiDescription Get all of the lists for a user
 */
// eslint-disable-next-line no-unused-vars
const getLists = asyncHandler(async (req, res, next) => {
  const { userId } = req.params;
  const lists = await List.find({ user: userId });
  if (!lists) {
    return next(
      new ErrorResponse(`No lists with the user id of ${userId}`, 404),
    );
  }
  return res.status(200).json({ success: true, lists });
});

/**
 * @api {get} api/v1/users/:userId/lists/:listId
 * @apiName getList
 * @apiGroup lists
 *
 * @apiDescription Get one list for the user
 */
// eslint-disable-next-line no-unused-vars
const getList = asyncHandler(async (req, res, next) => {
  const { listId } = req.params;
  const lists = await List.findById(listId);
  if (!lists) {
    return next(
      new ErrorResponse(`No lists with the id of ${req.params.listId}`, 404),
    );
  }
  return res.status(200).json({ success: true, lists });
});

/**
 * @api {post} /api/v1/lists
 * @apiName postList
 * @apiGroup lists
 * @apiPermission protected
 *
 * @apiDescription Creates list in database
 */
// eslint-disable-next-line no-unused-vars
const postList = asyncHandler(async (req, res, next) => {
  const { name, coverUrl, user, products } = req.body;

  // Create list
  const list = await List.create({
    name,
    coverUrl,
    user,
    products,
  });

  res.status(200).json({
    success: true,
    list: list.toJSON(),
  });
});

/**
 * @api {put} /api/v1/lists/:listId
 * @apiName updateList
 * @apiGroup lists
 * @apiPermission protected
 *
 * @apiDescription Update a single list
 */
// eslint-disable-next-line no-unused-vars

// ATM NOT USING ROUTE
// const updateList = asyncHandler(async (req, res, next) => {
//   const { name, coverUrl, user, products, id } = req.body;

//   // Create list
//   const list = await List.findByIdAndUpdate(id, {
//     name,
//     coverUrl,
//     user,
//     ...products,
//   });

//   res.status(200).json({
//     success: true,
//     list: list.toJSON(),
//   });
// });

/**
 * @api {delete} /api/v1/lists/:listId
 * @apiName deleteList
 * @apiGroup lists
 * @apiPermission protected
 *
 * @apiDescription Delete a list
 */
// eslint-disable-next-line no-unused-vars
const deleteList = asyncHandler(async (req, res, next) => {
  const { id } = req.body;
  const list = await List.findById(id);
  // could potentially use findByIdAndRemove() here?
  // might not need this route. Need to work more on it if we implement

  if (!list) {
    return next(
      new ErrorResponse(`No list with the id of ${req.body.id}`, 404),
    );
  }

  await list.remove();
  return res.status(200).json({ success: true, data: list });
});

module.exports = {
  getLists,
  getList,
  postList,
  // updateList,
  deleteList,
};

// GET /api/v1/users/:userId/lists
// GET /api/v1/users/:userId/lists/:listId
// POST /api/v1/lists
// PUT /api/v1/lists/:listId
// DELETE /api/v1/lists/:listId
