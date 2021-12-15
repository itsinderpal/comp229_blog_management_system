const mongoose = require('mongoose');
const { Blog, blogModel } = require('./blog');

const User = mongoose.Schema(
  {
    name: {
      type: String,
      default: '',
      trim: true,
      required: 'Name is required',
    },
    username: {
      type: String,
      default: '',
      trim: true,
      required: 'username is required',
    },
    password: {
      type: String,
      default: '',
      trim: true,
      required: 'password is required',
    },
    email: {
      type: String,
      default: '',
      trim: true,
      required: 'email address is required',
    },
    blogs: [blogModel],
  },
  {
    collection: 'users',
  }
);

module.exports.User = mongoose.model('User', User);
