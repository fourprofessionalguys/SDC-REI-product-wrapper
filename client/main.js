import React from 'react';
import ReactDOM from 'react-dom';
import App from '../shared/components/app.jsx';


const initialData = JSON.parse(document.getElementById('initial-data').getAttribute('data-json'));

ReactDOM.hydrate(<App {...initialData} />, document.getElementById('app'));
