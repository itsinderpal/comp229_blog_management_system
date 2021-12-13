const ObjectID = require('mongodb').ObjectId;
let { Blog } = require('../models/blog');
const { User } = require('../models/user');

module.exports.blogList = function (req, res, next) {
  User.findById(req.user._id, (err, loggedUser) => {
    if (err) {
      return err;
    } else {
      res.render('index', {
        title: 'Blog Management System',
        blogs: loggedUser.blogs,
        userAuth: req.user,
      });
    }
  });
};
