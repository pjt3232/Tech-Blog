const express = require('express');
const postController = require('../../controllers/postController');
const withAuth = require('../../utils/auth');
const router = express.Router();

router.get('/api/posts', postController.getAllPosts);

router.get('/api/posts/:id', postController.getPostById);

router.post('/api/posts', withAuth, postController.createPost);

router.put('/api/posts/:id', withAuth, postController.updatePost);

router.delete('/api/posts/:id', withAuth, postController.deletePost);

module.exports = router;