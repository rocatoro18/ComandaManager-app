const express = require('express');
const router = express.Router();
const {isLoggedIn, isNotLoggedIn} = require('../lib/auth');
const authenticationController = require('../controller/authenticationController');

//GET
router.get('/signup',isNotLoggedIn,authenticationController.signup);
router.get('/signin',isNotLoggedIn,authenticationController.signin);
router.get('/profile',isLoggedIn,authenticationController.profile);
router.get('/logout',authenticationController.logout);

//POST
router.post('/signup',isNotLoggedIn,authenticationController.signupR);
router.post('/signin',isNotLoggedIn,authenticationController.signinR);

module.exports = router;