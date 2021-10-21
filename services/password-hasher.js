const bcrypt = require('bcrypt');
const { responseCodesEnum } = require('../constants');
const { errorMessages, ErrorHandler } = require('../errors');

module.exports = {
  compare: async (hashedPassword, password) => {
    const isPasswordMatched = await bcrypt.compare(password, hashedPassword);
    if (!isPasswordMatched) {
      throw new ErrorHandler(
        responseCodesEnum.WRONG_PASSWORD_OR_EMAIL,
        errorMessages.WRONG_EMAIL_OR_PASSWORD.message,
        errorMessages.WRONG_EMAIL_OR_PASSWORD.code,
      );
    }
  },
  hash: (password) => bcrypt.hash(password, 10),
};
