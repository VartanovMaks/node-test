const { responseCodesEnum } = require('../constants');
const { Rating } = require('../dataBase');
const { Film } = require('../dataBase');

module.exports = {

  createRating: async (req, res, next) => {
    try {
      const { userId, filmId, rating } = req.body;

      await Rating.findOneAndUpdate(
        { userId, filmId },
        { rating }, {
          new: true,
          upsert: true,
        },
      );

      const result = await Rating.find({ filmId });

      if (result.length !== 0) {
        const aveRating = Math.round((result.map((item) => item.rating)
          .reduce((el, cur) => (el + cur)) / result.length) * 10) / 10;

        await Film.findOneAndUpdate({ _id: filmId }, { rating: aveRating });
      }

      res.status(responseCodesEnum.SUCCESS).json('OK');
    } catch (err) {
      next(err);
    }
  },

  getRatingById: async (req, res, next) => {
    try {
      const { combId } = req.params;
      const [filmId, userId] = combId.split('|');

      const result = await Rating.find({ userId, filmId });
      console.log('RESULT', result);
      res.status(responseCodesEnum.SUCCESS).json(
        result.length !== 0 ? result[0].rating : 0,
      );
    } catch (err) {
      next(err);
    }
  },
};
