const express = require('express');

// Include other resource routers
const followsRouter = require('./follows');

const router = express.Router();

// Reroute into other resource routers
router.use('/:userId/follows', followsRouter);

module.exports = router;
