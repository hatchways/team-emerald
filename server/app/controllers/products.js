/* eslint-disable no-underscore-dangle */
const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');

const List = require('../models/List');
const Product = require('../models/Product');

/**
 * @api {post} /api/v1/lists/:listId/products
 * @apiName createProduct
 * @apiGroup products
 * @apiPermission protected
 *
 * @apiDescription Create a product entry
 */
const createProduct = asyncHandler(async (req, res, next) => {
  const { listId } = req.params;
  const { payload } = req.body;

  if (!payload) {
    return next(new ErrorResponse('Missing payload', 400));
  }

  const list = await List.findById(listId);
  if (!list) return next(new ErrorResponse('Not Found', 404));

  const product = new Product({
    ...payload,
    lists: [listId],
  });

  return product.save((err, entry) => {
    if (err) return next(new ErrorResponse(err, 400));

    return list.update({ $push: { products: entry._id } }, updateListErr => {
      if (updateListErr) return next(new ErrorResponse(err, 400));
      return res.status(201).json(entry);
    });
  });
});

/**
 * @api {delete} /api/v1/lists/:listId/products/:productId
 * @apiName unlinkProduct
 * @apiGroup products
 * @apiPermission protected
 *
 * @apiDescription Delete/Unlink product from list
 */
const unlinkProduct = asyncHandler(async (req, res, next) => {
  const { listId, productId } = req.params;

  const list = await List.findById(listId);
  if (!list) return next(new ErrorResponse('Not Found', 404));

  await Product.updateOne({ _id: productId }, { $pull: { lists: listId } });

  return list.updateOne({ $pull: { products: productId } }, (err, response) => {
    if (err) return next(new ErrorResponse(err, 400));
    return res.status(200).json(response);
  });
});

module.exports = {
  createProduct,
  unlinkProduct,
};
