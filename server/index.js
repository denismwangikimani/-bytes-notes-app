// import express
const express = require("express");

// create an instance of express called app
const app = express();

// create a test router
app.get("/hello", (req, res) => {
    res.status(200).json({ mssg: "hello" });
});

// create a port variable
const port = 5000;

// listen to our server on our localhost
app.listen(port, () => {
    console.log(`Server is listening on http://localhost:${port}`);
})