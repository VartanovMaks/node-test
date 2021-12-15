const router = require('express').Router();
const { watchingController } = require('../controllers');
const { watchingMiddleWare } = require('../middlewares');
const { userAuthMiddleWare } = require('../middlewares');

router.post('/',
  watchingMiddleWare.getFilmViewsNumber,
  watchingMiddleWare.incFilmViewsNumber,
  watchingController.createWatching);

router.get('/:userId',
  userAuthMiddleWare.checkAccessToken,
  watchingController.getUserWatchings);

router.get('/:filmId/:userId',
  userAuthMiddleWare.checkAccessToken,
  watchingController.getFilmWatchingsByUser);

module.exports = router;
