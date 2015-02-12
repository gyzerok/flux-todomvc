'use strict';

module.exports = Relax.createDispatcher({
    subscribers: function () {
        return [
            require('../stores/TodoStore')
        ];
    }
});