const express = require("express");
const cors = require("cors");
require("dotenv").config();
const { connectToMongoDB } = require("./database");
const path = require("path");

// create an instance of express called app
const app = express();

// CORS configuration
const corsOptions = {
  origin: process.env.FRONTEND_URL || "https://bytes-notes-app.onrender.com",
  optionsSuccessStatus: 200,
};

// Use CORS middleware with the defined options
app.use(cors(corsOptions));

// Parse JSON bodies
app.use(express.json());

// import the router
const router = require("./router");

// serve the static files from the React app
app.use(express.static(path.join(__dirname, "../client/build")));

app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/build", "index.html"));
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
