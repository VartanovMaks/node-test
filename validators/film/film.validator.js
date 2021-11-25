const Joi = require('joi');
const { REGEX } = require('../../constants');

const directorSchema = Joi.object().keys({
  // name: Joi.string().max(25).required(),
  name: Joi.string().max(25),
  photo: Joi.string().empty('').default('plug.jpg')
    .regex(REGEX.IMG_REGEX)
    .max(40),
  rewards: Joi.array().items(Joi.string().max(15)),
});

const actorSchema = Joi.object().keys({
  name: Joi.string().max(25),
  // name: Joi.string().max(25).required(),
  photo: Joi.string().empty('').default('plug.jpg')
    .regex(REGEX.IMG_REGEX)
    .max(40),
  sex: Joi.string().valid('male', 'female'),
  rewards: Joi.array().items(Joi.string().max(15)),
});

module.exports = {
  createFilm: Joi.object().keys({
    _id: Joi.string(),
    name: Joi.string().max(25).required(),
    year: Joi.number().min(1970).max(new Date().getFullYear()),
    country: Joi.string().max(20).default('США'),
    category: Joi.string().max(20).default('ужасы'),
    director: Joi.array().items(directorSchema),
    actors: Joi.array().items(actorSchema),
    poster: Joi.string().max(30).regex(REGEX.IMG_REGEX),
    images: Joi.array().items(Joi.string().regex(REGEX.IMG_REGEX).max(40)),
    trailer: Joi.string().max(100),
  }),
};
