const fs = require('fs');
const path = require('path');
const { User, Post, Comment } = require('../models');

const seed = async () => {
    try {
        const users = JSON.parse(
            fs.readFileSync(path.join(__dirname, 'userData.json'), 'utf-8')
        );

        const posts = JSON.parse(
            fs.readFileSync(path.join(__dirname, 'postData.json'), 'utf-8')
        );

        const comments = JSON.parse(
            fs.readFileSync(path.join(__dirname, 'commentData.json'), 'utf-8')
        );

        const createdUsers = await User.bulkCreate(users);
        const createdPosts = await Post.bulkCreate(posts);
        const createdComments = await Comment.bulkCreate(comments);

        console.log('Seed data created successfully.');
    } catch (error) {
        console.error('Error seeding data:', error);
    } finally {
        process.exit();
    }
};

seed();