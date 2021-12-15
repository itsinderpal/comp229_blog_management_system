const mongoose = require('mongoose');

const blogModel = mongoose.Schema({
  title: {
    type: String,
    default: '',
    required: true,
  },
  content: {
    type: String,
    default: '',
    required: true,
  },
  tags: {
    type: String,
    default: '',
    required: true,
  },
  author: {
    type: String,
    default: '',
    required: true,
  },
});

const Blog = mongoose.model('Blog', blogModel);

module.exports = { Blog, blogModel };
