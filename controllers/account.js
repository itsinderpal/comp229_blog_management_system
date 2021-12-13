const { User } = require('../models/user');
const ObjectID = require('mongodb').ObjectId;

module.exports.displayAccount = function (req, res, next) {
  User.findById(req.user._id, (err, loggedUser) => {
    if (err) {
      return err;
    } else {
      res.render('account', {
        title: 'Account Settings',
        user: loggedUser,
        userAuth: req.user,
      });
    }
  });
};

module.exports.editAccount = function (req, res, next) {
  const { name, email } = req.body;
  const updatedUser = new User({
    _id: req.user._id,
    username: req.user.username,
    password: req.user.password,
    blogs: req.user.blogs,
    name: name,
    email: email,
  });
  console.log(updatedUser);

  User.updateOne({ username: req.user.username }, { $set: { ...updatedUser } }, (err, res) => {
    if (err) console.log(err);
    console.log(res);
  });

  res.redirect('/');
};
