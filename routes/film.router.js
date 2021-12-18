const router = require('express').Router();

const filmController = require('../controllers/film.controller');
const { filmMiddleware, fileMiddleware } = require('../middlewares');

router.get('/',
  filmController.getAllFilms);
// ****************************************
router.get('/count',
  filmController.getFilmsCount);
// ***************************************

router.get('/:filmId',
  filmController.getFilmById);

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
