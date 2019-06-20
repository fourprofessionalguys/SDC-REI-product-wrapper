import React from 'react';
import ReactDOM from 'react-dom';
import App from '../shared/components/app.jsx';
// import { renderHtml } from '../iso-middleware/render.js';

const renderHydrate = (Component) => {
  ReactDOM.hydrate(
    <Component />,
    document.getElementById('root')
  );
};

renderHydrate(App);

// const renderHydrate = (element) => {
//   ReactDOM.hydrate(
//     React.createElement(element),
//     document.getElementById('root')
//   );
// };

// renderHtml().then(html => renderHydrate(html));
