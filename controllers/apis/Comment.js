const { Router } = require('express');
const { Op } = require('sequelize');
const Comment = require('./../../models/Comment');

const commentsRouter = new Router();

// Router to create comment
commentsRouter.post('/', async (req, res) => {
    const { content, postId } = req.body;

    try {
        const newComment = await Comment.create({
            content,
            postId,
            username,
        });
        res.status(200).json(newComment);
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
});


// Router to get a comment by ID
commentsRouter.get('/:commentId', async (req, res) => {
    
    try {
        const comment = await Comment.findOne({
            where: {
                id: req.params.commentId,
            },
        });
        
        res.status(200).json(comment);
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }   
});






module.exports = commentsRouter;