//we will use express router to handle the endpoint between the server and the client.
//we will have get, post, put, and delete endpoints.
const express = require("express");
// create an instance of our router
const router = express.Router();
// import the getCollection function from our models
const { getCollection } = require("./models/index");
// import ObjectId from mongodb so as to use it to query the database
const { ObjectId } = require("mongodb");

//get todos
// GET /todos
router.get("/todos", async (req, res) => {
  const collection = getCollection();
  const todos = await collection.find({}).toArray();

  res.status(200).json(todos);
});

// POST /todos
router.post("/todos", async (req, res) => {
  const collection = getCollection();
  let { todo } = req.body;

  todo = JSON.stringify(todo);

  const newTodo = await collection.insertOne({ todo, status: false });

  res.status(201).json({ todo, status: false, _id: newTodo.insertedId });
});

// DELETE /todos/:id
router.delete("/todos/:id", async (req, res) => {
  const collection = getCollection();
  const _id = new ObjectId(req.params.id);

  const deletedTodo = await collection.deleteOne({ _id });
  res.status(200).json(deletedTodo);
});

// PUT /todos/:id
router.put("/todos/:id", async (req, res) => {
  const collection = getCollection();
  const _id = new ObjectId(req.params.id);
  const { status } = req.body;

  if (typeof status !== "boolean") {
    return res.status(400).json({ mssg: "invalid status" });
  }

  const updatedTodo = await collection.updateOne(
    { _id },
    { $set: { status: !status } }
  );
  res.status(200).json(updatedTodo);
});

//export the router
module.exports = router;
