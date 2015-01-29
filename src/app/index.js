'use strict';

global.React = require('react');
var App = require('./components/App.react.js');

React.render(
    <App />,
    document.getElementById('root')
);