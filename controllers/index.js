let Blog = require('../models/blog');

module.exports.blogList = function (req, res, next) {
  console.log(req.user);
  Blog.find((err, blogList) => {
    if (err) {
      return console.error(err);
    } else {
      res.render('index', {
        title: 'Blog Management System',
        blogs: blogList,
        userAuth: req.user,
      });
    }
  });
};
