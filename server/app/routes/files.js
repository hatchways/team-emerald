const express = require('express');
const expressFileUpload = require('express-fileupload');

const { upload } = require('../controllers/files');
const { protect } = require('../middleware/auth');

const router = express.Router();

router.use(expressFileUpload());
router.post('/upload', protect, upload);

module.exports = router;
