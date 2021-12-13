const router = require('express').Router();
const { filmsSearchController } = require('../controllers');

router.post('/',
  filmsSearchController.getFilteredFilms);
module.exports = router;
