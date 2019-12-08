/* eslint-disable no-underscore-dangle */
const Queue = require('bull');

const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');

const List = require('../models/List');
const Product = require('../models/Product');

// Used for when users add new products to database
const newProductJobOptions = {
  priority: 1,
};

const webScrapeQueue = new Queue(process.env.WSS);

/**
 * @api {post} /api/v1/lists/:listId/products
 * @apiName createProduct
 * @apiGroup products
 * @apiPermission protected
 *
 * @apiDescription Create a product entry
 */
/* eslint-disable-next-line no-unused-vars */
const createProduct = asyncHandler(async (req, res, next) => {
  const { listId } = req.params;
  const { link } = req.body;
  const user = req.user.toJSON();

  const list = await List.findById(listId);

  if (!list) {
    return next(new ErrorResponse(`List with ${listId} not found`, 404));
  }

  if (list.creator.toString() !== user.id) {
    return next(new ErrorResponse('Not authorized', 401));
  }

  await webScrapeQueue.add(
    {
      link,
      listId,
      newProduct: true,
    },
    newProductJobOptions,
  );

  return res.status(200).json({ success: true });
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
