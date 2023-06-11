//grabs express, middleware, and Models
const express = require('express');
const Post = require('../models/Post');
const router = express.Router();
const withAuth = require('../utils/auth');

//get route for finding all posts and rendering the 'home' view with those posts
router.get('/home', withAuth, async (req, res) => {
    try {
        const post = await Post.findAll();
        res.render('home', { post });
        console.log(res);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;