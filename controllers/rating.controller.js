const { responseCodesEnum } = require('../constants');
const { Rating } = require('../dataBase');

module.exports = {

  createRating: async (req, res, next) => {
    try {
      const { userId, filmId, rating } = req.body;

      console.log('RATING CONTR', userId, filmId, rating);

      await Rating.findOneAndUpdate(
        { userId, filmId },
        { rating }, {
          new: true,
          upsert: true,
        },
      );

      res.status(responseCodesEnum.SUCCESS);
    } catch (err) {
      next(err);
    }
  },

};
