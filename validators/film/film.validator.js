const Joi = require('joi');
// const { IMG_REGEX } = require('../../constants');

const directorSchema = Joi.object().keys({
  name: Joi.string().max(20).required(),
  // replace with regexp for file names
  // photo: Joi.string().required().max(15),
  photo: Joi.string().pattern(/^\S+(\.(png|jpeg|jpg|webp))$/).max(30),
  rewards: Joi.array().items(Joi.string().max(15)),
});

const actorSchema = Joi.object().keys({
  name: Joi.string().max(20).required(),
  // replace with regexp for file names
  photo: Joi.string().max(30),
  // replace with constants ...Object.values(sexEnum)
  sex: Joi.string().valid('male', 'female'),
  rewards: Joi.array().items(Joi.string().max(15)),
});

module.exports = {
  createFilm: Joi.object().keys({
    name: Joi.string().max(20).required(),
    year: Joi.number().min(1970).max(new Date().getFullYear()),
    country: Joi.string().max(20).default('США'),
    category: Joi.string().max(20).default('ужасы'),
    director: directorSchema,
    actors: Joi.array().items(actorSchema),
    // replace with regexp for file names
    poster: Joi.string().max(30).required(),
    images: Joi.array().items(Joi.string().max(30)),
    trailer: Joi.string().max(50),
  }),
};
