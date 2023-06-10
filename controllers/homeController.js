const express = require('express');
const Post = require('../models/Post');
const router = express.Router();
const withAuth = require('../utils/auth');

router.get('/home', withAuth, async (req, res) => {
    try {
        const blogPosts = await Post.findAll();
        if (blogPosts.length === 0) {
            res.render('home', { message: 'No blog posts available' });
        } else {
            res.render('home', { blogPosts });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;