const express = require('express');
const router = express.Router();
const { Post, Comment } = require('../models');
const withAuth = require('../utils/auth');

router.get('/post:id', withAuth, async (req, res) => {
    const { id } = req.params;
    try {
        const blogPost = await Post.findByPk(id, { include: Comment });
        res.render('post', { blogPost });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.post('/post/:id/comment', withAuth, async (req, res) => {
    const { id } = req.params;
    const { comment } = req.body;
    try {
        const userId = req.session.userId;
        await Comment.create({ comment, postId: id, userId });
        res.redirect('/post/${id}');
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;