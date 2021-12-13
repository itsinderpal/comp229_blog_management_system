const mongoose = require('mongoose');
// const { Blog, blogModel } = require('./blog');

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
    blogs: [
      {
        id: { type: Number, default: 1 },
        Title: { type: String, default: '' },
        Content: { type: String, default: '' },
        Tags: { type: String, default: '' },
        Author: { type: String, default: '' },
        Comments: [{ commenter: { type: String }, comment: { type: String } }],
      },
    ],
    created: {
      type: Date,
      default: Date.now,
    },
    update: {
      type: Date,
      default: Date.now,
    },
  },
  {
    collection: 'users',
  }
);

module.exports.User = mongoose.model('User', User);
