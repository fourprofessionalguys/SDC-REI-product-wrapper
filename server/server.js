// IMPORTS
//
require('dotenv').config();
import express from 'express';
import path from 'path';
import cors from 'cors';
import fs from 'fs';
import bodyParser from 'body-parser';
import renderPage from '../iso-middleware/render.js';


// SETUP
//
const app = express();
const port = process.env.PORT;


// MIDDLEWARE
//
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


// // SERVE
// //
const buildPath = path.join(__dirname, '../', 'build');
app.use(express.static(buildPath));
app.use(express.static(__dirname));


// LOAD GZIP BUNDLE
//
app.get('*.js', function (req, res, next) {
  req.url = req.url + '.gz';
  res.set('Content-Encoding', 'gzip');
  next();
});


// ROUTES
//
app.get('/', (req, res) => {
  renderPage(html => res.send(html));
});


// SERVE
//
app.listen(port, (err) => {
if (err) {
return console.log(err);
    }
  return console.log(`listening on port ${ port }`);
});