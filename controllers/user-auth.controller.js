const { responseCodesEnum } = require('../constants');
const { OAuth } = require('../dataBase');
const { passwordHasher } = require('../services');
const { authService } = require('../services');
const { errorMessages } = require('../errors');

module.exports = {
  userLogin: async (req, res, next) => {
    try {
      const { password: hashedPassword, _id } = req.user;
      const { password } = req.body;

      await passwordHasher.compare(hashedPassword, password);

      const tokenPair = authService.generateTokenPair();

      await OAuth.create({ ...tokenPair, user: _id });

      res.json({ ...tokenPair, user: req.user });
    } catch (error) {
      // res.json(error.message);
      next(error);
    }
  },

  userLogout: async (req, res, next) => {
    try {
      const token = req.get('Authorization');

      await OAuth.deleteOne({ accessToken: token });

      res.status(responseCodesEnum.DELETED_SUCCESSFULL)
        .json(errorMessages.SUCCESSFULLY_REMOVED.message);
    } catch (e) {
      next(e);
    }
  },
  userRefresh: async (req, res, next) => {
    try {
      const token = req.get('Authorization');

      await OAuth.deleteOne({ refreshToken: token });

      const updatedTokens = authService.generateTokenPair();

      const { _id } = req.user;

      await OAuth.create({ ...updatedTokens, user: _id });

      res.json({ ...updatedTokens, user: req.user });
    } catch (e) {
      next(e);
    }
  },

};
