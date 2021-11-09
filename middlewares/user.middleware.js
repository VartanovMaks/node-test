const { errorMessages, ErrorHandler } = require('../errors');
const { responseCodesEnum } = require('../constants');
const { userRegisterValidator } = require('../validators');
const { User } = require('../dataBase');

module.exports = {
  checkIsEmailExist: async (req, res, next) => {
    try {
      const { email } = req.body;
      const userByEmail = await User.findOne({ email });
      if (userByEmail) {
        throw new ErrorHandler(
          responseCodesEnum.UNAUTHORIZED,
          errorMessages.EMAIL_ALREADY_EXIST.message,
          errorMessages.EMAIL_ALREADY_EXIST.code,
        );
      }
      next();
    } catch (e) {
      next(e);
    }
  },

  checkUserValidity: (req, res, next) => {
    try {
      const { error } = userRegisterValidator.registerUser.validate(req.body);

      if (error) {
        throw new ErrorHandler(
          responseCodesEnum.BAD_REQUEST,
          error.details[0].message,
          errorMessages.WRONG_DATA.code,
        );
      }
      next();
    } catch (e) {
      next(e);
    }
  },

  checkIsUserExist: async (req, res, next) => {
    try {
      const { userId } = req.params;

      const userById = await User.findById(userId);

      if (!userById) {
        throw new ErrorHandler(
          responseCodesEnum.BAD_REQUEST,
          errorMessages.USER_NOT_FOUND.message,
          errorMessages.USER_NOT_FOUND.code,
        );
      }
      req.user = userById;

      next();
    } catch (error) {
      next(error);
    }
  },
};
