'use strict';

var ENTER_KEY_CODE = 13;

var InputText = React.createClass({

    getInitialState: function () {
        return {
            value: this.props.value || ''
        }
    },

    render: function () {
        return (
            <input
                id={this.props.id}
                type="text"
                value={this.state.value}
                onChange={this.onChange}
                onKeyDown={this.onKeyDown}
                autoFocus="true"
            />
        )
    },

    onChange: function (e) {
        this.setState({ value: e.target.value });
    },

    onKeyDown: function (e) {
        if (e.keyCode === ENTER_KEY_CODE) {
            this.props.onSave(this.state.value);
            this.setState({ value: '' });
        }
    }
});

module.exports = InputText;