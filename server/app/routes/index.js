const express = require('express');

const authRouter = require('./auth');
const listsRouter = require('./lists');
const followsRouter = require('./follows');
const listsRouter = require('./lists');
const usersRouter = require('./users');
const productsRouter = require('./products');

const router = express();

router.use('/auth', authRouter);
router.use('/lists', listsRouter);
router.use('/follows', followsRouter);
router.use('/lists', listsRouter);
router.use('/users', usersRouter);
router.use('/products', productsRouter);

module.exports = router;
