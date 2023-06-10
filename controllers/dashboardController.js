const express = require('express');
const router = express.Router();
const Post = require('../models/Post');
const withAuth = require('../utils/auth');

router.get('/dashboard', withAuth, async (req, res) => {
    try {
        const userId = req.session.userId;
        const blogPosts = await Post.findAll({ where: { userId } });

        if (blogPosts.length === 0) {
            res.render('dashboard', { message: "You haven't made any posts" });
        } else {
            res.render('dashboard', { blogPosts });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.get('/dashboard/new', withAuth, async (req, res) => {
    res.render('new-blogpost');
});

router.post('/dashboard/new', withAuth, async (req, res) => {
    const { title, contents } = req.body;
    try {
        const userId = req.session.userId;
        await Post.create({ title, contents, userId });
        res.redirect('/dashboard');
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.get('/dashboard/edit/:id', withAuth, async (req, res) => {
    const { id } = req.params;
    try {
        const blogPost = await Post.findByPk(id);
        res.render('edit-blogpost', { blogPost });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.post('/dashboard/edit/:id', withAuth,  async (req, res) => {
    const { id } = req.params;
    const { title, contents } = req.body;
    try {
        await Post.update({ title, contents }, { where: { id } });
        res.redirect('/dashbaord');
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.get('/dashboard/delete/:id', withAuth, async (req, res) => {
    const { id } = req.params;
    try {
        await Post.destroy({ where: { id } });
        res.redirect('/dashboard');
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;
