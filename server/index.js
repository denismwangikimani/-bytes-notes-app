// server/index.js
const express = require("express");
const cors = require("cors");
require("dotenv").config();
const { connectToMongoDB } = require("./database");
const path = require("path");

// Create an instance of express
const app = express();

// Configure CORS
if (process.env.NODE_ENV === "production") {
  // In production, frontend and backend are on the same origin
  app.use(cors());
} else {
  // In development, allow requests from frontend's dev server
  app.use(
    cors({
      origin: "http://localhost:3000",
    })
  );
}

// Middleware to parse JSON
app.use(express.json());

// Import the router
const router = require("./router");

// Use /api as the base route for our router
app.use("/api", router);

// Serve the static files from the React app
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "build")));

  // Handle React routing, return all requests to React app
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "build", "index.html"));
  });
}

// Create a port variable
const port = process.env.PORT || 5000;

// Start the server
const startServer = async () => {
  await connectToMongoDB();
  app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
  });
};

startServer();
