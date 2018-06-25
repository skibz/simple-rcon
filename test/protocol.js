
'use strict'

var {expect} = require('chai')
var {
  SERVERDATA_AUTH,
  SERVERDATA_AUTH_RESPONSE,
  SERVERDATA_EXECCOMMAND,
  SERVERDATA_RESPONSE_VALUE,
  AUTH_ID,
  REQ_ID
} = require('../lib/protocol')

describe('protocol', function() {

  describe('#SERVERDATA_AUTH', function() {
    it('should have a hexadecimal value', function() {
      expect(SERVERDATA_AUTH).to.not.be.undefined
    })
  })

  describe('#SERVERDATA_AUTH_RESPONSE', function() {
    it('should have a hexadecimal value', function() {
      expect(SERVERDATA_AUTH_RESPONSE).to.not.be.undefined
    })
  })

  describe('#SERVERDATA_EXECCOMMAND', function() {
    it('should have a hexadecimal value', function() {
      expect(SERVERDATA_EXECCOMMAND).to.not.be.undefined
    })
  })

  describe('#SERVERDATA_RESPONSE_VALUE', function() {
    it('should have a hexadecimal value', function() {
      expect(SERVERDATA_RESPONSE_VALUE).to.not.be.undefined
    })
  })

  describe('#AUTH_ID', function() {
    it('should have a hexadecimal value', function() {
      expect(AUTH_ID).to.not.be.undefined
    })
  })

  describe('#REQ_ID', function() {
    it('should have a hexadecimal value', function() {
      expect(REQ_ID).to.not.be.undefined
    })
  })

})
