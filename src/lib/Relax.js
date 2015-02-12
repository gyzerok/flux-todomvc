(function () {
    'use strict';

    var FBDispatcher = require('flux').Dispatcher;
    var EventEmitter = require('events').EventEmitter;
    var assign = require('object-assign');

    var CHANGE_EVENT = 'relax:change';

    var Relax = {

        uid: function () {
            return (+new Date() + Math.floor(Math.random() * 999999)).toString(36);
        },

        createStore: function (opts) {

            var Store = assign({}, EventEmitter.prototype, {

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

                subscribe: function (Store, actions) {
                    if (actions === {}) throw new Error('You have to provide store for subscription');

                    Store.__dispatcherIndex = Dispatcher.register(function (payload) {
                        var action = payload.action;

                        for (var actionType in actions) {
                            if (actionType !== action.actionType) continue;
                            var isDataChanged = actions[actionType](action.data, payload.source);
                            if (isDataChanged) Store.emitChange();
                        }
                    });
                },

                unsubscribe: function(Store) {
                    Dispatcher.unsubscribe(Store.__dispatcherIndex);
                },

                await: function (stores) {
                    var ids = stores.map(function (Store) {
                        return Store.__dispatcherIndex;
                    });
                    Dispatcher.waitFor(ids);
                }
            }, opts);

            return Dispatcher;
        }
    };

    if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
        module.exports = Relax;
    }
    else {
        if (typeof define === 'function' && define.amd) {
            define([], function () {
                return Relax;
            });
        } else {
            window.Relax = Relax;
        }
    }
})();