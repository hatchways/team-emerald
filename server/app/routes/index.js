const express = require('express');

const authRouter = require('./auth');
const followsRouter = require('./follows');
const listsRouter = require('./lists');
const usersRouter = require('./users');

const router = express();

router.use('/auth', authRouter);
router.use('/follows', followsRouter);
router.use('/lists', listsRouter);
router.use('/users', usersRouter);

module.exports = router;
