'use strict'

/**
 * A World of Countries - Continents test suite
 *
 * A list of individual tests to perform in order to check the correct
 * functionalities of the AWOC class methods about continents.
 *
 * No need to comment the code below, since is very self-explanatory
 */

// Importing the core 'path' module.
const path = require('path')

// Importing the AWOC class
const AWOC = require(path.join(__dirname, '../index'))

// Importing the 'Chai' expect method.
const chai = require('chai')

// Let's use the 'expect' assertion method
chai.expect()

// Initializing the AWOC Class.
const AWOCTest = new AWOC()

describe('Continents', function() {
  describe('1. getContinentsList()', function() {
    it('Expects to return a non empty array of 7 strings', done => {
      const resultData = AWOCTest.getContinentsList()
      chai
        .expect(resultData)
        .to.be.a('array')
        .to.have.lengthOf(7)

      // Looping through results.
      for (let c of resultData) {
        chai.expect(c).to.be.a('string')
      }
      done()
    })
  })
  describe('2. getContinentsData()', function() {
    it('Expects to return a non empty array of objects.', done => {
      const resultData = AWOCTest.getContinents()
      chai
        .expect(resultData)
        .to.be.a('array')
        .to.have.lengthOf(7)

      // Looping through results.
      for (let c of resultData) {
        chai.expect(c).to.be.a('object')
      }
      done()
    })
  })
})
