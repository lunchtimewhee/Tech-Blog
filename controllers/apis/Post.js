const { Router } = require('express');
const { Op } = require('sequelize');
const Post = require('./../../models/Post');

const postsRouter = new Router();

// Router to create post
postsRouter.post('/', async (req, res) => {
    const { title, content, user_id } = req.body;

    try {
        const newPost = await Post.create({
            title,
            content,
            user_id,
        });
        res.status(200).json(newPost);
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
});


// Router to get a post by ID
postsRouter.get('/:postId', async (req, res) => {
    
    try {
        const post = await Post.findOne({
            where: {
                id: req.params.postId,
            },
        });
        
        res.status(200).json(post);
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }   
});






module.exports = postsRouter;