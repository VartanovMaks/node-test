const { responseCodesEnum } = require('../constants');
const { User } = require('../dataBase');

module.exports = {
  getFilteredUsers: async (req, res, next) => {
    try {
      const { email } = req.body;
      const page = +req.query.page;
      const limit = +req.query.limit;

      console.log('page', page, 'limit', limit);

      const queryUsersQty = await User.find({ email: { $regex: email, $options: 'i' } }).countDocuments();

      const userData = await User.find({ email: { $regex: email, $options: 'i' } }).limit(limit).skip((page - 1) * limit);

      userData.push(queryUsersQty);

      res.status(responseCodesEnum.SUCCESS).json(userData);
    } catch (e) {
      next(e);
    }
  },
};
