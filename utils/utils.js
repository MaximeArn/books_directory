delete require.cache[require.resolve("../books.json")];
const books = require("../books.json");

module.exports = {
  getImageName: (title, mimetype) => {
    fileExtension = mimetype.split("/")[1];
    const imageName = title.toLowerCase().trim();
    imageName.replaceAll(" ", "-");
    return `${imageName}.${fileExtension}`;
  },

  getId: () => {
    lastBook = books[books.length - 1];
    return lastBook.id + 1;
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
