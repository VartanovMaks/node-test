const { Schema, model } = require('mongoose');

const watchingSchema = new Schema({
  filmId: {
    type: String,
  },
  userId: {
    type: String,
  },
}, { timestamps: true });

module.exports = model('Watching', watchingSchema);
