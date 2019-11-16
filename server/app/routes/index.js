const express = require('express');

const router = express();

/* eslint-disable-next-line no-unused-vars */
router.get('/', (req, res, next) => {
  res.status(200).json({ success: true });
});

module.exports = router;
