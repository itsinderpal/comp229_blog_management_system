module.exports.displayLogin = function (req, res, next) {
	res.render("login", {
		title: "Loginnn",
		blogs: blogList,
	});
};
