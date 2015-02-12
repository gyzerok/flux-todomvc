'use strict';

var AppDispatcher = require('../dispatcher/AppDispatcher');

module.exports = {
    add: function (data) {
        AppDispatcher.handleViewAction({
            actionType: 'add-todo',
            data: data
        });
    },

    remove: function (data) {
        AppDispatcher.handleViewAction({
            actionType: 'remove-todo',
            data: data
        });
    }
};