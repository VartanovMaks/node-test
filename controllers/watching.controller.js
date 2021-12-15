const { responseCodesEnum } = require('../constants');
const { Watching } = require('../dataBase');

module.exports = {

  createWatching: async (req, res, next) => {
    try {
      const { userId, filmId } = req.body;
      console.log('createWatching', userId, filmId);
      const view = await Watching.create({ filmId, userId });
      res.status(responseCodesEnum.SUCCESS).json(view);
    } catch (e) {
      next(e);
    }
  },
  getUserWatchings: async (req, res, next) => {
    try {
      const { userId } = req.params;
      const watchings = await Watching.aggregate([{ $match: { userId } }, { $group: { _id: '$filmId', viewsNumber: { $sum: 1 } } }]);
      // const watchings = await Watching.find({ userId });
      res.status(responseCodesEnum.SUCCESS).json(watchings);
    } catch (e) {
      next(e);
    }
  },
  getFilmWatchingsByUser: async (req, res, next) => {
    try {
      const { filmId, userId } = req.params;
      const watchings = await Watching.find({ filmId, userId });
      // const watchings = await Watching.find({ userId });
      res.status(responseCodesEnum.SUCCESS).json(watchings);
    } catch (e) {
      next(e);
    }
  },

};
