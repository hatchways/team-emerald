const express = require('express');

const { upload } = require('../controllers/files');
const { protect } = require('../middleware/auth');

const router = express.Router();

router.post('/', protect, upload);

module.exports = router;
