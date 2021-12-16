const express = require('express');
const router = express.Router();
const passport = require('passport');

const indexController = require('../controllers/index');

router.get(
  '/',
  // passport.authenticate('jwt', { session: false , failureRedirect: '/login'}),
  indexController.blogList
);

module.exports = router;
