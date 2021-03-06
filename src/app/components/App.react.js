'use strict';

var TodoActions = require('../actions/TodoActions');
var TodoStore = require('../stores/TodoStore');
var InputText = require('./InputText.react');
var TodoList = require('./TodoList.react');

var TodoApp = React.createClass({
    mixins: [React.addons.PureRenderMixin],

    getInitialState: function () {
        return { todos: TodoStore.getAll() };
    },

    componentDidMount: function () {
        TodoStore.onChange(this.storeDidChanged);
    },

    componentWillUnmount: function () {
        TodoStore.offChange(this.storeDidChanged);
    },

    storeDidChanged: function () {
        this.replaceState({
            todos: TodoStore.getAll()
        })
    },

    render: function () {
        return (
            <div id="application">
                <InputText
                    id="new-todo"
                    value=""
                    onSave={this.onSave}
                />
                <TodoList
                    todos={this.state.todos}
                    onRemove={this.onRemove}
                />
            </div>
        )
    },

    onSave: function (text) {
        TodoActions.add({ text: text });
    },

    onRemove: function (id) {
        TodoActions.remove({ id: id });
    }
});

module.exports = TodoApp;