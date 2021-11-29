const router = require('express').Router();
const { watchingController } = require('../controllers');

router.post('/', watchingController.createWatching);

module.exports = router;
