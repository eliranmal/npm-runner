'use strict';


function create(impl) {
    let instance;
    let modulePath = `./impl/${impl}`;
    try {
        instance = require(modulePath);
    } catch (err) {
        throw new Error(`failed to load ${impl}, api should be one of "cli", "javascript".`);
    }
    return {
        name: impl,
        run: instance.run
    };
}


module.exports = {
    create: create
};