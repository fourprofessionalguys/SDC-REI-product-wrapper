import React from 'react';
import ReactDOM from 'react-dom';
import renderPage from '../iso-middleware/render.js';


const renderHydrate = (element) => {
  ReactDOM.hydrate(
    // React.createElement('<!DOCTYPE html>'),
    React.createElement(element)
  );
};

renderPage(html => renderHydrate(html));
