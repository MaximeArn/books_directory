const express = require("express");
const multer = require("multer");
const fs = require("fs");

const logger = require("./errors/logger");
const { getImageName, checkMissingInformation } = require("./utils/utils");
const { deleteImage } = require("./utils/utils_images");
const {
  getBooks,
  getBookById,
  createBook,
  deleteBook,
  feedDatabase,
  updateBook,
} = require("./db/queries");
const errorsMiddleware = require("./errors/errorsMiddleware");
const CustomError = require("./errors/customError");

require("dotenv").config();
const port = process.env.PORT;
const server = express();

/* 
multer is parsing the multiforms and store the contentin the body of the request.
without it the body is undefined 
the data from a multipart are sent as a Stream and multer is listening to this stream through busboy   
*/

const storage = multer.diskStorage({
  destination: "./images/",
  filename: function ({ body: { title } }, file, cb) {
    try {
      if (!title) {
        throw new Error(
          "lors de l'upload d'une image le shamp 'title' est requis."
        );
      }
      const imageName = getImageName(title, file.mimetype);
      cb(null, imageName);
      logger.info(`Storing image: ${imageName}`);
    } catch (error) {
      cb(error);
    }
  },
});

// instantiate the multer middleware with the diskStorageOptions
const upload = multer({ storage: storage });

server.get("/", getBooks);
server.get("/getServerStatus", (req, res, next) => {
  try {
    res.send(process.uptime());
  } catch (error) {}
});
server.get("/book/:id", getBookById);
server.post("/feedDb", feedDatabase);
server.post("/", upload.single("image"), createBook);
server.delete("/book/:id", deleteBook);
server.patch("/book/:id", upload.single("image"), updateBook);

server.use(errorsMiddleware);

server.listen(port, () => {
  logger.info(`server is listening on port : ${port}`);
});
