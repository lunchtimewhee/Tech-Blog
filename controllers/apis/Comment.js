const { Router } = require('express');
const { Op } = require('sequelize');
const Comment = require('./../../models/Comment');
const auth = require('../../middleware/auth');

const commentsRouter = new Router();

// Router to create comment
commentsRouter.post('/', auth, async (req, res) => {
    const { content, postId } = req.body;

    const user = req.user;
    const plainUser = req.user.get({ plain: true });


    try {
        const newComment = await Comment.create({
            content,
            postId,
            username: plainUser.username,
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