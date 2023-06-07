const express = require('express');
const router = express.Router();
const passport = require('passport');
const User = require('../models/User');

router.post('/signup', async (req, res) => {
    try {
        const { username, password } = req.body;
        const newUser = await User.create({ username, password });
        req.login(newUser, (err) => {
            if (err) throw err;
            res.redirect('/dashboard');
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

router.post('/signup', passport.authenticate('local', {
    successRedirect: '/dashboard',
    failureRedirect: '/login',
}));

router.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/');
});

module.exports = router;