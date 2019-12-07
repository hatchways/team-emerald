const express = require('express');

const { getLists, getList, postList } = require('../controllers/lists');

const { protect } = require('../middleware/auth');

const router = express.Router({ mergeParams: true });

router
  .route('/')
  .get(protect, getLists)
  .post(protect, postList);

router.route('/:listId').get(protect, getList);

module.exports = router;
