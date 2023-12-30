delete require.cache[require.resolve("../books.json")];
const books = require("../books.json");
const CustomError = require("../errors/customError");

module.exports = {
  getImageName: (title, mimetype) => {
    fileExtension = mimetype.split("/")[1];
    let imageName = title.toLowerCase().trim();
    imageName = imageName.replaceAll(" ", "-");
    return `${imageName}.${fileExtension}`;
  },

  getUpdatedBooks: () => {
    delete require.cache[require.resolve("../books.json")];
    return require("../books.json");
  },

  parseBookObject: (book) => {
    const fieldsToParse = ["pages", "year"];
    fieldsToParse.forEach((field) => {
      if (book.hasOwnProperty(field)) {
        book[field] = Number.parseInt(book[field]);
      }
    });
    return book;
  },
};
