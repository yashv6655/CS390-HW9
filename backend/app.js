require("./db");
const express = require("express");
const ObjectID = require("mongoose").Types.ObjectId;
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const { Blog } = require("./model/blog");

app.use(bodyParser.json());
app.use(cors());

app.get("/blog", (req, res) => {
  Blog.find((err, docs) => {
    if (!err) {
      res.send(docs);
    } else {
      res.send("Error while getting blogs");
      console.log(
        "Error while retrieving all records : " +
          JSON.stringify(err, undefined, 2)
      );
    }
  });
});

app.post("/blog/create-post", (req, res) => {
  let newBlog = new Blog({
    title: req.body.title,
    content: req.body.content,
  });

  newBlog.save((err, docs) => {
    if (!err) {
      res.send(docs);
    } else {
      res.send("Error while saving new blog post");
      console.log(
        "Error while creating new record : " + JSON.stringify(err, undefined, 2)
      );
    }
  });
});

app.delete("/blog/:id", (req, res) => {
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("No record with given id : " + req.params.id);

  Blog.findByIdAndRemove(req.params.id, (err, docs) => {
    if (!err) res.send(docs);
    else
      console.log(
        "Error while deleting a record : " + JSON.stringify(err, undefined, 2)
      );
  });
});

app.put("/blog/:id", (req, res) => {
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("No record with given id : " + req.params.id);

  const updatedBlog = {
    title: req.body.title,
    content: req.body.content,
  };

  Blog.findByIdAndUpdate(
    { _id: req.params.id },
    { $set: updatedBlog },
    { new: true },
    (err, docs) => {
      if (!err) res.send(docs);
      else
        console.log(
          "Error while updating a record : " + JSON.stringify(err, undefined, 2)
        );
    }
  );
});

app.listen(3001, () => {
  console.log("listening on port 3001");
});
