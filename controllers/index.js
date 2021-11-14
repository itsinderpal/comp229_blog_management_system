const ObjectID = require("mongodb").ObjectId;
let Blog = require("../models/blog");

module.exports.blogList = function (req, res, next) {
	Blog.find((err, blogList) => {
		if (err) {
			return console.error(err);
		} else {
			res.render("index", {
				title: "Blog Management System",
				blogs: blogList,
			});
		}
	});
};
