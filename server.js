const express = require("express");
const multer = require("multer");
const fs = require("fs");

const books = require("./books.json");
const { getImageName, getId } = require("./utils/utils");

const port = 3000;
const server = express();

// config of the diskStorageOptions
const storage = multer.diskStorage({
  destination: "./images/",
  filename: function ({ body: { title } }, { mimetype }, cb) {
    cb(null, getImageName(title, mimetype));
  },
});

// instantiate the multer middleware with the diskStorageOptions
const upload = multer({ storage: storage });

server.get("/", (req, res) => {
  res.send(books);
});

server.get("/book/:id", ({ params: { id } }, res) => {
  console.log(id);
  const book = books.find((book) => String(book.id) === id);
  console.log(book);
  res.send(book);
});

/* 
multer is parsing the multiforms and store the contentin the body of the request.
without it the body is undefined 
the data from a multipart are sent as a Stream and multer is listening to this stream through busboy   
*/

server.post("/", upload.single("image"), ({ body, file: { path } }, res) => {
  // TODO: check why it's only possible to push one
  body.imageLink = path;
  body.pages = Number.parseInt(body.pages);
  body.year = Number.parseInt(body.year);
  body.id = getId();

  newList = [...books, body];
  console.log(newList);
  fs.writeFile("./books2.json", JSON.stringify(newList), () => {
    console.log(`${body.title} added to the list !`);
  });
  res.end();
});

server.listen(port, () => {
  console.log(`server is listening on port : ${port}`);
});
