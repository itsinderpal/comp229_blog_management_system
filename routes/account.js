const express = require('express');
const router = express.Router();
const passport = require('passport');

const accountController = require('../controllers/account');

router.get(
  '/',
  passport.authenticate('jwt', { session: false, failureRedirect: '/login' }),
  accountController.displayAccount
);

router.post(
  '/',
  passport.authenticate('jwt', { session: false, failureRedirect: '/login' }),
  accountController.editAccount
);

module.exports = router;
