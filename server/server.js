// IMPORTS
//
require('dotenv').config();
import express from 'express';
import path from 'path';
import cors from 'cors';
import fs from 'fs';
import bodyParser from 'body-parser';
import { renderToString } from 'react-dom/server';
import App from '../shared/components/app.jsx';

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
const postgres = require('./postgresRoutes.js');

app.use(postgres.images);

app.use(postgres.products);

app.get('/', (req, res) => {
  const component = renderToString(<App images={res.locals.images} activeImage={res.locals.activeImage} product={res.locals.products} />);

  fs.readFile(path.join(__dirname, 'templateIndex.html'), 'utf-8', (err, html) => {
    if (err) console.log(err)
    else {
      const html = html.replace(`<div id="root">product-wrapper</div>`, `<div id="root">${component}</ div>`);
      res.send(html);
    }
  });
});


// SERVE
//
app.listen(port, (err) => {
if (err) {
return console.log(err);
    }
  return console.log(`listening on port ${ port }`);
});