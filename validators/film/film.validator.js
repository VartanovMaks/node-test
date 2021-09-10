const Joi = require('joi');
const { IMG_REGEX } = require('../../constants');

const directorSchema = Joi.object().keys({
  name: Joi.string().required().max(15),
  // replace with regexp for file names
  // photo: Joi.string().required().max(15),
  photo: Joi.object().regex(IMG_REGEX).max(15),
  rewards: Joi.array().items(Joi.string().max(15)),
});

const actorSchema = Joi.object().keys({
  name: Joi.string().required().max(15),
  // replace with regexp for file names
  photo: Joi.string().max(15),
  // replace with constants ...Object.values(sexEnum)
  sex: Joi.string().valid('male', 'female'),
  rewards: Joi.array().items(Joi.string().max(15)),
});

module.exports = {
  createFilm: Joi.object().keys({
    name: Joi.string().required().max(20),
    year: Joi.number().required().min(1970).max(Date().getFullYear()),
    country: Joi.string().required().max(20).default('США'),
    director: directorSchema(),
    actors: Joi.array(actorSchema),
    // replace with regexp for file names
    poster: Joi.string().required().max(15),
    images: Joi.string().max(15),
    trailer: Joi.string().max(30),
  }),
};
