const express = require('express');

const {
  getLists,
  getList,
  postList,
  updateList,
  // deleteList,
} = require('../controllers/lists');

const { protect } = require('../middleware/auth');

const router = express.Router({ mergeparams: true });

router.route('/:userId').get(getLists);
router.get('/:userId/lists/:listId', getList);
router.post('/', protect, postList);
router.route('/:listId').put(protect, updateList);
// .delete('/:listId', protect, deleteList);

module.exports = router;

// GET /api/v1/users/:userId/lists
// GET /api/v1/users/:userId/lists/:listId
// POST /api/v1/lists
// PUT /api/v1/lists/:listId
// DELETE /api/v1/lists/:listId (edited)
