const mongoose = require("mongoose");

const Blog = mongoose.model(
  "Blog",
  {
    title: { type: String },
    content: { type: String },
  },
  "blogs"
);

module.exports = { Blog };
