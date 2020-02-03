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
      userId: user.id,
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
  const user = req.user.toJSON();

  // Check if list exists
  const list = await List.findById(listId);
  if (!list) {
    return next(new ErrorResponse(`List with id ${listId} not found`, 404));
  }

  // Check if the user can remove from the list
  if (list.creator.toString() !== user.id) {
    return next(
      new ErrorResponse(
        `User with ${user.id} not authorized to remove products from list`,
        401,
      ),
    );
  }

  // Check if product exists
  let product = await Product.findById(productId);
  if (!product) {
    return next(
      new ErrorResponse(`Product with id ${productId} not found`, 404),
    );
  }

  if (product.lists.length === 1 && product.lists.includes(listId)) {
    await Product.findByIdAndDelete(productId);
  } else {
    product = await Product.findByIdAndUpdate(productId, {
      $pull: { lists: listId },
    });
  }

  const savedList = await List.findByIdAndUpdate(
    listId,
    { $pull: { products: productId } },
    { new: true },
  )
    .select('-followers')
    .populate({
      path: 'products',
      select: 'name link imageUrl currentPrice previousPrice',
    });

  return res.status(200).json({ list: savedList });
});

module.exports = {
  createProduct,
  unlinkProduct,
};
