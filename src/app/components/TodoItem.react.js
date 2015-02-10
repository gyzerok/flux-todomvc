'use strict';

var TodoItem = React.createClass({
    render: function () {
        return (
            <li id={this.props.id}>{this.props.text}</li>
        );
    }
});

module.exports = TodoItem;