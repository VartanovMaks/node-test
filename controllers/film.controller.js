const { Film } = require('../dataBase');
const { responseCodesEnum } = require('../constants');
const { Rating } = require('../dataBase');
const { paginateService } = require('../services');
const {
  CONST: {
    POSTER, ACTORS, IMAGES, DIRECTOR,
  },
} = require('../constants');
const { fileService } = require('../services/file.services');

module.exports = {

  getFilmsCount: async (req, res, next) => {
    try {
      res.json(await Film.countDocuments());
    } catch (e) {
      next(e);
    }
  },

  //* ******************************************
  // getAllFilms: async (req, res, next) => {
  //   try {
  //     if (Object.keys(req.query).length === 0) {
  //       const films = await Film.find({});
  //       res.json(films);
  //     } else {
  //       const { skip, limit } = req.query;
  //       const films = await Film.find(
  //         {},
  //         { name: 1, poster: 1, country: 1 },
  //       )
  //         .limit(+limit)
  //         .skip(+skip);
  //       res.json(films);
  //     }
  //   } catch (e) {
  //     next(e);
  //   }
  // },
  //* ******************************************

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
    try {
      const { filmId } = req.params;

      const result = await Rating.find({ filmId });

      if (result.length !== 0) {
        const aveRating = Math.round((result.map((item) => item.rating)
          .reduce((el, cur) => (el + cur)) / result.length) * 10) / 10;

        await Film.findOneAndUpdate({ _id: filmId }, { rating: aveRating });
      }

      const film = await Film.findById({ _id: filmId }, {
        createdAt: 0, updatedAt: 0, __v: 0,
      });
      if (!film) {
        throw new Error(`film with id:${filmId} not found`);
      }

      res.json(film);
    } catch (e) {
      next(e);
    }
  },
  createFilm: async (req, res, next) => {
    const {
      actors, images, poster, director,
      filmData,
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
    const id = req.params.filmId;
    const {
      deleteActors, deleteDirector, deletePoster, deleteImages,
    } = req.body;

    let actors = [];
    let images = [];
    let poster = [];
    let director = [];

    if (req.files) {
      ({
        actors, images, poster, director,
      } = req.files);
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

    let filmUpdated;
    // try to edit film in base
    try {
      filmUpdated = await Film.findOneAndUpdate({ _id: id }, req.filmData, { new: true });
      if (!filmUpdated) {
        throw new Error(`film with id:${id} was not updated`);
      }
    } catch (e) {
      next(e);
    }

    // if new film data uploaded, delete unnessesary old files. deleteAtors Type - string
    await fileService.deleteImages(deleteActors, ACTORS, id);
    await fileService.deleteImages(deleteImages, IMAGES, id);
    await fileService.deleteImages(deleteDirector, DIRECTOR, id);
    await fileService.deleteImages(deletePoster, POSTER, id);

    // send new photo/images files to server. actors Type - files
    await fileService.uploadImages(images, IMAGES, id);
    await fileService.uploadImages(actors, ACTORS, id);
    await fileService.uploadImages(director, DIRECTOR, id);
    await fileService.uploadImages(poster, POSTER, id);

    res.json(filmUpdated);
  },

  deleteFilmById: async (req, res, next) => {
    const id = req.params.filmId;
    try {
      const filmDeleted = await Film.findByIdAndDelete(id);
      if (!filmDeleted) {
        throw new Error(`film with id:${id} not found in base`);
      }
      fileService.deleteFilmDirectory(id);
      res.json(filmDeleted);
    } catch (e) {
      next(e);
    }
  },

  getFilteredFilms: async (req, res, next) => {
    try {
      const { searchReq: filmsQuery } = req.query;
      const page = +req.query.page;
      const limit = +req.query.limit;
      const { editFilmFlag } = req.query;

      const regexReq = { $regex: filmsQuery, $options: 'i' };

      if (editFilmFlag) {
        const queryFilmsQty = await Film.find({
          $or: [{ name: regexReq }, { year: regexReq }],
        }).countDocuments();

        const filteredFilms = await Film.find({
          $or: [{ name: regexReq }, { year: regexReq }],
        }, { name: 1, year: 1 }).limit(limit).skip((page - 1) * limit);

        filteredFilms.push(queryFilmsQty);
        res.status(responseCodesEnum.SUCCESS).json(filteredFilms);
      } else {
        const films = await Film.find(
          {
            $or: [
              { country: regexReq },
              { name: regexReq },
              { year: regexReq },
              { category: regexReq },
              { 'director.name': regexReq },
              { 'actors.name': regexReq },

            ],
          },
          {
            'actors.name': 1, 'director.name': 1, name: 1, year: 1, country: 1, category: 1,
          },
        );

        res.status(responseCodesEnum.SUCCESS).json(films);
      }
    } catch (e) {
      next(e);
    }
  },

};
