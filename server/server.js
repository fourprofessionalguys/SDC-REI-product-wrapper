// IMPORTS
//
require('dotenv').config();
import express from 'express';
import path from 'path';
import fs from 'fs';
import cors from 'cors';
import bodyParser from 'body-parser';
import { renderPage, renderHtml } from '../iso-middleware/render.js';

// SETUP
//
const app = express();
const port = process.env.PORT;


// MIDDLEWARE
//
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


// SERVE
//
const buildPath = path.join(__dirname, '../', 'build');
app.use('/', express.static(buildPath));
app.use(express.static(__dirname));

// LOAD GZIP BUNDLE
//
app.get('*.js', function (req, res, next) {
  req.url = req.url + '.gz';
  res.set('Content-Encoding', 'gzip');
  next();
});

// DATABASE ROUTES
//
if (process.env.ROUTES === 'redis') {

  const redis = require('./redisRoutes.js');

  app.get('/images', redis.images);
  app.get('/products', redis.products);

} else if (process.env.ROUTES === 'postgres') {

  const postgres = require('./postgresRoutes.js');

  app.get('/images', postgres.images);
  app.get('/products', postgres.products);

}

// LOAD HYDRATED INDEX
//
app.get('/proxy', async (req, res) => {
  await fs.writeFile(path.join(__dirname, 'index.html'), renderHtml(), 'utf-8');
  fs.readFile(path.join(__dirname, 'index.html'), 'utf8', (err, html) => {
    res.sendFile(html);
  })
});

app.get('*', renderPage);




// LAUNCH
//
app.listen(port, (err) => {
  if (err) {
    return console.log(err);
  }
  return console.log(`listening on port ${port}`);
});



module.exports = app;
