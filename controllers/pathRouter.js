const { Router } = require('express');
const sequelize = require('../config/connection');
const { User, Post, Comment } = require('../models');
const auth = require('../middleware/auth');

const pathRouter = new Router();




// GET all Posts for homepage
pathRouter.get('/', async (req, res) => {
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
});

pathRouter.get('/post/:id', async (req, res) => {
    try {
      const post = await Post.findByPk(1, {
        include: [User, Comment]
      });
  
      const plainPost = post.get({ plain: true });
      console.log(plainPost);
      
      res.render('post', {
        plainPost,
      });
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
});


module.exports = pathRouter;