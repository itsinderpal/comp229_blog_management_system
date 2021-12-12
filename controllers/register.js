const { User } = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

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

module.exports.displayRegister = function (req, res, next) {
  res.render('register', {
    title: 'Register',
    user: '',
    error: '',
    userAuth: req.user,
  });
};

module.exports.processRegister = async function (req, res, next) {
  const findUser = await User.findOne({
    $or: [{ email: req.body.email }, { username: req.body.username }],
  });

  if (findUser) {
    res.render('register', {
      title: 'Register',
      user: '',
      error: 'User Already Exists',
      userAuth: req.user,
    });
  }
  const hashedPassword = await bcrypt.hash(req.body.password, 10);

  let newUser = new User({ ...req.body, password: hashedPassword });
  User.create(newUser);

  const token = genToken(newUser);
  res.cookie('token', token);
  res.redirect('/login');
};
