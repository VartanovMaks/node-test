const { Film } = require('../dataBase/index');
const { paginateService } = require('../services');
const {
  CONST: {
    POSTER, ACTORS, IMAGES, DIRECTOR,
  },
} = require('../constants');
const { fileService } = require('../services/file.services');

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
      actors, images, poster, director,
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
      fileService.uploadImages(director, DIRECTOR, _id);
      fileService.uploadImages(poster, POSTER, _id);

      res.json(createdFilm);
    } catch (e) {
      next(e);
    }
  },

  editFilmById: async (req, res, next) => {
    const id = req.params.filmID;
    const {
      // eslint-disable-next-line camelcase
      delete_actors, delete_director, delete_poster, delete_images,
    } = req.body;

    let actors = [];
    let images = [];
    let poster = [];
    let director = [];
    if (req.files) {
      actors = req.files.actors;
      images = req.files.images;
      poster = req.files.poster;
      director = req.files.director;
    }
    // get & store film's previous  version
    try {
      const filmBeforeUpdate = await Film.findById(id);
      if (!filmBeforeUpdate) {
        throw new Error(`film with id:${id} not found in base`);
      }
    } catch (e) {
      next(e);
    }
    // get film's new version
    const film = JSON.parse(req.body.data);
    let filmUpdated;
    // try to edit film in base
    try {
      filmUpdated = await Film.findOneAndUpdate({ _id: id }, film, { new: true });
      if (!film) {
        throw new Error(`film with id:${id} was not updated`);
      }
    } catch (e) {
      next(e);
    }

    // if new film data uploaded, delete unnessesary old files
    fileService.deleteImages(delete_actors, ACTORS, id);
    fileService.deleteImages(delete_images, IMAGES, id);
    fileService.deleteImages(delete_director, DIRECTOR, id);
    fileService.deleteImages(delete_poster, POSTER, id);

    // send new photo/images files to server
    fileService.uploadImages(images, IMAGES, id);
    fileService.uploadImages(actors, ACTORS, id);
    fileService.uploadImages(director, DIRECTOR, id);
    fileService.uploadImages(poster, POSTER, id);

    res.json(filmUpdated);
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
