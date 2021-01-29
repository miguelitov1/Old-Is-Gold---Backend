"use strict";

require("dotenv").config();

const server = require("./server");

const port = process.env.SERVER_PORT || 3081;

server.listen(port, ()=> console.log(`Listening ${port}...`);)