const { Router } = require('express');
const sequelize = require('../config/connection');
const { User, Post, Comment } = require('../models');
const auth = require('../middleware/auth');
const optionalAuth = require('../middleware/optionalAuth');

const pathRouter = new Router();




// GET all Posts for homepage
pathRouter.get('/', optionalAuth, async (req, res) => {

    if(req.user) {
        const user = req.user.get({ plain: true });
        try {
            const allPosts = await Post.findAll({
                limit: 10,
                include: User
            });
        
            const posts = allPosts.map((post) =>
                post.get({ plain: true })
            );
    
            console.log(posts);
        
            res.render('home', {
                posts,
                user: user
            });
            } catch (err) {
                console.log(err);
                res.status(500).json(err);
            }
    }
    else {
        try {
            const allPosts = await Post.findAll({
                limit: 10,
                include: User
            });
        
            const posts = allPosts.map((post) =>
                post.get({ plain: true })
            );
    
            console.log(posts);
        
            res.render('home', {
                posts,
        });
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    }

    
});

pathRouter.get('/post/:id', auth, async (req, res) => {
    const user = req.user;
    const plainUser = req.user.get({ plain: true });
    
    try {
      const post = await Post.findByPk(req.params.id, {
        include: [User, Comment]
      });
      
      const plainPost = post.get({ plain: true });
      console.log(plainPost);
      
      res.render('post', {
        plainPost,
        user: plainUser,
      });
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
});

pathRouter.get('/dashboard', auth, async (req, res) => {
    const user = req.user;
    const plainUser = req.user.get({ plain: true });
    
    try {
      const post = await Post.findAll({
        include: [User, Comment],
        where:{
            userId: plainUser.id,
        }
      });
      const plainPosts = post.map((post) =>
                post.get({ plain: true })
            );
      
      res.render('dashboard', {
        plainPosts,
        user: plainUser,
      });
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
});


// GET all Posts for homepage
pathRouter.get('/login', async (req, res) => {
       res.render('login');    
});


module.exports = pathRouter;