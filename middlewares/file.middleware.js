module.exports = {

  checkPoster: (req, res, next) => {
    try {
      const files = Object.values(req.files);
      //   const text = Object.values(req.text);
      console.log(files);
      console.log('========================');
      const film = JSON.parse(req.body.data);
      req.body = film;
      console.log(req.body);
      next();
    } catch (e) {
      next(e);
    }
  },
  checkActorsPhoto: (req, res, next) => {
    try {
      next();
    } catch (e) {
      next(e);
    }
  },
  checkImages: (req, res, next) => {
    try {
      next();
    } catch (e) {
      next(e);
    }
  },

};
