const express = require('express');
const fs=require('fs');
const path = require('path');
const router = require('./routes/film.router');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const staticPath =path.join(__dirname, 'data');
console.log(staticPath);
app.use(express.static(staticPath));

app.use('/films', router)

app.listen(3001, () => {
    console.log('App listen 3001');
  })