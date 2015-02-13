'use strict';

// React is global since it was added on the page
//global.React = require('react');
global.Relax = require('relax.js');
global.Immutable = require('immutable');
global._ = require('lodash');
var App = require('./components/App.react.js');

React.render(
    <App />,
    document.getElementById('root')
);