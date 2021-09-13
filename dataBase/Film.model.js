const { Schema, model } = require('mongoose');

const filmSchema = new Schema({
  name: {
    type: String,
  },
  year: {
    type: Number,
  },
  country: {
    type: String,
  },
  category: String,
  director: [
    {
      name:
        {
          type: String,
        },
      photo: String,
      rewards: [String],
    },
  ],
  actors: [
    {
      name: {
        type: String,
      },
      photo: String,
      sex: String,
      rewards: [String],
    },
  ],
  poster: String,
  images: [String],
  trailer: String,
}, { timestamps: true });

module.exports = model('Film', filmSchema);
