const Joi = require('joi');
const { REGEX } = require('../constants');

module.exports = {
  authUser: Joi.object().keys({
    email: Joi.string().regex(REGEX.USEREMAIL_REGEXP),
    password: Joi.string().max(25).min(3),
  }),
};
