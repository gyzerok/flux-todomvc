var FBDispatcher = require('flux').Dispatcher;
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');

var Relax = (function () {
    'use strict';

    var CHANGE_EVENT = 'relax:change';

    return {

        uid: function () {
            return (+new Date() + Math.floor(Math.random() * 999999)).toString(36);
        },

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

            assign(Dispatcher, {

                handleViewAction: function(action) {
                    this.dispatch({
                        source: 'VIEW_ACTION',
                        action: action
                    });
                },

                handleServerAction: function (action) {
                    this.dispatch({
                        source: 'SERVER_ACTION',
                        action: action
                    });
                },

                subscribe: function (store, actions) {
                    if (actions === {}) throw new Error('You have to provide store for subscription');

                    Dispatcher.register(function (payload) {
                        var action = payload.action;

                        for (var actionType in actions) {
                            if (actionType !== action.actionType) continue;
                            var isDataChanged = actions[actionType](action.data, payload.source);
                            if (isDataChanged) store.emitChange();
                        }
                    });
                }
            }, opts);

            return Dispatcher;
        }
    }
})();

module.exports = Relax;