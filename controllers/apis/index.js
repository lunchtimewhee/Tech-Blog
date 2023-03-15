const { Router } = require('express');

const usersRouter = require('./User');
const postsRouter = require('./Post');
const commentsRouter = require('./Comment');


const apiRouter = new Router();

apiRouter.use('/user', usersRouter);
apiRouter.use('/post', postsRouter);
apiRouter.use('/comment', commentsRouter);


module.exports = apiRouter;