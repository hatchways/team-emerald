const express = require('express');

const authRouter = require('./auth');
const filesRouter = require('./files');
const listsRouter = require('./lists');
const followsRouter = require('./follows');
const usersRouter = require('./users');

const router = express();

router.use('/auth', authRouter);
router.use('/files', filesRouter);
router.use('/lists', listsRouter);
router.use('/follows', followsRouter);
router.use('/users', usersRouter);

module.exports = router;
