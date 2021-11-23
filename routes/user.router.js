const router = require('express').Router();
const { userController } = require('../controllers');
const { userMiddleWare, userAuthMiddleWare } = require('../middlewares');

router.get('/',
  userAuthMiddleWare.checkAccessToken,
  userController.getAllUsers);

router.post('/',
  userMiddleWare.checkUserValidity,
  userMiddleWare.checkIsEmailExist,
  userController.registerUser);

router.delete('/:userId',
  userAuthMiddleWare.checkAccessToken,
  userMiddleWare.checkIsUserExist,
  userMiddleWare.checkIsUsersAdmin,
  userController.deleteUserById);

router.put('/:userId',
  userAuthMiddleWare.checkAccessToken,
  userMiddleWare.checkIsUserExist,
  userMiddleWare.checkIsUsersAdmin,
  userController.updateUserById);

router.get('/:userId',
  userAuthMiddleWare.checkAccessToken,
  userMiddleWare.checkIsUserExist,
  userController.getUserById);

module.exports = router;
