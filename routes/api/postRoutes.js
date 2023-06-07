const express = require('express');
const postController = require('../../controllers/postController');
const withAuth = require('../../utils/auth');
const router = express.Router();

router.get('/posts', postController.getAllPosts);

router.get('/posts/:id', postController.getPostById);

router.post('/posts', withAuth, postController.createPost);

router.put('/posts/:id', withAuth, postController.updatePost);

router.delete('/posts/:id', withAuth, postController.deletePost);

module.exports = router;