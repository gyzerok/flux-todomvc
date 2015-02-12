'use strict';

var AppDispatcher = require('../dispatcher/AppDispatcher');

var todos = [];

function add(data) {
    todos.push({
        id: Relax.uid(),
        text: data.text
    });

    return true;
}

function remove(data) {
    todos = _.remove(todos, function (todo) {
        return todo.id !== data.id;
    });

    return true;
}

var TodoStore = Relax.createStore({

    getAll: function () {
        return todos;
    }
});

AppDispatcher.subscribe(TodoStore, {
    'add-todo': add,
    'remove-todo': remove
});

module.exports = TodoStore;