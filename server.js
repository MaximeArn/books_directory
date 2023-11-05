const express = require("express");
const fs = require("fs");
const books = require("./books.json");

const port = 3000;
const server = express();

server.get("/", (req, res) => {
  res.send(books);
});

server.get("/book/:id", ({ params: { id } }, res) => {
  console.log(id);
  const book = books.find((book) => String(book.id) === id);
  console.log(book);
  res.send(book);
});

// server.get("/map", (req, res) => {
//   books_with_id = books.map((book, index) => {
//     book.id = index;
//     return book;
//   });
//   console.log(books_with_id);
//   res.end();
//   fs.writeFile("./books_with_id.json", JSON.stringify(books_with_id), () => {
//     console.log("done");
//   });
// });

server.listen(port, () => {
  console.log(`server is listening on port : ${port}`);
});
