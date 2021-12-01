const router = require('express').Router();
const { ratingController } = require('../controllers');

router.put('/',
  ratingController.createRating);

module.exports = router;
