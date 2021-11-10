const filmValidator = require('../validators/film/film.validator');

module.exports = {
  checkFilmValidity: (req, res, next) => {
    try {
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
