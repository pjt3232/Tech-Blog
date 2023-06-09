const express = require('express');
const { Post } = require('../models/Post');
const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const blogPosts = await Post.findAll();
        res.render('home', { blogPosts });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;