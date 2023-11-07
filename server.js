const express = require("express");
// const fs = require("fs");
const multer = require("multer");
const books = require("./books.json");

const port = 3000;
const server = express();

const getImageName = (title, mimetype) => {
  fileExtension = mimetype.split("/")[1];
  const imageName = title.toLowerCase().trim();
  imageName.replaceAll(" ", "-");
  return `${imageName}.${fileExtension}`;
};

const storage = multer.diskStorage({
  destination: "./images/",
  filename: function ({ body: { title } }, { mimetype }, cb) {
    cb(null, getImageName(title, mimetype));
  },
});

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

server.post("/", upload.single("image"), ({ body, file }, res) => {
  console.log("add book");
  res.end();
});

// will be usefull later
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
