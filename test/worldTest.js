'use strict'

/**
 * A World of Countries - world.json (GWDO) test suite
 *
 * A list of individual tests to perform to check the correct
 * functionalities of the AWOC class methods about countries.
 *
 * No need to comment the code below, since is very self-explanatory
 */

// Importing the core 'path' module.
const path = require('path')

// Importing the 'Chai' expect method.
const chai = require('chai')

// Importing and using the third-party 'chai-json' module.
chai.use(require('chai-json'))

// Let's use the 'expect' assertion method
chai.expect()

// Setting up Global World Object JSON Dataset path.
const gwdJSONPath = path.join(__dirname, '../data/world.json')

describe('World', function() {
  it('Expect the Global World Dataset to be a valid schema', done => {
    chai.expect(gwdJSONPath).to.be.a.jsonFile()
    done()
  })
})
