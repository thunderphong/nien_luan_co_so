// Set express and route
const express = require('express');
const router = express.Router();

// Import controller 
const controller = require('../controllers/logout.controller');

router.get('/', controller.getLogout);

module.exports = router;