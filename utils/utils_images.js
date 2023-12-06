const { join } = require("path");

module.exports = {
  getImageName: (title, mimetype) => {
    const fileExtension = mimetype.split("/")[1];
    const imageName = title.toLowerCase().trim();
    imageName.replaceAll(" ", "-");
    return `${imageName}.${fileExtension}`;
  },

  deleteImage: (imagePath) => {
    console.log(imagePath);
    imagePath = join(__dirname, imagePath);
  },
};
