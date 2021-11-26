const { responseCodesEnum } = require('../constants');
const { User } = require('../dataBase');

module.exports = {
  getFilteredUsers: async (req, res, next) => {
    try {
      const { email } = req.body;

      const users = await User.find({ email: { $regex: email, $options: 'i' } });

      res.status(responseCodesEnum.SUCCESS).json(users);
    } catch (e) {
      next(e);
    }
  },
};
