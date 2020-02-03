const express = require('express');

const { updateProfileImage } = require('../controllers/users');
const { getAllUsers } = require('../controllers/users');

const { protect } = require('../middleware/auth');

// Include other resource routers
const followsRouter = require('./follows');
const listsRouter = require('./lists');
const notificationsRouter = require('./notifications');

const router = express.Router();

// Reroute into other resource routers
router.get('/', protect, getAllUsers); // For development only
router.use('/:userId/follows', followsRouter);
router.use('/:userId/lists', listsRouter);
router.use('/:userId/notifications', notificationsRouter);

router.route('/:userId/profile-image').put(protect, updateProfileImage);

module.exports = router;
