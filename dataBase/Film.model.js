const { Schema, model } = require('mongoose');

const filmSchema = new Schema({
  name: {
    type: String,
  },
  year: {
    type: String,
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
  rating: {
    type: Number,
  },
  viewsNumber: {
    type: Number,
  },
}, { timestamps: true });

module.exports = model('Film', filmSchema);
