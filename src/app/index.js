'use strict';

// React is global since it was added on the page
//global.React = require('react');
var App = require('./components/App.react.js');

React.render(
    <App />,
    document.getElementById('root')
);