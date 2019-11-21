const express = require('express');

const authRouter = require('./auth');

const router = express();

router.use('/auth', authRouter);

module.exports = router;
