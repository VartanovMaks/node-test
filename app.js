const express = require('express');
const path = require('path');
const cors = require('cors');
require('dotenv').config();
const mongoose = require('mongoose');
const router = require('./routes/film.router');
const { ENV_CONSTANT } = require('./constants');

const uri = ENV_CONSTANT.DB_CONNECTION_URL;

const app = express();

_mongooseConnector();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const staticPath = path.join(__dirname, 'data');
app.use(express.static(staticPath));

app.use('/films', router);

app.listen(ENV_CONSTANT.PORT, () => {
  console.log(`App listen ${ENV_CONSTANT.PORT}`);
});

function _mongooseConnector() {
  mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
    .then(() => {
      console.log('MongoDb connected');
    })
    .catch((err) => console.log(err));
}
