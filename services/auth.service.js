const jwt = require('jsonwebtoken');
const { promisify } = require('util');
const {
  ENV_CONSTANT: {
    ACCESS_TOKEN_SECRET,
    REFRESH_TOKEN_SECRET,
    ACCESS_TOKEN_EXP_TIME,
    REFRESH_TOKEN_EXP_TIME,
    TOKEN_TYPE,
  },
} = require('../constants');

const verifyPromise = promisify(jwt.verify);

module.exports = {
  generateTokenPair: () => {
    const accessToken = jwt.sign({}, ACCESS_TOKEN_SECRET, {
      expiresIn: ACCESS_TOKEN_EXP_TIME,
    });
    const refreshToken = jwt.sign({}, REFRESH_TOKEN_SECRET, {
      expiresIn: REFRESH_TOKEN_EXP_TIME,
    });

    return { accessToken, refreshToken };
  },

  verifyToken: async (token, tokenType = TOKEN_TYPE.ACCESS) => {
    const secretTokenWord = tokenType === TOKEN_TYPE.ACCESS
      ? ACCESS_TOKEN_SECRET : REFRESH_TOKEN_SECRET;

    await verifyPromise(token, secretTokenWord);
  },
};
