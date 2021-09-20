const filmValidator = require('../validators/film/film.validator');

module.exports = {
  checkFilmValidity: (req, res, next) => {
    try {
      console.log('checkFilmValidity', req.body);
      const { error } = filmValidator.createFilm.validate(req.body);

      if (error) {
        throw new Error(error.details[0].message);
      }
      next();
    } catch (e) {
      next(e);
    }
  },
};
