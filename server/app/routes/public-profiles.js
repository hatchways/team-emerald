const express = require('express');
const { protect } = require('../middleware/auth');
const { getPublicProfile } = require('../controllers/public-profiles');

const router = express.Router({ mergeParams: true });

router.route('/:userId').get(protect, getPublicProfile);

module.exports = router;
