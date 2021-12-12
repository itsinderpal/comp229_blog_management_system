const { User } = require('../models/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const genToken = (newUser) => {
  return jwt.sign(
    {
      id: newUser._id,
    },
    process.env.JWT_SECRET_KEY,
    {
      expiresIn: '1d',
    }
  );
};

module.exports.displayLogin = function (req, res, next) {
  res.render('login', {
    title: 'Login',
    user: '',
    error: '',
    userAuth: req.user,
  });
};

module.exports.processLogin = async function (req, res, next) {
  const findUser = await User.findOne({ username: req.body.username });

  if (!findUser) {
    return res.render('login', {
      title: 'Login',
      user: '',
      error: 'User Does not Exist',
      userAuth: req.user,
    });
  }

  const passwordValid = bcrypt.compareSync(
    req.body.password,
    findUser.password
  );

  if (!passwordValid) {
    return res.render('login', {
      title: 'Login',
      user: '',
      error: "Password doesn't match",
      userAuth: req.user,
    });
  }

  const token = genToken(findUser);
  res.cookie('token', token);
  res.redirect('/');
};
