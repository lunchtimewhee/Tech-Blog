const { Router } = require('express');
const sequelize = require('../config/connection');

const pathRouter = new Router();


pathRouter.get('/', (req, res) => {
    
    
    res.render('home', {

    });
});



module.exports = pathRouter;