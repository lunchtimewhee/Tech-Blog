const { Router } = require('express');
const jwt = require('jsonwebtoken');
const fs = require('fs');
const auth = require('../../middleware/auth');
const { Op } = require('sequelize');
const User = require('./../../models/User');
const bcrypt = require('bcrypt');

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

        // Encrpyt password when creating user
        newPassword = await bcrypt.hash(
            password,
            10
        );

        const user = await User.create({
            firstName,
            lastName,
            username,
            password: newPassword,
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


// Login router
usersRouter.post('/login', async (req, res) => {
    try {
      const dbUserData = await User.findOne({
        where: {
          username: req.body.username,
        },
      });
  
      if (!dbUserData) {
        res
          .status(400)
          .json({ message: 'Incorrect email or password. Please try again!' });
        return;
      }
      
      const validPassword = await dbUserData.checkPassword(req.body.password);
  
      if (!validPassword) {
        res
          .status(400)
          .json({ message: 'Incorrect email or password. Please try again!' });
        return;
      }
  
      req.session.save(() => {
        req.session.loggedIn = true;
  
        res
          .status(200)
          .json({ user: dbUserData, message: 'You are now logged in!' });
      });
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  });

// Logout router
usersRouter.get('/logout',  async (req, res) => {
    console.log(req.cookies);
    res.status(200).clearCookie('logintoken').redirect('/');
});




module.exports = usersRouter;