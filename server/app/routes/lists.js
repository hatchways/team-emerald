const express = require('express');

const { createProduct, unlinkProduct } = require('../controllers/products');
const { protect } = require('../middleware/auth');

const router = express.Router();

router.post('/:listId/products/', protect, createProduct);
router.delete('/:listId/products/:productId', protect, unlinkProduct);

module.exports = router;
