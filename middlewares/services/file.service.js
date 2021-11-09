const fs = require('fs');
const path = require('path');
const { CONST: { IMG_MIMETYPES, IMG_MAX_SIZE } } = require('../../constants');

module.exports = {
  checkImageFile: (imgFilesArr) => {
    let arr = [];
    console.log('checkImageFile', imgFilesArr);
    if (!(Array.isArray(imgFilesArr))) arr.push(imgFilesArr);
    else arr = imgFilesArr;
    // console.log('checkImageFile', arr);
    arr.forEach((element) => {
      const { name, size, mimetype } = element;

      if (IMG_MIMETYPES.includes(mimetype)) {
        if (size > IMG_MAX_SIZE) {
          throw new Error(`File ${name} is too big`);
        }
      } else {
        throw new Error(`File ${name} is not photo/images file`);
      }
    });
  },

  uploadImages: async (imgFilesArr, imgCategory, id) => {
    const pathWithinBase = path.join(id.toString(), imgCategory);
    const imageDirectory = path.join(process.cwd(), 'data', pathWithinBase);

    fs.access(imageDirectory, (error) => {
      if (!error) {
        console.log('Directory ', imageDirectory, ' already exists.');
      }
    });

    if (imgFilesArr !== undefined) {
      let arr = [];

      if (!(Array.isArray(imgFilesArr))) arr[0] = imgFilesArr;
      else arr = imgFilesArr;
      console.log('uploadImages', imgFilesArr);

      arr.forEach(async (element) => {
        const fullPath = path.join(imageDirectory, element.name);
        await element.mv(fullPath);
      });
    }
  },
};
