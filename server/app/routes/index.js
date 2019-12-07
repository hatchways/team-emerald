const express = require('express');

const authRouter = require('./auth');
const listsRouter = require('./lists');
const followsRouter = require('./follows');
const usersRouter = require('./users');

const router = express();

router.use('/auth', authRouter);
router.use('/lists', listsRouter);
router.use('/follows', followsRouter);
router.use('/users', usersRouter);

module.exports = router;
