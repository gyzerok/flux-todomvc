'use strict';

var TodoItem = require('./TodoItem.react');

var TodoList = React.createClass({

    render: function () {

        var todos = _.map(this.props.todos, function (todo) {
            return (
                <TodoItem
                    key={todo.id}
                    id={todo.id}
                    text={todo.text}
                />
            )
        });

        return (
            <ul>{todos}</ul>
        );
    }
});

module.exports= TodoList;