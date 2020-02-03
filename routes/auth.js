const express = require('express');

const { getMe, register, login, logout } = require('../controllers/auth');

const { protect } = require('../middleware/auth');

const router = express.Router();

router.get('/', protect, getMe);
router.post('/register', register);
router.post('/login', login);
router.post('/logout', protect, logout);

module.exports = router;
