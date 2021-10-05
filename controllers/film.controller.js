const { Film } = require('../dataBase/index');
const { paginateService } = require('../services');
const { CONST: { POSTER, ACTORS, IMAGES } } = require('../constants');
const { fileService } = require('../middlewares/services');

module.exports = {

  getAllFilms: async (req, res, next) => {
    try {
      if (Object.keys(req.query).length === 0) {
        const films = await Film.find({});
        res.json(films);
      } else {
        paginateService.paginateData(req, res);
        // res.json(res.paginatedResult);
      }
    } catch (e) {
      next(e);
    }
  },

  getFilmById: async (req, res, next) => {
    const id = req.params.filmID;
    try {
      const film = await Film.findById({ _id: id }, {
        createdAt: 0, updatedAt: 0, __v: 0,
      });
      if (!film) {
        throw new Error(`film with id:${id} not found`);
      }
      res.json(film);
    } catch (e) {
      next(e);
    }
  },
  createFilm: async (req, res, next) => {
    const {
      actors, images, poster,
      body: filmData,
    } = req;

    try {
      const createdFilm = await Film.create(filmData);

      if (!createdFilm) {
        throw new Error(`film with id:${filmData.name} could not be created`);
      }
      const { _id } = createdFilm;

      fileService.uploadImages(images, IMAGES, _id);
      fileService.uploadImages(actors, ACTORS, _id);
      fileService.uploadImages(poster, POSTER, _id);

      res.json(createdFilm);
    } catch (e) {
      next(e);
    }
  },
  uploadFilmFilesById: async (req, res, next) => {
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
};
