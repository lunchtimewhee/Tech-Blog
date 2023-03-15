const { Router } = require('express');

const usersRouter = require('./user');
const postsRouter = require('./post');
const commentsRouter = require('./comment');


const apiRouter = new Router();

apiRouter.use('/user', usersRouter);
apiRouter.use('/post', postsRouter);
apiRouter.use('/comment', commentsRouter);


module.exports = apiRouter;