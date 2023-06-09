const { Comment } = require('../models/Comment');

const commentController = {
    createComment: async (req, res) => {
        try {
            const { postId, content } = req.body;
            const comment = await Comment.create({
                content,
                user_id: req.session.user.id,
                post_id: postId,
            });
            res.json(comment);
            res.status(201).json({ message: 'Comment created successfully' });
        } catch (error) {
            res.status(500).json(error);
        }
    },

    updateComment: async (req, res) => {
        try {
            const { id } = req.params;
            const { content } = req.body;
            const comment = await Comment.findOne({
                where: { id, user_id: req.session.user.id }
            });

            if (!comment) {
                res.status(404).json({ message: 'Comment not found or unauthorized' });
            }
            comment.content = content;
            await comment.save();
            res.json({ message: 'Comment updated successfully' });
        } catch (error) {
            res.status(500).json(error);
        }
    },

    deleteComment: async (req, res) => {
        try {
            const { id } = req.params;
            const deleteComment = await Comment.destroy({ 
                where: { id, user_id: req.session.user.id }
            });

            if (deleteComment === 0) {
                res.status(404).json({ message: 'Comment not found or unauthorized' });
                return;
            }
            res.json({ message: 'Comment deleted successfully' });
        } catch (error) {
            res.status(500).json(error);
        }
    }
};

module.exports = commentController;