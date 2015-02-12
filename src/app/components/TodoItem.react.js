'use strict';

var TodoItem = React.createClass({

    render: function () {
        return (
            <li id={this.props.id}>
                {this.props.text}
                {' '}
                <a href="#" onClick={this.onRemove}>delete</a>
            </li>
        );
    },

    onRemove: function (e) {
        e.preventDefault();
        this.props.onRemove(this.props.id);
    }
});

module.exports = TodoItem;