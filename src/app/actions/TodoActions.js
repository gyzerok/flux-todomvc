'use strict';

var AppDispatcher = require('../dispatcher/AppDispatcher');
var TodoConstants = require('../constants/TodoConstants');

module.exports = {
    add: data => {
        AppDispatcher.handleViewAction({
            actionType: TodoConstants.ADD,
            data: data
        });
    },

    remove: id => {
        AppDispatcher.handleViewAction({
            actionType: TodoConstants.REMOVE,
            data: id
        });
    }
};