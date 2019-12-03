const express = require('express');

const authRouter = require('./auth');
const filesRouter = require('./files');
const listsRouter = require('./lists');

const router = express();

router.use('/auth', authRouter);
router.use('/files', filesRouter);
router.use('/lists', listsRouter);

module.exports = router;
