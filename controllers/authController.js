const bcrypt = require('bcrypt');
const { User } = require('../models/User');

const authController = {
    signup: async (req, res) => {
        try {
            const { username, password } = req.body;
            const hashedPassword = await bcrypt.hash(password, 10);
            const user = await User.create({ username, password: hashedPassword });

            req.session.save(() => {
                req.session.user = user;
                req.session.loggedIn = true;
                res.json(user);
            });
        } catch (error) {
            res.status(500).json(error)
        }
    },

    login: async (req, res) => {
        try {
            const { username, password } = req.body;
            const user = await User.findOne({ where: { username } });

            if (!user) {
                res.status(400).json({ message: 'Invalid username or password' });
                return;
            }
            const validPassword = await bcrypt.compare(password, user.password);
            if (!validPassword) {
                res.status(400).json({ message: 'Invalid username or password' });
                return;
            }

            req.session.save(() => {
                req.session.user = user;
                req.session.loggedIn = true;
                res.json(user);
            });
        } catch (error) {
            res.status(500).json(error);
        }
    },

    logout: (req, res) => {
        req.session.destroy(() => {
            res.redirect('/');
        });
    },

    getLoginPage: (req, res) => {
        res.render('login');
    },

    getSignUpPage: (req, res) => {
        res.render('signup');
    }
};

module.exports = authController;