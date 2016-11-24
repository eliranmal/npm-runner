'use strict';


const conatnats = Object.freeze({

    defaultOptions: {
        // how commands will be executed: 'javascript' means using the 'npm' node module javascript api (requires the npm dependency 'npm'), 
        // while 'cli' will rely your global npm installation and sends commands to the terminal
        api: 'cli',
        // don't pipe npm output to stdout
        quiet: true,
        // used for cli api only (at the moment)
        cwd: '',
        // don't fail the execution when these terms are found in error messages
        ignoreErrors: [],
        // npm flags that will be appended to every command. put 'parseable' here if you intend to dissect the output of every command 
        globalFlags: []
    }

});


module.exports = constants;