const express = require('express');

// Include other resource routers
const followsRouter = require('./follows');
const listsRouter = require('./lists');

const router = express.Router();

// Reroute into other resource routers
router.use('/:userId/follows', followsRouter);
router.use('/:userId/lists', listsRouter);

module.exports = router;
