// Run this script to launch the server.
// The server should run on localhost port 8000.
// This is where you should start writing server-side code for this application.


const express = require("express");
const session = require("express-session");
const mongoose = require("mongoose");
const cors = require("cors");

const MONGO_URL = "mongodb://127.0.0.1:27017/cinematiq";
const CLIENT_URL = "http://localhost:3000";
const port = 8000;

mongoose.connect(MONGO_URL);

const app = express();

app.use(
    cors({
        credentials: true,
        origin: [CLIENT_URL],
    })
);

app.use(express.json());

const collectionController = require("./controller/collection");
const commentController = require("./controller/comment");
const discussionController = require("./controller/discussion");
const profileController = require("./controller/profile");
const reviewController = require("./controller/review");
const userController = require("./controller/user");

app.use("/collection", collectionController);
app.use("/comment", commentController);
app.use("/discussion", discussionController);
app.use("/profile", profileController);
app.use("/review", reviewController);
app.use("/user", userController);

let server = app.listen(port, () => {
    console.log(`Server starts at http://localhost:${port}`);
});

process.on("SIGINT", () => {
    server.close();
    mongoose.disconnect();
    console.log("Server closed. Database instance disconnected");
    process.exit(0);
});

module.exports = server
