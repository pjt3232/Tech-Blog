const express = require('express');
const authController = require('../../controllers/authController');
const homeController = require('../../controllers/homeController');
const dashboardController = require('../../controllers/dashboardController');
const router = express.Router();

router.get('/', homeController.getHomePage);

router.get('/login', authController.getLoginPage);

router.get('/signup', authController.getSignUpPage);

router.post('/signup', authController.signup);

router.post('/login', authController.login);

router.get('/logout', authController.logout);

router.get('/dashboard', dashboardController.getDashboard);

router.post('/dashboard/post', postController.createPost);

router.put('/dashboard/edit/:id', postController.updatePost);

router.delete('/dashboard.delete/:id', postController.deletePost);


module.exports = router;