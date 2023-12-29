const express = require("express");
const multer = require("multer");
const fs = require("fs");

const {
  getImageName,
  getUpdatedBooks,
  parseBookObject,
} = require("./utils/utils");
const { deleteImage } = require("./utils/utils_images");
const {
  getBooks,
  getBookById,
  createUser,
  deleteUser,
  feedDatabase,
  updateUser,
} = require("./db/queries");
const errorsMiddleware = require("./errors/errorsMiddleware");

const port = 3000;
const server = express();

/* 
multer is parsing the multiforms and store the contentin the body of the request.
without it the body is undefined 
the data from a multipart are sent as a Stream and multer is listening to this stream through busboy   
*/
// config of the diskStorageOptions
const storage = multer.diskStorage({
  destination: "./images/",
  filename: function ({ body: { title } }, { mimetype }, cb) {
    cb(null, getImageName(title, mimetype));
  },
});

// instantiate the multer middleware with the diskStorageOptions
const upload = multer({ storage: storage });

server.get("/", getBooks);
server.get("/book/:id", getBookById);
server.post("/feedDb", feedDatabase);
server.post("/", upload.single("image"), createUser);
server.delete("/book/:id", deleteUser);
server.patch("/book/:id", upload.single("image"), updateUser);

server.use(errorsMiddleware);

server.listen(port, () => {
  console.log(`server is listening on port : ${port}`);
});
