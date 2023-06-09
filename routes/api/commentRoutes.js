const express = require('express');
const commentController = require('../../controllers');
const withAuth = require('../../utils/auth');
const router = express.Router();

router.post('/api/posts/:postId/comments', withAuth, commentController.createComment);

router.put('/api//comments/:id', withAuth, commentController.updateComment);

router.delete('/api/comments/:id', withAuth, commentController.deleteComment);

module.exports = router;