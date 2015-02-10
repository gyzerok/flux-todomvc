'use strict';

var Dispatcher = require('flux').Dispatcher;

var AppDispatcher = new Dispatcher();

AppDispatcher.handleViewAction = function (action) {
    _.extend(action, {
        source: 'VIEW_ACTION'
    });
    this.dispatch(action);
};

module.exports  = AppDispatcher;