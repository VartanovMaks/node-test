const { fileService } = require('./services');

module.exports = {

  checkPoster: (req, res, next) => {
    try {
      req.body = JSON.parse(req.body.data);

      if (req.files && req.files.poster) {
        console.log('checking poster file image', req.files.poster.name);
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
        // const actors = Object.values(req.files.actors);
        const { actors } = req.files;
        console.log('checking actors files image', actors);
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
  checkDirectorsPhoto: (req, res, next) => {
    try {
      if (req.files && req.files.director) {
        console.log('checkDirectorsPhoto', req.files.director);
        // const director = Object.values(req.files.director);
        const { director } = req.files;
        console.log('checking directors files image', director);
        if (director) {
          fileService.checkImageFile(director);
          req.director = [];
          if (director.length > 1) req.director = director;
          else req.director[0] = director;
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
          console.log('checking images files ', images);
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
