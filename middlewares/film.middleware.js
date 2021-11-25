const filmValidator = require('../validators/film/film.validator');
const ErrorHandler = require('../errors/ErrorHandler');
const { WRONG_DATA } = require('../errors/error-messages');

module.exports = {
  checkFilmValidity: (req, res, next) => {
    try {
      const { error } = filmValidator.createFilm.validate(req.filmData);

      if (error) {
        throw new ErrorHandler(400, error.details[0].message, WRONG_DATA.code);
      }
      next();
    } catch (e) {
      next(e);
    }
  },
};
