import React from 'react';
import { renderToString } from 'react-dom/server';
import App from '../shared/components/app.jsx';
import { getProduct, getImages } from '../server/postgresGet.js';

const renderPage = (callback) => {
  getData((product, images, activeImage) => {
    const component = renderToString(<App images={images} activeImage={activeImage} product={products} />);

    fs.readFile(path.join(__dirname 'templateIndex.html'), 'utf-8', (err, html) => {
      if (err) console.log(err)
      else {
        html = html.replace('<div id="root">product-wrapper</div>', `<div id="root">${component}</div>`);
        callback(html);
      }
    });
  })
};

const getData = (callback) => {
  getProduct().then(({ product }) => getImages().then(({ images, activeImage }) => {
    callback(product, images, activeImage);
  }))
};


export default renderPage;