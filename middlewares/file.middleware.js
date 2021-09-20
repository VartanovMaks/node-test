const { fileService } = require('./services');

module.exports = {

  checkPoster: (req, res, next) => {
    try {
      req.body = JSON.parse(req.body.data);
      // const poster = Object.values(req.files.poster);
      // console.log('check Poster', req.files.poster);
      fileService.checkImageFile(req.files.poster);
      req.poster = req.files.poster;
      next();
    } catch (e) {
      next(e);
    }
  },
  checkActorsPhoto: (req, res, next) => {
    const actors = Object.values(req.files.actors);
    // console.log('check Actors', actors);
    // const { actors } = req.files;
    try {
      fileService.checkImageFile(actors);
      req.actors = [];
      if (actors.length > 1) req.actors = actors;
      else req.actors[0] = actors;
      // console.log('checkActorsPhoto = ', req.actors.length, req.actors);
      next();
    } catch (e) {
      next(e);
    }
  },
  checkImages: (req, res, next) => {
    // console.log('check Images', req.files.images);
    const { images } = req.files;
    try {
      fileService.checkImageFile(images);
      req.images = [];
      if (images.length > 1) req.images = images;
      else req.images[0] = images;
      // console.log('checkImages = ', req.images.length, req.images);
      next();
    } catch (e) {
      next(e);
    }
  },

};
