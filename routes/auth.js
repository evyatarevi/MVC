const express = require('express');
const bcrypt = require('bcryptjs');

const db = require('../data/database');
const authControllers = require('../controllers/auth-controllers');

const router = express.Router();


//conation only auth routs.

router.get('/signup', authControllers.getSignupPage);


router.get('/login', authControllers.getLoginPage);


router.post('/signup',authControllers.signup);


router.post('/login', authControllers.login);


router.post('/logout', authControllers.logout);



module.exports = router;
