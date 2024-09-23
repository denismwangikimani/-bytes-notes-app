// server/index.js
// Import express and cors
const express = require("express");
const cors = require("cors");
require("dotenv").config();
import { connectToMongoDB } from "./database";
import { join } from "path";

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
app.use(json());

// Import the router
import router from "./router";

// Use /api as the base route for our router
app.use("/api", router);

// Serve the static files from the React app
if (process.env.NODE_ENV === "production") {
  app.use(express.static(join(__dirname, "build")));

  // Handle React routing, return all requests to React app
  app.get("*", (req, res) => {
    res.sendFile(join(__dirname, "build", "index.html"));
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
