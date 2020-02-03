const express = require('express');

const { createProduct, unlinkProduct } = require('../controllers/products');

// protect checks for authenticated users
const { protect } = require('../middleware/auth');

// The mergeParams allow this router to access
// parameters passed from other routers
const router = express.Router({ mergeParams: true });

router.route('/').post(protect, createProduct);

router.route('/:productId').delete(protect, unlinkProduct);

module.exports = router;
