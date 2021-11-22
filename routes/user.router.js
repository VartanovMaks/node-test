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
  userMiddleWare.checkUsersRole,
  userController.deleteUserById);

router.put('/:userId',
  userMiddleWare.checkUserValidity,
  userMiddleWare.checkIsUserExist,
  userController.updateUserById);

router.get('/:userId',
  userAuthMiddleWare.checkAccessToken,
  userMiddleWare.checkIsUserExist,
  userController.getUserById);

module.exports = router;
