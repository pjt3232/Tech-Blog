const { Post } = require('../models/Post');

const homeController = {
    getHomePage: async (req, res) => {
        try {
            const posts = await Post.findAll();
            res.render('home', { posts });
        } catch (error) {
            res.status(500).json(error);
        }
    }
}

module.exports = homeController;