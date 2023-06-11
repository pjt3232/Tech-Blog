const express = require('express');
const router = express.Router();
const { Post, Comment } = require('../models');
const withAuth = require('../utils/auth');

router.get('/post/:id', withAuth, async (req, res) => {
    try {
        const id = req.params.id;
        const post = await Post.findByPk(id, { include: Comment });
        console.log(post);
        res.render('post', { post });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.post('/post/:id/comment', withAuth, async (req, res) => {
    try {
        const id = req.params.id;
        const comment = req.body;
        const userId = req.session.userId;
        await Comment.create({ comment, postId: id, userId });
        res.redirect(`/post/${id}`);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;