const router = require('express').Router();

const filmController = require('../controllers/film.controller');
const { filmMiddleware, fileMiddleware } = require('../middlewares');

router.get('/', filmController.getAllFilms);
router.get('/:filmID', filmController.getFilmById);

router.post('/:filmID',
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

router.delete('/:filmID',
  filmController.deleteFilmById);

module.exports = router;
