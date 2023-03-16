const { Router } = require('express');
const { Op } = require('sequelize');
const Post = require('./../../models/Post');

const postsRouter = new Router();

// Router to create post
postsRouter.post('/', async (req, res) => {
    const { title, content, userId } = req.body;

    try {
        const newPost = await Post.create({
            title,
            content,
            userId,
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


// Delete a post
postsRouter.delete('/:postId', async (req, res) => {
    try {
        const post = await Post.destroy({
            where: {
                id: req.params.postId,
            },
        });
        if (!post) {
            res.status(404).json({ message: 'No post found with this id!' });
            return;
        }
        res.status(200).json(post);
    } catch (err) {
        res.status(500).json(err);

    }
});






module.exports = postsRouter;