const { Router } = require('express');

const userRouter = require('./user');

const apiRouter = new Router();

apiRouter.use('/user', userRouter);

module.exports = apiRouter;