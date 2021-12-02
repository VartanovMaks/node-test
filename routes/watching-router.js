const router = require('express').Router();
const { watchingController } = require('../controllers');
const { watchingMiddleWare } = require('../middlewares');

router.post('/',
  watchingMiddleWare.getFilmViewsNumber,
  watchingMiddleWare.incFilmViewsNumber,
  watchingController.createWatching);

module.exports = router;
