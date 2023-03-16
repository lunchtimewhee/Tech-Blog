const { Router } = require('express');
const jwt = require('jsonwebtoken');
const fs = require('fs');
const auth = require('../../middleware/auth');
const { Op } = require('sequelize');
const User = require('./../../models/User');

const usersRouter = new Router();

// Router to register user
usersRouter.post('/register', async (req, res) => {
    const { firstName, lastName, username, password } = req.body;

    const checkUser = await User.findOne({
        where: {
            username: username,
        },
    });

    if (checkUser) {
        res.status(409).json({
            message:
                'A user with this username or email already exists. Try logging in, instead.',
        });
        return;
    }

    try {
        const user = await User.create({
            firstName,
            lastName,
            username,
            password,
        });
        const token = jwt.sign({ id: username }, process.env.JWT_KEY);
        res.cookie('logintoken', token, { httpOnly: true });
        res.status(200).json({ id: user.id });
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
});


// Router to get a user by ID
usersRouter.get('/:userid', async (req, res) => {
    
    try {
        const user = await User.findOne({
            where: {
                id: req.params.userid,
            },
        });
        
        res.status(200).json({id: user.id, firstName: user.firstName, lastName: user.lastName, password: user.password});
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }   
});






module.exports = usersRouter;