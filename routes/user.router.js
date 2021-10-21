const router = require('express').Router();
const { userController } = require('../controllers');
const { userMiddleWare } = require('../middlewares');

router.get('/', userController.getAllUsers);

router.post('/',
  userMiddleWare.checkUserValidity,
  userMiddleWare.checkIsEmailExist,
  userController.registerUser);

router.delete('/:userId', userMiddleWare.checkIsUserExist, userController.deleteUserById);

router.put('/:userId',
  userMiddleWare.checkUserValidity,
  userMiddleWare.checkIsUserExist,
  userController.updateUserById);

router.get('/:userId', userMiddleWare.checkIsUserExist, userController.getUserById);

module.exports = router;
