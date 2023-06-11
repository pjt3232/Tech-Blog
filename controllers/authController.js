const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const User = require('../models/User');

router.get('/', (req, res) => {
    res.render('login');
});

router.post('/', async (req, res) => {
    const user = await User.findOne({ where: { username: req.body.username } });
    console.log(user);
    const password = req.body.password; 
    try {
        if (user && bcrypt.compareSync(password, user.password)) {
            req.session.userId = user.id;
            res.redirect('/home');
        } else {
            res.render('login', { error: 'Invalid username or password' });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.get('/signup', (req, res) => {
    res.render('signup');
});

router.post('/signup', async (req, res) => {
    try {
        const username = req.body.username;
        const password = req.body.password;
        const hashedPassword = bcrypt.hashSync(password, 10);
        const user = await User.create({ username, password: hashedPassword });
        req.session.user = user;
        res.redirect('/');
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Sorry! Your username is already taken. Please, go back to the main login screen.' });
    }
});

router.get('/logout', (req, res) => {
    if (req.session.userId) {
        req.session.destroy(() => {
            res.status(204).end();
        });
    } else {
        res.redirect('/');
    }
});

module.exports = router;