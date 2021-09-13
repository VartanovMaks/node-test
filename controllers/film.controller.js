/* eslint-disable linebreak-style */
const { Film } = require('../dataBase/index');

module.exports = {

  getAllFilms: async (req, res, next) => {
    try {
      const films = await Film.find({});
      res.json(films);
    } catch (e) {
      next(e);
    }
  },

  getFilmById: async (req, res, next) => {
    const id = req.params.filmID;
    try {
      const film = await Film.findById(id);
      if (!film) {
        throw new Error(`film with id:${id} not found`);
      }
      res.json(film);
    } catch (e) {
      next(e);
    }
  },
  createFilm: async (req, res, next) => {
    const { body: filmData } = req;

    try {
      const film = await Film.create(filmData);

      if (!film) {
        throw new Error(`film with id:${filmData.name} could not be created`);
      }
      res.json(film);
    } catch (e) {
      next(e);
    }
  },
};
