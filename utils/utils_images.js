const { join } = require("path");
const fs = require("fs");

module.exports = {
  getImageName: (title, mimetype) => {
    const fileExtension = mimetype.split("/")[1];
    const imageName = title.toLowerCase().trim();
    imageName.replaceAll(" ", "-");
    return `${imageName}.${fileExtension}`;
  },

  deleteImage: (imagePath) => {
    imagePath = join(__dirname, "../", imagePath);
    fs.unlink(imagePath, (err) => {
      err
        ? console.log(`Erreur lors de la suppression du fichier : ${err}`)
        : console.log("fichier supprimé avec succès");
    });
  },
};
