const express = require('express');
const commentController = require('../../controllers/commentController');
const withAuth = require('../../utils/auth');
const router = express.Router();

router.post('posts/:postId/comments', withAuth, commentController.createComment);

router.put('/comments/:id', withAuth, commentController.updateComment);

router.delete('comments/:id', withAuth, commentController.deleteComment);

module.exports = router;