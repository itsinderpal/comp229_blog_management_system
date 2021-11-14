let mongoose = require("mongoose");

let blogModel = mongoose.Schema(
	{
		Title: String,
		Content: String,
		Tags: String,
		Author: String,
	},
	{
		collection: "blogs",
	}
);

module.exports = mongoose.model("Blog", blogModel);
