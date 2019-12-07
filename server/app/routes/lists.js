const express = require('express');

// Include other resource routers
const productsRouter = require('./products');

const router = express.Router();

// Reroute into other resource routers
router.use('/:listId/products/', productsRouter);
router.use('/:listId/products/:productId', productsRouter);

module.exports = router;
