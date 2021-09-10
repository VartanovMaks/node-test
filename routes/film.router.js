/* eslint-disable linebreak-style */
const router = require('express').Router();

const filmController = require('../controllers/film.controller');
const { filmMiddleware } = require('../middlewares');

router.get('/', filmController.getAllFilms);
router.get('/:filmID', filmController.getFilmById);
router.post('/', filmMiddleware.checkFilmValidity, filmController.createFilm);

module.exports = router;
