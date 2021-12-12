var express = require('express');
var router = express.Router();

let logoutController = require('../controllers/logout');

router.get('/', logoutController.handleLogout);

module.exports = router;
