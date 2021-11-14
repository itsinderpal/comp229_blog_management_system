const ObjectID = require("mongodb").ObjectId;
let Blog = require("../models/blog");

module.exports.displayAddPage = (req, res, next) => {
	res.render("blog/add_edit", { title: "Add a Blog", blog: "" });
};

module.exports.processAddPage = (req, res, next) => {
	const newBlog = new Blog(req.body);
	Blog.create(newBlog);
	res.redirect("/blog/list");
};

module.exports.displayEditPage = (req, res, next) => {
	let id = req.params.id;

	Blog.findById(id, (err, blogEditDisplay) => {
		if (err) {
			return console.error(err);
		} else {
			res.render("blog/add_edit", {
				title: "Edit Blog",
				blog: blogEditDisplay,
			});
		}
	});
};

module.exports.processEditPage = (req, res, next) => {
	let id = req.params.id;

	const updatedBlog = new Blog({ _id: id, ...req.body });
	console.log(updatedBlog);
	Blog.updateOne({ _id: new ObjectID(id) }, { $set: { ...updatedBlog } }, (err, res) => {
		if (err) {
			return console.error(err);
		}
	});
	res.redirect("/blog/list");
};

module.exports.performDelete = (req, res, next) => {
	let id = req.params.id;

	Blog.remove({ _id: ObjectID(id) }, (err) => {
		if (err) {
			return console.error(err);
		} else {
			res.redirect("/blog/list");
		}
	});
};
