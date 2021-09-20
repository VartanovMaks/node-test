const router = require('express').Router();

const filmController = require('../controllers/film.controller');
const { filmMiddleware, fileMiddleware } = require('../middlewares');

router.get('/', filmController.getAllFilms);
router.get('/:filmID', filmController.getFilmById);
router.post('/',
  fileMiddleware.checkPoster,
  fileMiddleware.checkActorsPhoto,
  fileMiddleware.checkImages,
  filmMiddleware.checkFilmValidity,
  filmController.createFilm);
router.post('/file-upload/:filmID',
  filmController.uploadFilmFilesById);

module.exports = router;
