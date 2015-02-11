'use strict';

var AppDispatcher = require('../dispatcher/AppDispatcher');
var TodoConstants = require('../constants/TodoConstants');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');

var CHANGE_EVENT = 'change';
var todos = [];

function add(text) {
    var id = (+new Date() + Math.floor(Math.random() * 999999)).toString(36);
    todos.push({
        id: id,
        text: text
    });
}

function remove(id) {
    todos = _.remove(todos, function (todo) {
        return todo.id !== id;
    });
}

var TodoStore = assign({}, EventEmitter.prototype, {

    notify: function () {
        this.emit(CHANGE_EVENT);
    },

    onChange: function (cb) {
        this.on(CHANGE_EVENT, cb);
    },

    offChange: function (cb) {
        this.removeListener(CHANGE_EVENT, cb);
    },

    getAll: function () {
        return todos;
    }
});

AppDispatcher.register(function (action) {

    switch (action.actionType) {
        case TodoConstants.ADD:
            add(action.data.text);
            break;
        case TodoConstants.REMOVE:
            remove(action.data.id);
            break;
    }

    TodoStore.notify();
});

module.exports = TodoStore;