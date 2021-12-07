const router = require('express').Router();
const { ratingController } = require('../controllers');

router.put('/',
  ratingController.createRating);

router.get('/:combId',
  ratingController.getRatingById);

module.exports = router;
