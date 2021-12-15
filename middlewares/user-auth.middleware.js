const { responseCodesEnum } = require('../constants');
const { ENV_CONSTANT: { TOKEN_TYPE } } = require('../constants');
const { OAuth, User } = require('../dataBase');
const { ErrorHandler, errorMessages } = require('../errors');
const { passwordHasher } = require('../services');
const { authService } = require('../services');
const { userLoginValidator } = require('../validators');

module.exports = {

  checkUserAuthValidity: (req, res, next) => {
    try {
      const { error } = userLoginValidator.authUser.validate(req.body);
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

  checkPassAndEmail: async (req, res, next) => {
    try {
      const { email, password } = req.body;

      const user = await User.findOne({ email });

      if (!user) {
        throw new ErrorHandler(
          responseCodesEnum.WRONG_PASSWORD_OR_EMAIL,
          errorMessages.WRONG_EMAIL_OR_PASSWORD.message,
          errorMessages.WRONG_EMAIL_OR_PASSWORD.code,
        );
      }
      await passwordHasher.compare(user.password, password);
      req.user = user;
      next();
    } catch (e) {
      next(e);
    }
  },

  checkAccessToken: async (req, res, next) => {
    try {
      const accessToken = req.get('Authorization');
      if (!accessToken) {
        throw new ErrorHandler(
          responseCodesEnum.UNAUTHORIZED,
          errorMessages.NO_TOKEN.message,
          errorMessages.NO_TOKEN.code,
        );
      }
      const userData = await authService.verifyToken(accessToken);

      if (!userData) {
        throw new ErrorHandler(
          responseCodesEnum.UNAUTHORIZED,
          errorMessages.WRONG_TOKEN.message,
          errorMessages.WRONG_TOKEN.code,
        );
      }
      const tokenObject = await OAuth.findOne({ accessToken });

      if (!tokenObject) {
        throw new ErrorHandler(
          responseCodesEnum.UNAUTHORIZED,
          errorMessages.WRONG_TOKEN.message,
          errorMessages.WRONG_TOKEN.code,
        );
      }
      req.user = tokenObject.user;
      req.role = userData.role;
      next();
    } catch (e) {
      next(e);
    }
  },

  checkRefreshToken: async (req, res, next) => {
    try {
      const { refreshToken } = req.cookies;
      if (!refreshToken) {
        throw new ErrorHandler(
          responseCodesEnum.UNAUTHORIZED,
          errorMessages.NO_TOKEN.message,
          errorMessages.NO_TOKEN.code,
        );
      }

      await authService.verifyToken(refreshToken, TOKEN_TYPE.REFRESH);

      const userByToken = await OAuth.findOne({ refreshToken });

      if (!userByToken) {
        throw new ErrorHandler(
          responseCodesEnum.UNAUTHORIZED,
          errorMessages.WRONG_TOKEN.message,
          errorMessages.WRONG_TOKEN.code,
        );
      }

      req.user = userByToken.user;

      next();
    } catch (e) {
      next(e);
    }
  },

};
