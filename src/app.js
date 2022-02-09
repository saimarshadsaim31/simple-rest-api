const express = require("express");
require("./database/connection.js");
const router = require("./router/studentRouter.js");

//initilizing express app
const app = express();

//defining port
const port = 3000;

//defing middleware to parse json
app.use(express.json());

//defining middleware for router
app.use(router);

//listing to the server
app.listen(port, () => {
  console.log("server is running on port " + port);
});
