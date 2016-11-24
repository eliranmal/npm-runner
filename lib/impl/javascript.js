'use strict';

let npm;
try {
    npm = require('npm');
} catch (err) {
    throw new Error('the npm module is required for the javascript api, but was failed to load. to fix this, reinstall npm-runner without the --no-optional flag.');
}


function run(command, opts, callback) {

    let cmdArgs = command.split(' ');
    let cmdName = cmdArgs.shift();
    let runner = (cb) => npm.commands[cmdName](cmdArgs, cb);

    if (npm.config.loaded) {
        runner(callback);
    } else {
        npm.load({}, (err) => {
            if (err) {
                callback(err);
                return;
            }
            console.log(`> npm javascript API is loaded`);
            runner(callback);
        });
    }
}


module.exports = {
    run: run
};