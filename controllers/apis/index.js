const { Router } = require('express');

const usersRouter = require('./user');
const commentsRouter = require('./comment');
const postsRouter = require('./post');

const apiRouter = new Router();

apiRouter.use('/user', usersRouter);
apiRouter.use('/comment', commentsRouter);
apiRouter.use('/post', postsRouter);

module.exports = apiRouter;