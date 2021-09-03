const { Schema, model } = require('mongoose');

const filmSchema = new Schema({
    name:{
        type: String,
        required: true
      },
    year: {
        type: Number,
        required: true
      },
    country:{
        type: String,
        required: true
      },
    category: String,
    director : {
        name : 
            {
            type: String,
            required: true
          },
        photo: String,
        rewards: [String]
    },
    actors : [
        {
            name : {
                type: String,
                required: true
              }, 
            photo: String,
            sex : String,
            rewards : [String]
        }
    ],
    poster: String,
    images : [String],
    trailer : String
}, { timestamps: true });

module.exports = model('Film', filmSchema);