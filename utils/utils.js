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
};
