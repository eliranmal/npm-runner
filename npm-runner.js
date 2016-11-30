'use strict';

const config = require('./lib/config');
const factory = require('./lib/factory');


let globalImpl;

function init(globalOptions = {}) {
    config.globals = globalOptions;
    // lazy loading! todo - brag about it in the docs
    globalImpl = factory.load(config.resolve('api'));
    return run;
}

function run(...args) {

    let callback = args.pop();
    if (!callback || typeof callback !== 'function') {
        console.error(new Error('callback must be provided as the last argument'));
        return;
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
        console.error(new Error('command must be provided as the first argument'));
        return;
    }

    let impl = getLocalImpl(localOptions);
    //console.log(`> running "npm ${command}", via the "${impl.name}" API, with options ${JSON.stringify(localOptions)}`);
    // even lazier loading! todo - brag about it in the docs some more
    impl.run(command, localOptions, callback);
}

function getLocalImpl(localOptions) {
    let impl;
    let name = config.resolve('api', localOptions);
    if (name !== globalImpl.name) {
        impl = factory.load(name);
    } else {
        impl = globalImpl;
    }
    return impl;
}


module.exports = {
    init: init
};
