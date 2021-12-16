const { User } = require('../models/user');
const jwt = require('jsonwebtoken');
const { cookieExtractor } = require('../config/passport');

module.exports.blogList = async function (req, res, next) {
  let authorizedUser = {
    verified: false,
    usrId: '',
    usrData: {},
  };
  let token = cookieExtractor(req);
  if (token) {
    jwt.verify(token, process.env.JWT_SECRET_KEY, (err, usrData) => {
      if (err) {
        authorizedUser = {
          verified: false,
          usrId: '',
          usrData: {},
        };
      } else {
        authorizedUser = {
          verified: true,
          usrId: usrData.id,
          usrData: {},
        };
      }
    });
  } else {
    authorizedUser = {
      verified: false,
      usrId: '',
      usrData: {},
    };
  }

  // find user data if authorized

  await User.findById(authorizedUser.usrId, (err, usr) => {
    if (err) console.log(err);
    authorizedUser.usrData = {
      _id: usr._id,
      name: usr.name,
      username: usr.username,
      password: usr.password,
      email: usr.email,
      blogs: usr.blogs,
    };
    console.log(authorizedUser);
  }).clone();

  User.find({}, (err, users) => {
    if (err) return err;
    let allBlogs = [];
    let blogsSorted = [];
    users.filter((user) => {
      if (user.blogs.length !== 0) {
        allBlogs.push(user.blogs);
      }
    });
    allBlogs.filter((singleBlogsArr) => {
      for (let i = 0; i < singleBlogsArr.length; i++) {
        blogsSorted.push(singleBlogsArr[i]);
      }
    });
    console.log(authorizedUser.usrData);
    // if (authorizedUser.verified) {
    res.render('index', {
      title: 'Blog Management System',
      blogs: blogsSorted,
      userAuth: req.user,
      user: authorizedUser.usrData,
    });
    // }
    // else {
    //   res.render('index', {
    //     title: 'Blog Management System',
    //     blogs: blogsSorted,
    //     userAuth: req.user,
    //     authorizedUser: authorizedUser.usr,
    //   });
    // }
  });
};
