const router = require('express').Router();

const { userAuthController } = require('../controllers');
const { userAuthMiddleWare } = require('../middlewares');

router.post('/login',
  userAuthMiddleWare.checkUserAuthValidity,
  userAuthMiddleWare.checkPassAndEmail,
  userAuthController.userLogin);

router.post('/logout',
  userAuthMiddleWare.checkAccessToken,
  userAuthController.userLogout);

router.get('/refresh',
  userAuthMiddleWare.checkRefreshToken,
  userAuthController.userRefresh);

module.exports = router;
