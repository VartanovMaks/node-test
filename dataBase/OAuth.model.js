const { Schema, model } = require('mongoose');

const { dataBaseTableEnum } = require('../constants');

const oAuthSchema = new Schema(
  {
    accessToken: {
      type: String,
      required: true,
    },
    refreshToken: {
      type: String,
      required: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: dataBaseTableEnum.USER,
    },

  },
  { timestamps: true, toObject: { virtuals: true }, toJSON: { virtuals: true } },
);

// eslint-disable-next-line func-names
oAuthSchema.pre('findOne', function () {
  this.populate('user');
});

module.exports = model(dataBaseTableEnum.OAUTH, oAuthSchema);
