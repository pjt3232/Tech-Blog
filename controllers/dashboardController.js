const express = require('express');
const router = express.Router();
const { Post, Comment } = require('../models');

router.get('/dashboard', async (req, res) => {
    try {
        const userId = req.session.user.id;
        const blogPosts = await Post.findAll({ where: { userId } });
        res.render('dashboard', { blogPosts });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.get('/dashboard/new', (req, res) => {
    res.render('new-blogpost');
});

router.post('/dashboard/new', async (req, res) => {
    const { title, contents } = req.body;
    try {
        const userId = req.session.user.id;
        await Post.create({ title, contents, userId });
        res.redirect('/dashboard');
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.get('/dashboard/edit/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const blogPost = await Post.findByPk(id);
        res.render('edit-blogpost', { blogPost });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.post('/dashboard/edit/:id', async (req, res) => {
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

router.get('/dashboard/delete/:id', async (req, res) => {
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
