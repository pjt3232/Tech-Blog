const express = require('express');
const router = express.Router();
const homeController = require('./homeController');
const dashboardController = require('./dashboardController');
const postController = require('./postController');
const authController = require('./authController');
const withAuth = require('../utils/auth');

router.use(withAuth);
router.use('/', homeController);
router.use('/auth', authController);
router.use('/post', postController);
router.use('/dashboard', dashboardController);

module.exports = router;