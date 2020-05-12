// Set express and route
const express = require('express');
const router = express.Router();

// Import login controllers
const controller = require('../controllers/login.controller');

router.get('/', controller.loginRootPath);

router.post('/', controller.postLoginRootPath);

module.exports = router;