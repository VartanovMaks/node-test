const { responseCodesEnum } = require('../constants');
const { OAuth } = require('../dataBase');
const { authService } = require('../services');
const { errorMessages } = require('../errors');

module.exports = {
  userLogin: async (req, res, next) => {
    try {
      const { _id: userId, role, email } = req.user;

      const DTO = { userId, role, email };

      const tokenPair = authService.generateTokenPair({ ...DTO });

      res.cookie('refreshToken', tokenPair.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true });

      await OAuth.create({ ...tokenPair, user: userId });

      res.json(tokenPair.accessToken);
    } catch (e) {
      next(e);
    }
  },

  userLogout: async (req, res, next) => {
    try {
      const accessToken = req.get('Authorization');

      await OAuth.deleteOne({ accessToken });

      res.clearCookie('refreshToken');

      res.status(responseCodesEnum.DELETED_SUCCESSFULL)
        .json(errorMessages.SUCCESSFULLY_REMOVED.message);
    } catch (e) {
      next(e);
    }
  },
  userRefresh: async (req, res, next) => {
    try {
      const { refreshToken } = req.cookies;

      await OAuth.deleteOne({ refreshToken });

      res.clearCookie('refreshToken');

      const { _id: userId, role, email } = req.user;

      const DTO = { userId, role, email };

      const updatedTokens = authService.generateTokenPair({ ...DTO });

      res.cookie('refreshToken', updatedTokens.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true });

      await OAuth.create({ ...updatedTokens, user: userId });

      res.json(updatedTokens.accessToken);
    } catch (e) {
      next(e);
    }
  },

};
