const upload = require("strapi-plugin-upload/services/image-manipulation");

delete upload["generateThumbnail"];

upload.generateThumbnail = function () {
  return null;
};

module.exports = upload;
