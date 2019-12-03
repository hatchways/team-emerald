const express = require('express');

const {
  getFollows,
  createFollow,
  deleteFollow,
} = require('../controllers/follows');

// protect checks for authenticated users
const { protect } = require('../middleware/auth');

// The mergeParams allow this router to access
// parameters passed from other routers
const router = express.Router({ mergeParams: true });

router.route('/').get(getFollows);

router
  .route('/:userId')
  .post(protect, createFollow)
  .delete(protect, deleteFollow);

module.exports = router;
