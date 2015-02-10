'use strict';

var TodoActions = require('../actions/TodoActions');
var TodoStore = require('../stores/TodoStore');
var InputText = require('./InputText.react');
var TodoList = require('./TodoList.react');

var TodoApp = React.createClass({

    getInitialState: function () {
        return {
            todos: TodoStore.getAll()
        };
    },

    componentDidMount: function () {
        TodoStore.onChange(this.storeDidChanged);
    },

    componentWillUnmount: function () {
        TodoStore.offChange(this.storeDidChanged);
    },

    storeDidChanged: function () {
        this.setState({
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
                <TodoList todos={this.state.todos} />
            </div>
        )
    },

    onSave: function (text) {
        TodoActions.add(text);
    }
});

module.exports = TodoApp;