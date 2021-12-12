module.exports.handleLogout = function (req, res, next) {
  res.clearCookie('token');
  res.redirect('/login');
};
