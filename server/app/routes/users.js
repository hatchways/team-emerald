const express = require('express');

const { updateProfileImage } = require('../controllers/users');

const { protect } = require('../middleware/auth');

// Include other resource routers
const followsRouter = require('./follows');

const router = express.Router();

// Reroute into other resource routers
router.use('/:userId/follows', followsRouter);

router.route('/:userId/profile-image').put(protect, updateProfileImage);

module.exports = router;
