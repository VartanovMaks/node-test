const router = require('express').Router();
const { userSearchController } = require('../controllers');

router.post('/',
  userSearchController.getFilteredUsers);

module.exports = router;
