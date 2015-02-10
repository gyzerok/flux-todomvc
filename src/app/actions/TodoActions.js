'use strict';

var AppDispatcher = require('../dispatcher/AppDispatcher');
var TodoConstants = require('../constants/TodoConstants');

module.exports = {
    add: function (text) {
        AppDispatcher.handleViewAction({
            actionType: TodoConstants.ADD,
            data: { text: text }
        });
    },

    remove: function (id) {
        AppDispatcher.handleViewAction({
            actionType: TodoConstants.REMOVE,
            data: { id: id }
        });
    }
};