'use strict';

const constants = require('./constants');

const _defaults = constants.defaultOptions;

let _globals = {};


function resolve(name, localOptions = {}) {
    let value;
    if (localOptions.hasOwnProperty(name)) {
        value = localOptions[name];
    } else if (_globals.hasOwnProperty(name)) {
        value = _globals[name];
    } else if (_defaults.hasOwnProperty(name)) {
        value = _defaults[name];
    }
    return value;
}


module.exports = {

    set globals(globals) {
        _globals = globals;
    },

    resolve: resolve

};