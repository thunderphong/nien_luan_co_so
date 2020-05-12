// Set express and route
const express = require('express');
const router = express.Router();
const passport = require('passport');

// Import login controllers
const controller = require('../controllers/user.controller');

router.get('/get-profile/:account',passport.authenticate("jwt", {session: false}) , controller.getUserProfile);

router.get('/profile/:account', controller.userRootPath);

// router.post('/profile/:account', controller.postUserRootPath);

module.exports = router;