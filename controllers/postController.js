const Post = require('../models/Post');

const postController = {
    getAllPosts: async (req, res) => {
        try {
            const posts = await Post.findAll();
            res.json(posts);
        } catch (error) {
            res.status(500).json(error);
        }
    },

    getPostById: async (req, res) => {
        try {
            const { id } = req.params;
            const post = await Post.findByPk(id);

            if (!post) {
                res.status(400).json({ message: 'Post not found' });
                return;
            }
            res.json(post);
        } catch (error) {
            res.status(500).json(error);
        }
    },

    createPost: async (req, res) => {
        try {
            const { title, contents } = req.body;
            const post = await Post.create({ title, contents, userId: req.session.user.id });
            res.json(post);
        } catch (error) {
            res.status(500).json(error);
        }
    },

    updatePost: async (req, res) => {
        try {
            const { id } = req.params;
            const { title, contents } = req.body;
            const post = await Post.findByPk(id);

            if (!post) {
                res.status(404).json({ message: 'Post not found' });
                return;
            }

            post.title = title;
            post.content = contents;
            await post.save();
            res.json({ message: 'Post updated successfully' });
        } catch (error) {
            res.status(500).json(error);
        }
    },

    deletePost: async (req, res) => {
        try {
            const { id } = req.params;
            const post = await Post.findByPk(id);

            if (!post) {
                res.status(404).json({ message: 'Post not found' });
                return;
            }

            await post.destroy();
            res.json({ message: 'Post deleted successfully' });
        } catch (error) {
            res.status(500).json(error);
        }
    }
};

module.exports = postController;