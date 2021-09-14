const { fileService } = require('./services');

module.exports = {

  checkPoster: (req, res, next) => {
    try {
      req.body = JSON.parse(req.body.data);
      // const poster = Object.values(req.files.poster);
      fileService.checkImageFile(req.files.poster);
      req.poster = req.files.poster;
      next();
    } catch (e) {
      next(e);
    }
  },
  checkActorsPhoto: (req, res, next) => {
    const actors = Object.values(req.files.actors);
    fileService.checkImageFile(actors);
    req.actors = actors;
    try {
      next();
    } catch (e) {
      next(e);
    }
  },
  checkImages: (req, res, next) => {
    const images = Object.values(req.files.images);
    fileService.checkImageFile(images);
    req.images = images;
    try {
      next();
    } catch (e) {
      next(e);
    }
  },

};
