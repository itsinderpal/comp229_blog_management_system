var express = require('express');
var router = express.Router();
const passport = require('passport');

let indexController = require('../controllers/index');

router.get(
  '/',
  passport.authenticate('jwt', { session: false , failureRedirect: '/login'}),
  indexController.blogList
);

module.exports = router;
