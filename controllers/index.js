const express = require('express');
const router = express.Router();
const homeController = require('./homeController');
const dashboardController = require('./dashboardController');
const postController = require('./postController');
const authController = require('./authController');

router.use('/', authController);
router.use('/', homeController);
router.use('/', postController);
router.use('/', dashboardController);

module.exports = router;