const express = require('express');
const router = express.Router();
const { isAutheticated } = require('../utils/auth');
const Post = require('../models/Post');
const Comment = require('../models/Comment');

router.post('/posts', isAutheticated, async (req, res) => {
    try {
        const { title, contents } = req.body;
        const userId = req.user.id;
        await Post.create({ title, contents, userId });
        res.redirect('/dashboard');
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

router.delete('/posts/:id', isAutheticated, async (req, res) => {
    try {
        const postId = req.params.id;
        await Post.destroy({ where: { id: postId } });
        res.sendStatus(200);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

router.put('/posts:id', isAutheticated, async (req, res) => {
    try {
        const { title, contents } = req.body;
        const postId = req.params.id;
        await Post.update({ title, contents }, { where: { id: postId } });
        res.sendStatus(200);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

router.post('/posts/:id/comments', isAutheticated, async (req, res) => {
    try {
        const { content } = req.body;
        const postId = req.params.id;
        const userId = req.user.id;
        await Comment.create({ content, postId, userId });
        res.redirect(`/posts/${postId}`);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

module.exports = router;