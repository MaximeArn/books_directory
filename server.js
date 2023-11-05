const express = require("express");
const fs = require("fs");
const books = require("./books.json");

const port = 3000;
const server = express();

server.get("/", (req, res) => {
  res.send(books);
});

server.get("/:id", ({ params: { imageLink } }, res) => {
  console.log(imageLink);
  const book = data.find((book) => book.imageLink === imageLink);
  res.send(book);
});

server.listen(port, () => {
  console.log(`server is listening on port : ${port}`);
});
