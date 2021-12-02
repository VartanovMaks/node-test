const { Film } = require('../dataBase');

module.exports = {
  getFilmViewsNumber: async (req, res, next) => {
    try {
      const { filmId } = req.body;
      const film = await Film.findById({ _id: filmId }, {
        createdAt: 0, updatedAt: 0, __v: 0,
      });
      if (!film) {
        throw new Error(`film with id:${filmId} not found`);
      }
      req.viewsNumber = film.viewsNumber;
      next();
    } catch (e) {
      next(e);
    }
  },
  incFilmViewsNumber: async (req, res, next) => {
    try {
      const { filmId } = req.body;
      let { viewsNumber } = req;
      viewsNumber += 1;
      const film = await Film.findOneAndUpdate(
        { _id: filmId },
        { viewsNumber },
        { new: true },
      );
      //   console.log('incFilmViewsNumber film data', film);
      if (!film) {
        throw new Error(`film with id:${filmId} not updated`);
      }
      next();
    } catch (e) {
      next(e);
    }
  },
};
