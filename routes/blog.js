var express = require('express');
var router = express.Router();
const passport = require('passport');

let blogController = require('../controllers/blog');

router.get(
  '/add',
  passport.authenticate('jwt', { session: false, failureRedirect: '/login' }),
  blogController.displayAddPage
);
router.post('/add', blogController.processAddPage);

router.get(
  '/edit/:id',
  passport.authenticate('jwt', { session: false, failureRedirect: '/login' }),
  blogController.displayEditPage
);
router.post('/edit/:id', blogController.processEditPage);

router.get(
  '/delete/:id',
  passport.authenticate('jwt', { session: false, failureRedirect: '/login' }),
  blogController.processDelete
);

module.exports = router;
