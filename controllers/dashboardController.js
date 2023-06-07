const { Post } = require('../models/Post');

const dashboardController = {
    getDashboard: async (req, res) => {
        try {
            const userId = req.session.user.id;
            const posts = await Post.findAll({ where: { userId } });
            res.render('dashboard', { posts });
        } catch (error) {
            res.status(500).json(error);
        }
    }
};

module.exports = dashboardController;