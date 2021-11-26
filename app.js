const express = require('express');
const path = require('path');
const fileUpload = require('express-fileupload');
const cors = require('cors');
require('dotenv').config();
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const {
  filmRouter,
  userAuthRouter,
  userRouter,
  userSearchRouter,
} = require('./routes');

const { ENV_CONSTANT } = require('./constants');

const uri = ENV_CONSTANT.DB_CONNECTION_URL;

const app = express();

_mongooseConnector();

app.use(cors({
  credentials: true,
  origin: process.env.CLIENT_URL,
}));
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

const staticPath = path.join(__dirname, 'data');
app.use(express.static(staticPath));

app.use(fileUpload({ createParentPath: true }));

app.use('/films', filmRouter);
app.use('/auth', userAuthRouter);
app.use('/auth/users', userRouter);
app.use('/users/search', userSearchRouter);
app.use(_handleErrors);

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

// eslint-disable-next-line no-unused-vars
function _handleErrors(err, req, res, next) {
  res.status(err.status || 500)
    .json({
      message: err.message || 'Unknown error',
      customCode: err.code || 0,
    });
}
