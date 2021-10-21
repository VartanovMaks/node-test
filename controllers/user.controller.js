const { passwordHasher } = require('../services');
const { responseCodesEnum } = require('../constants');
const { User } = require('../dataBase');

module.exports = {

  getAllUsers: async (req, res, next) => {
    try {
      console.log('get All Users');
      const users = await User.find({});
      res.status(responseCodesEnum.SUCCESS).json(users);
    } catch (error) {
      next(error);
    }
  },

  registerUser: async (req, res, next) => {
    try {
      const { password } = req.body;

      const hashedPassword = await passwordHasher.hash(password);

      const createdUser = await User.create({ ...req.body, password: hashedPassword });

      res.status(responseCodesEnum.CREATED).json(createdUser);
    } catch (error) {
      console.log('USER_CONTR', error.name, error.code, error.message);
      next(error);
    }
  },

  deleteUserById: async (req, res, next) => {
    try {
      const { userId } = req.params;
      await User.findByIdAndDelete(userId);
      res.status(responseCodesEnum.DELETED_SUCCESSFULL).json('deleted successfull');
    } catch (error) {
      next(error);
    }
  },

  getUserById: (req, res, next) => {
    try {
      const { user } = req;
      console.log('USERBYID', user);
      res.status(responseCodesEnum.SUCCESS).json(user);
    } catch (error) {
      next(error);
    }
  },

  updateUserById: async (req, res, next) => {
    try {
      const { userId } = req.params;
      const { email } = req.body;

      await User.findByIdAndUpdate(userId, { email }, { new: true });
      res.status(responseCodesEnum.UPDATED_SUCCESSFULL).json('update successfull');
    } catch (error) {
      next(error);
    }
  },
};
