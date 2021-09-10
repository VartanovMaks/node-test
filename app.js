const express = require('express');
const path = require('path');
const cors = require('cors');
const mongoose = require('mongoose');
const router = require('./routes/film.router');

const uri = 'mongodb+srv://Max:admin@cluster0.spcof.mongodb.net/horror-films?retryWrites=true&w=majority';

const app = express();
// eslint-disable-next-line no-use-before-define
_mongooseConnector();

app.use(cors());
app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

const staticPath = path.join(__dirname, 'data');
app.use(express.static(staticPath));

app.use('/films', router);

app.listen(3001, () => {
  // eslint-disable-next-line no-console
  console.log('App listen 3001');
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
  // mongo.connect('mongodb://localhost:27017/horror-films', { useNewUrlParser: true, useUnifiedTopology: true });
}
