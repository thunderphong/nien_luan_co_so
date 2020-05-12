// Set express and route
const express = require('express');
const router = express.Router();

// Import login controllers
const controller = require('../controllers/register.controller');

router.get('/', controller.registerRootPath);

router.post('/', controller.postRegisterRootPath);

module.exports = router;