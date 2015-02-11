var React = require('react');
var FBDispatcher = require('flux').Dispatcher;
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');

var Relax = (function () {
    'use strict';

    var CHANGE_EVENT = 'influx:change';

    return {
        createClass: function (opts) {
            // TODO: do we need merge mixins here?
            return React.createClass(opts);
        },

        createStore: function (opts) {

            var Store = assign({}, EventEmitter, {
                actions: {},

                emitChange: function () {
                    this.emit(CHANGE_EVENT);
                },

                onChange: function (callback) {
                    this.on(CHANGE_EVENT, callback);
                },

                offChange: function (callback) {
                    this.removeListener(CHANGE_EVENT, callback);
                }
            }, opts);

            return Store;
        },

        createDispatcher: function (opts) {
            var Dispatcher = new FBDispatcher();
            var subs = opts.subscribers();
            subs.forEach(function (sub) {
                if (!sub.actions) throw new Error('Incorrect subscriber');

                Dispatcher.register(function (payload) {
                    var action = payload.action;

                    for (var actionType in subs.actions) {
                        if (actionType !== action.actionType) return;
                        sub.actions[actionType]().bind(this);
                        sub.emitChange();
                    }
                });
            });
        }
    }
})();

module.exports = Relax;