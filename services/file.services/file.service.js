const fs = require('fs');
const path = require('path');
const { CONST: { IMG_MIMETYPES, IMG_MAX_SIZE } } = require('../../constants');

module.exports = {
  checkImageFile: (imgFilesArr) => {
    let arr = [];
    // console.log('checkImageFile', imgFilesArr);
    if (!(Array.isArray(imgFilesArr))) arr[0] = imgFilesArr;
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

    // // eslint-disable-next-line no-bitwise
    // fs.access(imageDirectory, fs.constants.R_OK | fs.constants.W_OK, (error) => {
    //   if (!error) {
    //     console.log('Directory ', imageDirectory, ' doesn\'t exists.');
    //   } else {
    //     console.log('Directory ', imageDirectory, ' can be edited');
    //   }
    // });

    if (imgFilesArr !== undefined) {
      let arr = [];

      if (!(Array.isArray(imgFilesArr))) arr[0] = imgFilesArr;
      else arr = imgFilesArr;

      arr.forEach((element) => {
        const fullPath = path.join(imageDirectory, element.name);
        fs.access(fullPath, fs.F_OK, async (err) => {
          if (err) {
            console.log('uploadImages. file ', element.name, 'will be uploaded');
            try {
              await element.mv(fullPath);
            } catch (error) {
              console.log('uploadImages', error.message);
            }
          } else {
            console.error('uploadImages. file ', element.name, 'already exists in base');
          }
        });
      });
    }
  },
  deleteImages: async (imgFilesArr, imgCategory, id) => {
    const pathWithinBase = path.join(id.toString(), imgCategory);
    const imageDirectory = path.join(process.cwd(), 'data', pathWithinBase);
    if (imgFilesArr !== undefined) {
      let arr = [];
      if (!(Array.isArray(imgFilesArr))) arr[0] = imgFilesArr;
      else arr = imgFilesArr;
      arr.forEach((element) => {
        const fullPath = path.join(imageDirectory, element);
        fs.unlink(fullPath, (error) => {
          if (error) {
            console.log('deleteImages', error.message);
          } else { console.log('file', element, 'was successfully deleted'); }
        });
      });
    }
  },
};
