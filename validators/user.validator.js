const Joi = require('joi');

const { REGEX, userRolesEnum } = require('../constants');

module.exports = {

  registerUser: Joi.object().keys({
    email: Joi.string().regex(REGEX.USEREMAIL_REGEXP),
    password: Joi.string().min(3).max(25),
    role: Joi.string().allow(...Object.values(userRolesEnum)),
  }),
};
