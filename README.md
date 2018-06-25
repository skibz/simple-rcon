
# simple-rcon

[![Build Status](https://travis-ci.org/prestonp/simple-rcon.svg?branch=master)](https://travis-ci.org/prestonp/simple-rcon)
[![Coverage Status](https://coveralls.io/repos/prestonp/simple-rcon/badge.svg?branch=master&service=github)](https://coveralls.io/github/prestonp/simple-rcon?branch=master)

[![Dependency Status](https://david-dm.org/prestonp/simple-rcon.svg)](https://david-dm.org/prestonp/simple-rcon)
[![devDependency Status](https://david-dm.org/prestonp/simple-rcon/dev-status.svg)](https://david-dm.org/prestonp/simple-rcon#info=devDependencies)

Simple, painless node RCON client for Source servers.

## Install

```bash
npm install --save simple-rcon
```

## Examples

```javascript
var Rcon = require('simple-rcon')
var client = new Rcon({
  host: '127.0.0.1',
  port: '27015',
  password: 'rconPassword'
}).exec('changelevel cp_badlands', function() {
  client.exec('say \'hey look the map changed!\'')
}).exec('status', function(res) {
  console.log('Server status', res.body)
}).exec('sm_kick somebody', function() {
  client.close()
}).connect()

client.on('authenticated', function() {
  console.log('Authenticated!')
}).on('connected', function() {
  console.log('Connected!')
}).on('disconnected', function() {
  console.log('Disconnected!')
})
```

## API

* Constructor
  - Accepts one positional argument of type `Object` and returns an instance of `simple-rcon`.

    Fields | Type | Required | Default Value | Description
    ------ | ---- | -------- | ------------- | -----------
    `host` | `String` | Yes | `'127.0.0.1'` | The remote host address
    `port` | `Number` | Yes | `27015` | The remote host dedicated server's port
    `password` | `String` | Yes | `null` | The remote host dedicated server's RCON password
    `timeout` | `Number` | No | `5000` | The client socket timeout

* `exec`
  - Accepts two positional arguments and sends the command to the remote host dedicated server if authenticated, otherwise buffers the command until authenticated.

    Argument | Type | Description
    -------- | ---- | -----------
    `command` | `String` | Command to execute on the remote host dedicated server
    `callback` | `Function<String>` | Function to invoke with a result received from the remote host dedicated server

* `close`
  - Accepts no positional arguments and terminates the connection to the remote host dedicated server.

## Events

Name | Parameters | Description
---- | ---------- | -----------
`connecting` | 0 | Before client begins connecting to server
`connected` | 0 | After client has connected to server
`authenticated` | 0 | After client has authenticated with server
`disconnecting` | 0 | Before client begins disconnecting from server
`disconnected` | 0 | After client has disconnected from server
`error` | 1 (`Error` or `String`) | After client connection was interrupted by an error

##### Contributors

* [Ant Cosentino (skibz)](https://github.com/skibz)
* [whitebird](https://github.com/whitebird)

##### Further Reading

* Read more about the [RCON Protocol](https://developer.valvesoftware.com/wiki/Source_RCON_Protocol).

##### License

[MIT](LICENSE.md)
