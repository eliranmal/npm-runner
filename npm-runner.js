'use strict';

const config = require('./lib/config');
const factory = require('./lib/factory');


let globalImpl;

function init(globalOptions = {}) {
    config.globals = globalOptions;
    globalImpl = factory.create(config.resolve('api'));
    return run;
}

function run(...args) {
    let opts = parseOptions(args);
    let impl = getImpl(opts.localOptions);
    impl.run(opts.command, opts.localOptions, opts.callback);
}

function parseOptions(args) {

    let callback = args.pop();
    if (!callback || typeof callback !== 'function') {
        throw new Error('callback must be provided as the last argument');
    }

    let localOptions;
    if (args.length >= 2) {
        let opts = args.pop();
        if (opts && typeof opts === 'object' && !Array.isArray(opts)) {
            localOptions = opts;
        } else {
            console.error(new Error(`options must be an object`));
            return;
        }
    }

    let command = args.shift();
    if (!command) {
        throw new Error('command must be provided as the first argument');
    }

    return {
        command: command,
        localOptions: localOptions,
        callback: callback
    }
}

function getImpl(localOptions) {
    let impl;
    let name = config.resolve('api', localOptions);
    if (name !== globalImpl.name) {
        impl = factory.create(name);
    } else {
        impl = globalImpl;
    }
    return impl;
}


module.exports = {
    init: init
};
