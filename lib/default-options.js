'use strict';

const defaultOptions = Object.freeze({

    // how commands will be executed: 'javascript' means using the npm node module javascript API (requires npm as a 
    // local npm dependency), while 'cli' will rely on your global npm installation and send commands to the terminal.
    api: 'cli',
    // pipe the npm command output to stdout as well as sending it to the callback
    tee: false,
    // used for cli api only (at the moment)
    cwd: '',
    // don't fail the execution when these terms are found in error messages
    ignoreErrors: [],
    // npm flags that will be appended to every command. e.g. put 'parseable' here if you intend to dissect the 
    // output of every command, or 'json' if you always want to use the output as an object
    globalFlags: []

});


module.exports = defaultOptions;