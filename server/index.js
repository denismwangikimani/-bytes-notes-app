// import express
const express = require("express");
const cors = require("cors");
require("dotenv").config();
const { connectToMongoDB } = require("./database");
const path = require('path')

// create an instance of express called app
const app = express();

// Use CORS middleware to allow cross-origin requests
app.use(cors(), express.json());

// import the router
const router = require("./router");

// serve the static files from the React app
app.use(express.static(path.join(__dirname, 'build')));
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, 'build/index.html'));
});

// use /api as the base route for our router
app.use("/api", router);

// create a port variable
const port = process.env.PORT || 5000;

// listen to our server on our localhost
const startServer = async () => {
  await connectToMongoDB();
  app.listen(port, () => {
    console.log(`Server is listening on http://localhost:${port}`);
  });
};
startServer();
