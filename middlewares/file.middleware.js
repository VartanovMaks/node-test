const { fileService } = require('./services');

module.exports = {

  checkPoster: (req, res, next) => {
    try {
      req.body = JSON.parse(req.body.data);

      if (req.files && req.files.poster) {
        fileService.checkImageFile(req.files.poster);
        req.poster = req.files.poster;
      }
      next();
    } catch (e) {
      next(e);
    }
  },
  checkActorsPhoto: (req, res, next) => {
    try {
      if (req.files && req.files.actors) {
        const actors = Object.values(req.files.actors);
        if (actors) {
          fileService.checkImageFile(actors);
          req.actors = [];
          if (actors.length > 1) req.actors = actors;
          else req.actors[0] = actors;
        }
      }
      next();
    } catch (e) {
      next(e);
    }
  },
  checkImages: (req, res, next) => {
    try {
      if (req.files && req.files.images) {
        const { images } = req.files;
        if (images) {
          fileService.checkImageFile(images);
          req.images = [];
          if (images.length > 1) req.images = images;
          else req.images[0] = images;
        }
      }
      next();
    } catch (e) {
      next(e);
    }
  },

};
