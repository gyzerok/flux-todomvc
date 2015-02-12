var FBDispatcher = require('flux').Dispatcher;
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');

var Relax = (function () {
    'use strict';

    var CHANGE_EVENT = 'relax:change';

    return {

        createStore: function (opts) {

            var Store = assign({}, EventEmitter.prototype, {
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

            Dispatcher.handleViewAction = function (action) {
                this.dispatch({
                    source: 'VIEW_ACTION',
                    action: action
                });
            };

            Dispatcher.handleServerAction = function (action) {
                this.dispatch({
                    source: 'SERVER_ACTION',
                    action: action
                });
            };

            Dispatcher.subscribe = function (sub) {
                if (!sub.actions) throw new Error('Incorrect subscriber');

                Dispatcher.register(function (payload) {
                    var action = payload.action;

                    for (var actionType in sub.actions) {
                        if (actionType !== action.actionType) continue;
                        var isDataChanged = sub.actions[actionType](action.data, payload.source);
                        if (isDataChanged) sub.emitChange();
                    }
                });
            };

            var subs = opts.subscribers();
            subs.forEach(Dispatcher.subscribe);

            return Dispatcher;
        }
    }
})();

module.exports = Relax;