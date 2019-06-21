// IMPORTS
//
require('dotenv').config();
require('newrelic');
import express from 'express';
import path from 'path';
import cors from 'cors';
import bodyParser from 'body-parser';
<<<<<<< HEAD
import { renderPage, renderApp } from '../iso-middleware/render.js';
=======
import renderPage from './render.js';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import Html from '../shared/components/Html.jsx';
import App from '../shared/components/app.jsx';
>>>>>>> 7cd9547db24fc7e3a6597ec3e1a2e2cb19d7778e

// SETUP
//
const app = express();
const port = process.env.PORT;


// MIDDLEWARE
//
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


// LOAD GZIP BUNDLE
//
app.use('*.js', function (req, res, next) {
  req.url = req.url + '.gz';
  res.set('Content-Encoding', 'gzip');
  res.set('Content-Type', 'text/javascript');
  next();
});


// SERVE BUNDLE
//
const buildPath = path.join(__dirname, '../', 'build');
app.use('/static', express.static(buildPath));


// INDEX ROUTE
//
<<<<<<< HEAD
app.get('/proxy', (req, res) => {
  res.send(renderApp());
});

app.get('*', renderPage);
=======
app.get('/', (req, res) => {
  renderPage(({ initialData, style }) => {
    ReactDOMServer.renderToNodeStream(
      <Html style={style} initialData={JSON.stringify(initialData)}>
        <App {...initialData} name="World" />
      </Html>
    ).pipe(res);
  });
});
>>>>>>> 7cd9547db24fc7e3a6597ec3e1a2e2cb19d7778e




// LAUNCH
//
app.listen(port, (err) => {
  if (err) {
    return console.log(err);
  }
  return console.log(`listening on port ${port}`);
});
