var express = require('express');
var router = express.Router();

let blogController = require('../controllers/blog');

router.get('/create', blogController.displayAddPage);

module.exports = router;
