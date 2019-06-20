import React from 'react';
import { renderToString } from 'react-dom/server';
import App from '../shared/components/app.jsx';

const renderPage = (images, activeImage, product) => {
  return renderToString(<App images={images} activeImage={activeImage} product={product} />);
};


export default renderPage;