
'use strict'

var {expect} = require('chai')
var {encode, decode} = require('../lib/packet')
var {SERVERDATA_AUTH, AUTH_ID} = require('../lib/protocol')

describe('packet', function() {
  describe('#encode()', function() {
    it('should buffer data', function() {
      var request = encode(
        SERVERDATA_AUTH,
        AUTH_ID,
        'rcon_password'
      )
      expect(request).to.be.ok
      expect(request).to.be.instanceof(Buffer)
    })
  })

  describe('#decode()', function() {
    it('should read packet', function() {
      var request = encode(
        SERVERDATA_AUTH,
        AUTH_ID,
        'rcon_password'
      )
      var response = decode(request)
      expect(response).to.be.ok
      expect(response.size).to.be.ok
      expect(response.id).to.equal(AUTH_ID)
      expect(response.type).to.equal(SERVERDATA_AUTH)
      expect(response.body).to.equal('rcon_password')
    })
  })
})
