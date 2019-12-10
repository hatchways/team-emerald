const express = require('express');
const { protect } = require('../middleware/auth');
const { getPublicUser } = require('../controllers/public-profiles');

const router = express.Router();

router.get('/:userId', protect, getPublicUser);

module.exports = router;
