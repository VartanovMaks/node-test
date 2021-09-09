/* eslint-disable linebreak-style */
const express = require('express');
const path = require('path');
const cors = require('cors');
require('dotenv').config();
const mongoose = require('mongoose');
const router = require('./routes/film.router');
const { ENV_CONSTANT } = require('./constants');

const uri = ENV_CONSTANT.DB_CONNECTION_URL;

const app = express();
// eslint-disable-next-line no-use-before-define
_mongooseConnector();

app.use(cors());
app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

const staticPath = path.join(__dirname, 'data');
app.use(express.static(staticPath));

app.use('/films', router);

app.listen(ENV_CONSTANT.PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`App listen ${ENV_CONSTANT.PORT}`);
});

// eslint-disable-next-line no-underscore-dangle
function _mongooseConnector() {
  mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
    .then(() => {
      // eslint-disable-next-line no-console
      console.log('MongoDb connected');
    })
    // eslint-disable-next-line no-console
    .catch((err) => console.log(err));
}
