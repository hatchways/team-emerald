const express = require('express');

// Include other resource routers
const productsRouter = require('./products');

const { getLists, getList, postList } = require('../controllers/lists');

const { protect } = require('../middleware/auth');

const router = express.Router({ mergeParams: true });

// Reroute into other resource routers
router.use('/:listId/products/', productsRouter);
router.use('/:listId/products/:productId', productsRouter);

router
  .route('/')
  .get(protect, getLists)
  .post(protect, postList);

router.route('/:listId').get(protect, getList);

module.exports = router;
