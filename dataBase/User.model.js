const { Schema, model } = require('mongoose');

const { userRolesEnum } = require('../constants');

const userSchema = new Schema(
  {
    email: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      // select: false,
      required: true,
    },
    role: {
      type: String,
      enum: Object.values(userRolesEnum),
      default: userRolesEnum.USER,
    },

  },
  { timestamps: true, toObject: { virtuals: true }, toJSON: { virtuals: true } },
);
module.exports = model('User', userSchema);
