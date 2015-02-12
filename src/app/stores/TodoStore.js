'use strict';

var todos = [];

function add(data) {
    var id = (+new Date() + Math.floor(Math.random() * 999999)).toString(36);

    todos.push({
        id: id,
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
    actions: {
        'add-todo': add,
        'remove-todo': remove
    },

    getAll: function () {
        return todos;
    }
});

module.exports = TodoStore;