const express = require('express');
const router = express.Router();
const passport = require('passport');

const myBlogsController = require('../controllers/my-blogs');

router.get(
  '/',
  passport.authenticate('jwt', { session: false, failureRedirect: '/login' }),
  myBlogsController.displayUserBlogs
);

module.exports = router;
