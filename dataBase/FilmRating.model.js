const { Schema, model } = require('mongoose');

const filmRatingSchema = new Schema({
  filmId: {
    type: String,
  },
  userId: {
    type: String,
  },
  rating: {
    type: Number,
  },
}, { timestamps: true });

module.exports = model('Rating', filmRatingSchema);
