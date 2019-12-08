const express = require('express');

const {
  getNotifications,
  dismissNotification,
} = require('../controllers/notifications');

// protect checks for authenticated users
const { protect } = require('../middleware/auth');

// The mergeParams allow this router to access
// parameters passed from other routers
const router = express.Router({ mergeParams: true });

router.route('/').get(protect, getNotifications);

router.route('/:notificationId').put(protect, dismissNotification);

module.exports = router;
