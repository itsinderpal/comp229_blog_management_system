module.exports.displayRegister = function (req, res, next) {
	res.render("register", {
		title: "Register",
		blogs: blogList,
	});
};
