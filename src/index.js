/* index.js */
/* eslint-disable no-console */

// Imports
import 'regenerator-runtime/runtime';
import './styles.css';

import React from 'react';
import ReactDOM from 'react-dom';

import testBabel from './test-babel';
import App from './App.jsx';

// Test various ES6/ES-2018 features
console.log(testBabel());

// Initial React render
const title = 'Stepper Test';

ReactDOM.render(
  <App title={title} />,
  document.getElementById('app'),
);
