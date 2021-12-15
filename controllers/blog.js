const ObjectID = require('mongodb').ObjectId;
const { Blog } = require('../models/blog');
const { User } = require('../models/user');

module.exports.displayAddPage = (req, res, next) => {
  res.render('blog/add_edit', {
    title: 'Add a Blog',
    blog: '',
    userAuth: req.user,
  });
};

module.exports.processAddPage = (req, res, next) => {
  const newBlog = new Blog({
    title: req.body.title,
    content: req.body.content,
    tags: req.body.tags,
    author: req.body.author,
  });
  console.log(newBlog);

  const updatedUser = new User({
    _id: req.user._id,
    name: req.user.name,
    email: req.user.email,
    username: req.user.username,
    password: req.user.password,
    blogs: req.user.blogs,
    blogs: [
      ...req.user.blogs,
      {
        _id: newBlog._id,
        title: newBlog.title,
        content: newBlog.content,
        tags: newBlog.tags,
        author: newBlog.author,
      },
    ],
  });
  console.log(updatedUser);

  User.updateOne(
    { username: req.user.username },
    { $set: { ...updatedUser } },
    (err, res) => {
      if (err) console.log(err);
      console.log(res);
    }
  );

  res.redirect('/');
};

module.exports.displayEditPage = async (req, res, next) => {
  let id = req.params.id;

  const findBlog = await User.findOne({ 'blogs._id': id }, 'blogs.$');
  if (findBlog) {
    const blog = findBlog.blogs[0];
    res.render('blog/add_edit', {
      title: 'Edit Blog',
      blog: blog,
      userAuth: req.user,
    });
  }
};

module.exports.processEditPage = async (req, res, next) => {
  let id = req.params.id;

  const newBlog = await new Blog({
    _id: id,
    title: req.body.title,
    content: req.body.content,
    tags: req.body.tags,
    author: req.body.author,
  });

  await User.findById(req.user._id, (err, usr) => {
    if (err) return err;
    const blog = usr.blogs.id(id);
    blog.set(req.body);

    usr
      .save()
      .then(() => {
        res.redirect('/');
      })
      .catch((err) => {
        console.log(err);
      });
  }).clone();
};

module.exports.performDelete = async (req, res, next) => {
  let id = req.params.id;

  await User.findById(req.user._id, (err, usr) => {
    if (err) return err;
    usr.blogs.id(id).remove();

    usr.save((err, done) => {
      if (err) return err;
      if (done) console.log('remove success');
      res.redirect('/');
    });
  }).clone();

  // Blog.remove({ _id: ObjectID(id) }, (err) => {
  //   if (err) {
  //     return console.error(err);
  //   } else {
  //     res.redirect('/');
  //   }
  // });
};
