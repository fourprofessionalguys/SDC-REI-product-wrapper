import React from 'react';
import { renderToString } from 'react-dom/server';
import Html from '../shared/components/Html.jsx';
import App from '../shared/components/app.jsx';

const renderHtml = function () {
  const app = renderToString(<App />);
  return renderToString(<Html body={app} />);
};

const renderPage = function (req, res) {
  const html = renderHtml();
  return res.send(`<!DOCTYPE html>${html}`);
};

export default { renderPage, renderHtml };