const express = require('express');

const authRouter = require('./auth');
const followsRouter = require('./follows');
const listsRouter = require('./lists');
const notificationsRouter = require('./notifications');
const productsRouter = require('./products');
const usersRouter = require('./users');
const publicProfilesRouter = require('./public-profiles');

const router = express();

router.use('/auth', authRouter);
router.use('/follows', followsRouter);
router.use('/lists', listsRouter);
router.use('/notifications', notificationsRouter);
router.use('/users', usersRouter);
router.use('/products', productsRouter);
router.use('/public', publicProfilesRouter);

module.exports = router;
