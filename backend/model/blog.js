const mongoose = require("mongoose");

const Blog = mongoose.model(
  "Blog",
  {
    title: { type: String, required: true },
    content: { type: String, required: true },
  },
  "blogs"
);

module.exports = { Blog };
