const express = require('express');

const { getFollows, createFollow } = require('../controllers/follows');

// protect checks for authenticated users
const { protect } = require('../middleware/auth');

// The mergeParams allow this router to access parameters passed
// to other routers
const router = express.Router({ mergeParams: true });

router.get('/', getFollows);

router.post('/:userId', protect, createFollow);

module.exports = router;
