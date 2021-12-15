const router = require('express').Router();

const filmController = require('../controllers/film.controller');
const { filmMiddleware, fileMiddleware } = require('../middlewares');

router.get('/',
  filmController.getAllFilms);

router.get('/search',
  filmController.getFilteredFilms);

router.get('/:filmId',
  filmController.getFilmById);

router.post('/search',
  filmController.getFilteredFilms);

router.post('/:filmId',
  fileMiddleware.checkPoster,
  fileMiddleware.checkActorsPhoto,
  fileMiddleware.checkDirectorsPhoto,
  fileMiddleware.checkImages,
  filmMiddleware.checkFilmValidity,
  filmController.editFilmById);

router.post('/',
  fileMiddleware.checkPoster,
  fileMiddleware.checkActorsPhoto,
  fileMiddleware.checkDirectorsPhoto,
  fileMiddleware.checkImages,
  filmMiddleware.checkFilmValidity,
  filmController.createFilm);

router.delete('/:filmId',
  filmController.deleteFilmById);

module.exports = router;
