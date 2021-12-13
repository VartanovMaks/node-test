const router = require('express').Router();
const { watchingController } = require('../controllers');
const { watchingMiddleWare } = require('../middlewares');

router.post('/',
  watchingMiddleWare.getFilmViewsNumber,
  watchingMiddleWare.incFilmViewsNumber,
  watchingController.createWatching);

router.get('/:userId',

  watchingController.getUserWatchings);

module.exports = router;
