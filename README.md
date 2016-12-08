# npm-runner

> runs npm commands via npm's CLI or JS API, at your choice

[![NPM][4]][5]


## installation

to get all capabilities, and choose the API implementation at runtime:

```shell
npm i npm-runner
```

to only use the CLI API:

```shell
npm i npm-runner --no-optional
```


## API

### `init([globalOptions])`

initializes an npm-runner implementation and returns a runner function 
to call with npm commands.

_**`globalOptions`** [`{Options}`][3] (optional) global options that 
will be applied by default on every invocation of the runner._  

_**Returns:** `{Function}` a [`run()`][1] function that is bound to 
the passed options._  


### `run(command, [localOptions], callback)`

invokes an npm command. available only after initialization.

_**`command`** `{String}` an npm command to run, e.g. `install -D`._  
_**`localOptions`** [`{Options}`][3] (optional) local options that 
will be applied to the current invocation only, and override the global 
options passed on [`init()`][2]._  
_**`callback`** `{Function}` a callback that will be called when 
the npm command execution is finished. it receives two arguments: `err` 
and `output`. `err` is any raised error, and `output` is the command 
output, broken down to an array of output lines._  


### `Options`

_**Type:** `Object<*>`_  

instructions to apply globally (when passed to [`init()`][2]), or for 
a specific npm invocation (when passed to [`run()`][1]).


#### `api`

_**Type:** `String`_  
_**Default value:** `'cli'`_  
_**Mandatory:** no_  

how commands will be executed: `'javascript'` means using the `npm` node 
module javascript API (requires `npm` as a local npm dependency), while 
`'cli'` will rely on your global npm installation and send commands to 
the terminal.


#### `tee`

_**Type:** `Boolean`_  
_**Default value:** `false`_  
_**Mandatory:** no_  

whether to pipe the npm command output to stdout (in any case, the 
output will be sent to the [`run()`][1] callback).


#### `cwd`

_**Type:** `String|Path`_  
_**Default value:** `''`_  
_**Mandatory:** no_  

the directory to execute the npm command from (at the moment it's only 
used by the CLI API).


#### `ignoreErrors`

_**Type:** `Array<String>`_  
_**Default value:** `[]`_  
_**Mandatory:** no_  

don't fail the execution when any of these terms are found in error 
messages of the npm command output.


#### `globalFlags` (TBD)

_**Type:** `Array<String>`_  
_**Default value:** `[]`_  
_**Mandatory:** no_  

npm flags that will be appended to every command. e.g. put `'parseable'` 
here if you intend to dissect the output of every command, or `'json'` 
if you always want to use the command output as an object.


## examples


### use global options

```javascript
const npm = require('npm-runner').init({
    tee: true
});

npm('update', done);
```


### use command options

```javascript
const npm = require('npm-runner').init();

npm('link npm-runner', {
    cwd: path.resolve(__dirname)
}, done);
```


### switch APIs

```javascript
const npm = require('npm-runner').init({
    api: 'javascript'
});

npm('update', done);

npm('update', {
    api: 'cli'
}, done);
```


### ignore errors from the command stderr

here, the `done` callback will be called with no errors, even if some 
`extraneous` errors slipped to the stderr.
 
```javascript
const npm = require('npm-runner').init({
    ignoreErrors: [
        'extraneous'
    ]
});

npm('list', done);
```


### use parseable output to get the local path of an npm module

```javascript
const npm = require('npm-runner').init();
const packageName = 'npm-runner';

npm(`list ${packageName} --parseable --long --silent`, (err, parseableOutput) => {
    let output = parseableOutput.shift();
    if (output) {
        let path = output.split(':').shift();
        console.log(`${packageName}'s path is "${path}"`);
    }
});
```






[1]: #runcommand-localoptions-callback
[2]: #initglobaloptions
[3]: #options
[4]: https://img.shields.io/npm/v/npm-runner.svg?style=flat-square
[5]: https://www.npmjs.com/package/npm-runner
