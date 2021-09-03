const router = require('express').Router();

const filmController = require('../controllers/film.controller');

router.get('/', filmController.getAllFilms);
router.get('/:filmID', filmController.getFilmById);
// router.get('/poster', filmController.getPoster);

module.exports = router;