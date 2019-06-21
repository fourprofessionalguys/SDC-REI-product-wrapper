import React from 'react';
import ReactDOM from 'react-dom';

const Html = (props) => (
  <html>
    <head>
      <title>Product Wrapper</title>
      <link rel="icon" type="text/css" href="https://www.rei.com/favicon.ico" type="image/x-icon" />
      <link rel="stylesheet" type="text/css" href="https://use.fontawesome.com/releases/v5.8.2/css/fontawesome.css"
        integrity="sha384-sri+NftO+0hcisDKgr287Y/1LVnInHJ1l+XC7+FOabmTTIK0HnE2ID+xxvJ21c5J" crossOrigin="anonymous" />
      <link rel="stylesheet" type="text/css" href="https://use.fontawesome.com/releases/v5.8.2/css/solid.css"
        integrity="sha384-ioUrHig76ITq4aEJ67dHzTvqjsAP/7IzgwE7lgJcg2r7BRNGYSK0LwSmROzYtgzs" crossOrigin="anonymous" />
      <link rel="stylesheet" type="text/css" href="https://fonts.googleapis.com/css?family=Roboto:400,700" />
      <link rel="stylesheet" type="text/css" href="https://fonts.googleapis.com/css?family=Domine" />
    </head>
    <body>
      <style>{props.style}</style>
      <div id="app">{props.children}</div>
      <script id="initial-data" type="text/plain" data-json={props.initialData}></script>
      <script type="text/javascript" src="https://unpkg.com/react@16.8.6/umd/react.development.js" />
      <script type="text/javascript" src="https://unpkg.com/react-dom@16.8.6/umd/react-dom.development.js" />
      <script type="text/javascript" src="https://unpkg.com/prop-types@15.7.2/prop-types.js" />
      <script src="/static/main.bundle.js"></script>
    </body>
  </html>
);

export default Html;