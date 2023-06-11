//grabs express, middleware, and Models
const express = require('express');
const router = express.Router();
const Post = require('../models/Post');
const withAuth = require('../utils/auth');

//get route for grabbing all posts of the current user and rendering 'dashboard' view with user's posts
router.get('/dashboard', withAuth, async (req, res) => {
    const userId = req.session.userId;
    try {
        const post = await Post.findAll({ where: { userId } });
        console.log(post);
        res.render('dashboard', { post });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

//get route to render 'new-blogpost' view 
router.get('/dashboard/new', withAuth, async (req, res) => {
    res.render('new-blogpost');
});

//post route to create a new post using the req then redirects to 'dashboard'
router.post('/dashboard/new', withAuth, async (req, res) => {
    const title = req.body.title;
    const contents = req.body.contents;
    const userId = req.session.userId;
    
    try {
        await Post.create({ title, contents, userId });
        res.redirect('/dashboard');
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

//get route to grab post by params and render 'edit-blogpost' view with that post
router.get('/dashboard/edit/:id', withAuth, async (req, res) => {
    const id = req.params.id;
    try {
        const post = await Post.findByPk(id);
        console.log(post);
        res.render('edit-blogpost', { post });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

//post route to update the params post with the req then redirect to 'dashboard'
router.post('/dashboard/edit/:id', withAuth,  async (req, res) => {
    const id = req.params.id;
    const title = req.body.title;
    const contents = req.body.contents
    try {
        await Post.update({ title, contents }, { where: { id } });
        res.redirect('/dashbaord');
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

//get route for deleting the post set by params then redirects to 'dashboard'
router.get('/dashboard/delete/:id', withAuth, async (req, res) => {
    const id = req.params.id;
    try {
        await Post.destroy({ where: { id } });
        res.redirect('/dashboard');
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;
