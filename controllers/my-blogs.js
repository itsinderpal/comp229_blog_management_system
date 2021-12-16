const { User } = require('../models/user');

module.exports.displayUserBlogs = function (req, res, next) {
  User.findById(req.user._id, (err, loggedUser) => {
    if (err) {
      return err;
    } else {
      res.render('index', {
        title: `${loggedUser.name}\'s Blogs`,
        blogs: loggedUser.blogs,
        userAuth: req.user,
        index: false,
      });
    }
  });
};
