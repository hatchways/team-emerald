// const ErrorResponse = require('../utils/errorResponse');
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
  const lists = await List.findById(req.user.id);

  res.status(200).json({
    success: true,
    lists: lists.toJSON(),
  });
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
  const lists = await List.findById(req.user.id);

  res.status(200).json({
    success: true,
    lists: lists.toJSON(),
  });
});

/**
 * @api {post} /api/v1/lists
 * @apiName postList
 * @apiGroup lists
 * @apiPermission none
 *
 * @apiDescription Creates user in database
 */
// eslint-disable-next-line no-unused-vars
const postList = asyncHandler(async (req, res, next) => {
  const { name, coverUrl, user, products } = req.body;
  console.log(coverUrl);

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
 * @api {update} /api/v1/auth/logout
 * @apiName logout
 * @apiGroup auth
 * @apiPermission protected
 *
 * @apiDescription Logs user out and clears cookie
 */
// eslint-disable-next-line no-unused-vars
const updateList = asyncHandler(async (req, res, next) => {
  res.clearCookie('token');

  res.status(200).json({
    success: true,
  });
});

/**
 * @api {delete} /api/v1/auth/logout
 * @apiName logout
 * @apiGroup auth
 * @apiPermission protected
 *
 * @apiDescription Logs user out and clears cookie
 */
// eslint-disable-next-line no-unused-vars
const deleteList = asyncHandler(async (req, res, next) => {
  res.clearCookie('token');

  res.status(200).json({
    success: true,
  });
});

module.exports = {
  getLists,
  getList,
  postList,
  updateList,
  deleteList,
};

// GET /api/v1/users/:userId/lists
// GET /api/v1/users/:userId/lists/:listId
// POST /api/v1/lists
// PUT /api/v1/lists/:listId
// DELETE /api/v1/lists/:listId (edited)
