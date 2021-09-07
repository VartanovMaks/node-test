/* eslint-disable linebreak-style */
const router = require('express').Router();

const filmController = require('../controllers/film.controller');

router.get('/', filmController.getAllFilms);
router.get('/:filmID', filmController.getFilmById);

module.exports = router;
