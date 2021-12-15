const express = require('express');
const router = express.Router();
const passport = require('passport');

const blogController = require('../controllers/blog');

router.get(
  '/add',
  passport.authenticate('jwt', { session: false, failureRedirect: '/login' }),
  blogController.displayAddPage
);
router.post(
  '/add',
  passport.authenticate('jwt', { session: false, failureRedirect: '/login' }),
  blogController.processAddPage
);

router.get(
  '/edit/:id',
  passport.authenticate('jwt', { session: false, failureRedirect: '/login' }),
  blogController.displayEditPage
);
router.post(
  '/edit/:id',
  passport.authenticate('jwt', { session: false, failureRedirect: '/login' }),
  blogController.processEditPage
);

router.get(
  '/delete/:id',
  passport.authenticate('jwt', { session: false, failureRedirect: '/login' }),
  blogController.performDelete
);

module.exports = router;
