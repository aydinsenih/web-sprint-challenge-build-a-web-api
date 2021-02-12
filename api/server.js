const express = require("express");
const server = express();
const helmet = require("helmet");
const cors = require("cors");

const actionsRouter = require("./actions/actions-router");
const postRouter = require("./projects/projects-router");

// Complete your server here!
// Do NOT `server.listen()` inside this file!

server.use(helmet());
server.use(express.json());
server.use(cors());

server.use("/api/actions", actionsRouter);
server.use("/api/projects", postRouter);

server.get("/", (req, res) => {
    res.send("<h2>Welcome to the API</h2>");
});

module.exports = server;
