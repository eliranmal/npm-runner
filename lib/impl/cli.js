'use strict';

const path = require('path');
const spawn = require('child_process').spawn;
const config = require('../config');


function run(command, opts, callback) {

    let ignoredList = config.resolve('ignoreErrors', opts);
    let cwd = path.resolve(config.resolve('cwd', opts));

    let cmdArgs = command.split(' ');
    let npmProcess = spawn('npm', cmdArgs, {
        cwd: cwd
    });
    let errors = {
        raised: 0,
        ignored: 0
    };
    let output = []; // todo - would Buffer be a better choice here?
    npmProcess.stdout.on('data', (data) => output.push(String(data).trim()));
    npmProcess.stderr.on('data', (data) => {
        let strData = String(data).trim();
        if (strData.startsWith('ERR!')) {
            let isIgnored = ignoredList.some(''.includes.bind(strData));
            errors.raised++;
            errors.ignored += +isIgnored; // 0 or 1
        }
    });
    npmProcess.on('close', (code, signal) => {
        //console.log(`> npm process closed with code ${code} and signal ${signal}. ${errors.raised} errors raised, ${errors.ignored} ignored.`);
        if (code !== 0 && errors.raised > errors.ignored) {
            callback(new Error(`npm execution failed. code: ${code}, signal: ${signal}, errors raised: ${errors.raised}, errors ignored: ${errors.ignored}`));
            return;
        }
        callback(null, output);
    });

    let tee = config.resolve('tee', opts);
    if (tee) {
        npmProcess.stdout.pipe(process.stdout);
        npmProcess.stderr.pipe(process.stderr);
    }
}


module.exports = {
    run: run
};