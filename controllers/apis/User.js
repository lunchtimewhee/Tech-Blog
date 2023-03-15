const { Router } = require('express');
//const jwt = require('jsonwebtoken');
//const fs = require('fs');
//const auth = require('../../middleware/auth');
const { Op } = require('sequelize');
const User = require('./../../models/User');

const usersRouter = new Router();

usersRouter.post('/register', async (req, res) => {
    const { first_name, last_name, username, password } = req.body;

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
            first_name,
            last_name,
            username,
            password,
        });
        //const token = jwt.sign({ id: username }, process.env.JWT_KEY);
        //res.cookie('logintoken', token, { httpOnly: true });
        res.status(200).json({ id: user.id });
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
});

module.exports = usersRouter;