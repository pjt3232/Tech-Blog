const express = require('express');
const router = express.Router();
const { isAuthenticated } = require('../utils/auth');
const Post = require('../models/Post');

router.get('/', isAuthenticated, async (req, res) => {
    try {
        const userId = req.user.id;
        const posts = await Post.findAll({ where: { userId } });
        res.render('dashboard', { posts });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

module.exports = router;