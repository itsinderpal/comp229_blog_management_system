let mongoose = require('mongoose');

let blogModel = mongoose.Schema(
  {
    Title: {
      type: String,
      default: '',
    },
    Content: {
      type: String,
      default: '',
    },
    Tags: {
      type: String,
      default: '',
    },
    Author: {
      type: String,
      default: '',
    },
    Comments: [String],
  },
  {
    collection: 'blogs',
  }
);

const Blog = mongoose.model('Blog', blogModel);

module.exports = { Blog, blogModel };
