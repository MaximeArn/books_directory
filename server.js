const express = require("express");

const port = 3000;
const server = express();

server.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

server.listen(port, () => {
  console.log(`server is listening on port : ${port}`);
});
