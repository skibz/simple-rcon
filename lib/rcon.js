
'use strict'

function flush() {
  this.commands.forEach(function(command) {
    this.client.write(
      packet.encode(
        0x02,
        protocol.REQ_ID + 1,
        command
      )
    )
  }, this)
  this.commands = []
}

function dequeue(response) {
  var callback = this.responseCallbacks.shift()
  if (typeof callback === 'function') {
    callback(response)
  }
}

function connect() {
  this.client = net.connect({
    host: this.host,
    port: this.port
  }, _ => {
    this.emit('connected');
    this.client.write(
      packet.encode(
        protocol.SERVERDATA_AUTH,
        protocol.AUTH_ID,
        this.password
      )
    )
  })

  this.client.setTimeout(this.timeout)
}

function listen() {
  this.client.on('data', data => {
    var res = packet.decode(data)
    switch (res.type) {
      case protocol.SERVERDATA_RESPONSE_VALUE:
        if (this.authenticated) {
          dequeue.call(this, res)
        }
      break
      case protocol.SERVERDATA_AUTH_RESPONSE:
        if (res.body !== '') {
          this.emit('error', 'Error: Invalid RCON password')
          return
        }
        this.authenticated = true
        this.emit('authenticated')
        if (this.execOnAuthenticated) {
          flush.call(this)
        }
      break
      default:
        this.emit('error', 'Error: Unknown server response')
      break
    }
  })

  this.client.on('timeout', _ => this.client.end())
  this.client.on('end', _ => this.emit('disconnected'))
  this.client.on('error', e => this.emit('error', e))
}

var net = require('net')
var EventEmitter = require('events')
var packet = require('./packet')
var protocol = require('./protocol')

module.exports = class Rcon extends EventEmitter {

  constructor(options) {
    super()
    options = options || {}
    this.host = options.host || '127.0.0.1'
    this.port = options.port || '27015'
    this.password = options.password
    this.timeout = typeof options.timeout === 'number' ? options.timeout : 5000
    this.execOnAuthenticated = options.execOnAuthenticated || true

    this.authenticated = false
    this.responseCallbacks = []
    this.commands = []

    if (options.connect) {
      connect.call(this)
      listen.call(this)
    }
  }

  connect() {
    this.emit('connecting')
    if (!this.client) {
      connect.call(this)
      listen.call(this)
    }
    return this
  }

  exec(command, callback) {
    if (this.authenticated) {
      this.client.write(
        packet.encode(
          0x02,
          protocol.REQ_ID,
          command
        )
      )
    } else {
      this.commands.push(command)
    }
    this.responseCallbacks.push(callback)
    return this
  }

  close() {
    this.emit('disconnecting')
    if (this.client) this.client.end()
    return this
  }
}
