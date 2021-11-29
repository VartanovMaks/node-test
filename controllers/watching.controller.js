const { responseCodesEnum } = require('../constants');
const { Watching } = require('../dataBase');

module.exports = {

  createWatching: async (req, res, next) => {
    const { userId, filmId } = req.body;

    try {
      const view = await Watching.create({ filmId, userId });
      res.status(responseCodesEnum.SUCCESS).json(view);
    } catch (e) {
      next(e);
    }
  },
};
