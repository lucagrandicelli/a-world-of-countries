'use strict'

/**
 * A World of Countries - Countries test suite
 *
 * A list of individual tests to perform to check the correct
 * functionalities of the AWOC class methods about countries.
 *
 * No need to comment the code below, since is very self-explanatory
 */

// Importing the core 'path' module.
const path = require('path')

// Importing the AWOC class
const AWOC = require(path.join(__dirname, '../index'))

// Importing the 'Chai' expect method.
const chai = require('chai')

// Importing and using the JSOn validation schema for the chai library.
chai.use(require('chai-json-schema'))

// Let's use the 'expect' assertion method
chai.expect()

const countryDataSchema = {
  title: 'Single country data schema v1',
  type: 'object',
  required: [
    'Country Name',
    'ISO2',
    'ISO3',
    'TLD',
    'FIPS',
    'ISO Numeric',
    'GeoNameID',
    'E164',
    'Phone Code',
    'Continent Name',
    'Continent Code',
    'Capital',
    'Time Zone in Capital',
    'Currency Name',
    'Languages',
    'Area KM2'
  ],
  properties: {
    'Country Name': {
      type: 'string'
    },
    ISO2: {
      type: 'string'
    },
    ISO3: {
      type: 'string'
    },
    TLD: {
      type: 'string'
    },
    FIPS: {
      type: 'string'
    },
    'ISO Numeric': {
      type: 'string'
    },
    GeoNameID: {
      type: 'string'
    },
    E164: {
      type: 'string'
    },
    'Phone Code': {
      type: 'string'
    },
    'Continent Name': {
      type: 'string'
    },
    'Continent Code': {
      type: 'string'
    },
    Capital: {
      type: 'string'
    },
    'Time Zone in Capital': {
      type: 'string'
    },
    'Currency Name': {
      type: 'string'
    },
    Languages: {
      type: 'string'
    },
    'Area KM2': {
      type: 'string'
    }
  }
}

// Initialize the AWOC Class.
const AWOCTest = new AWOC()

describe('Countries', () => {
  describe('1. getCountries()', () => {
    it('Expects to return a non empty array of objects.', function(done) {
      chai.expect(AWOCTest.getCountries()).to.be.a('array')
      done()
    })
  }),
    describe('2. getCountryData(countryName)', () => {
      it('catching thrown errors (no param)', done => {
        chai.expect(() => AWOCTest.getCountryData()).to.throw() // PASS
        done()
      }),
        it('catching thrown errors (wrong param)', done => {
          chai
            .expect(() => AWOCTest.getCountryData('Invalid Country Name'))
            .to.throw() // PASS
          done()
        }),
        it('Expects to return an object.', done => {
          for (let country of AWOCTest.getCountriesList()) {
            chai
              .expect(AWOCTest.getCountryData(country))
              .to.be.a('object')
              .and.to.be.jsonSchema(countryDataSchema)
          }
          done()
        })
    }),
    describe('2. getCountryData(countryName, keyName)', () => {
      it('catching thrown errors', () => {
        chai
          .expect(() => AWOCTest.getCountryData('Italy', 'Invalid Key Name'))
          .to.throw() // PASS
      }),
        it('Expects to return an object.', function(done) {
          for (let country of AWOCTest.getCountriesList()) {
            chai
              .expect(AWOCTest.getCountryData(country, 'Capital'))
              .to.be.a('String')
          }
          done()
        })
    }),
    describe('3. getCountriesList()', () => {
      it('Expects to return a non empty array of strings.', function(done) {
        chai.expect(AWOCTest.getCountriesList()).to.be.a('array')
        done()
      })
    }),
    describe('4. getCountriesListOf(continentName)', () => {
      it('catching thrown errors (no param)', done => {
        chai.expect(() => AWOCTest.getCountriesListOf()).to.throw() // PASS
        done()
      }),
        it('catching thrown errors (wrong param)', done => {
          chai
            .expect(() => AWOCTest.getCountriesListOf('Invalid Continent Name'))
            .to.throw() // PASS
          done()
        }),
        it('Expects to return a non empty array of strings.', function(done) {
          for (let continent of AWOCTest.getContinentsList()) {
            chai.expect(AWOCTest.getCountriesListOf(continent)).to.be.a('array')
          }
          done()
        })
    }),
    describe('5. getCountriesDataOf(continentName)', () => {
      it('Expects to return a non empty array of objects.', function(done) {
        for (let continent of AWOCTest.getContinentsList()) {
          const result = AWOCTest.getCountriesDataOf(continent)
          chai.expect(result).to.be.a('array')

          for (let country of result) {
            chai
              .expect(country)
              .to.be.a('object')
              .and.to.be.jsonSchema(countryDataSchema)
          }
        }
        done()
      })
    }),
    describe('6. getCountryISO2(countryName) ', () => {
      it('catching thrown errors (no param)', done => {
        chai.expect(() => AWOCTest.getCountryISO2()).to.throw() // PASS
        done()
      }),
        it('catching thrown errors (wrong param)', done => {
          chai.expect(() => AWOCTest.getCountryISO2('Wrong Param')).to.throw() // PASS
          done()
        }),
        it('Expects to return a string.', done => {
          for (let country of AWOCTest.getCountriesList()) {
            const result = chai
              .expect(AWOCTest.getCountryISO2(country))
              .to.be.a('string')
          }
          done()
        })
    }),
    describe('7. getCountryISO3(countryName) ', () => {
      it('catching thrown errors (no param)', done => {
        chai.expect(() => AWOCTest.getCountryISO3()).to.throw() // PASS
        done()
      }),
        it('catching thrown errors (wrong param)', done => {
          chai.expect(() => AWOCTest.getCountryISO3('Wrong Param')).to.throw() // PASS
          done()
        }),
        it('Expects to return a string.', done => {
          for (let country of AWOCTest.getCountriesList()) {
            const result = chai
              .expect(AWOCTest.getCountryISO3(country))
              .to.be.a('string')
          }
          done()
        })
    }),
    describe('8. getCountryTLD(countryName) ', () => {
      it('catching thrown errors (no param)', done => {
        chai.expect(() => AWOCTest.getCountryTLD()).to.throw() // PASS
        done()
      }),
        it('catching thrown errors (wrong param)', done => {
          chai.expect(() => AWOCTest.getCountryTLD('Wrong Param')).to.throw() // PASS
          done()
        }),
        it('Expects to return a string.', done => {
          for (let country of AWOCTest.getCountriesList()) {
            const result = chai
              .expect(AWOCTest.getCountryTLD(country))
              .to.be.a('string')
          }
          done()
        })
    }),
    describe('9. getCountryFIPS(countryName) ', () => {
      it('catching thrown errors (no param)', done => {
        chai.expect(() => AWOCTest.getCountryFIPS()).to.throw() // PASS
        done()
      }),
        it('catching thrown errors (wrong param)', done => {
          chai.expect(() => AWOCTest.getCountryFIPS('Wrong Param')).to.throw() // PASS
          done()
        }),
        it('Expects to return a string.', done => {
          for (let country of AWOCTest.getCountriesList()) {
            const result = chai
              .expect(AWOCTest.getCountryFIPS(country))
              .to.be.a('string')
          }
          done()
        })
    }),
    describe('10. getCountryISONumeric(countryName) ', () => {
      it('catching thrown errors (no param)', done => {
        chai.expect(() => AWOCTest.getCountryISONumeric()).to.throw() // PASS
        done()
      }),
        it('catching thrown errors (wrong param)', done => {
          chai
            .expect(() => AWOCTest.getCountryISONumeric('Wrong Param'))
            .to.throw() // PASS
          done()
        }),
        it('Expects to return a string.', done => {
          for (let country of AWOCTest.getCountriesList()) {
            const result = chai
              .expect(AWOCTest.getCountryISONumeric(country))
              .to.be.a('string')
          }
          done()
        })
    }),
    describe('11. getCountryGeoNameID(countryName) ', () => {
      it('catching thrown errors (no param)', done => {
        chai.expect(() => AWOCTest.getCountryISONumeric()).to.throw() // PASS
        done()
      }),
        it('catching thrown errors (wrong param)', done => {
          chai
            .expect(() => AWOCTest.getCountryGeoNameID('Wrong Param'))
            .to.throw() // PASS
          done()
        }),
        it('Expects to return a string.', done => {
          for (let country of AWOCTest.getCountriesList()) {
            const result = chai
              .expect(AWOCTest.getCountryGeoNameID(country))
              .to.be.a('string')
          }
          done()
        })
    }),
    describe('12. getCountryE164(countryName) ', () => {
      it('catching thrown errors (no param)', done => {
        chai.expect(() => AWOCTest.getCountryE164()).to.throw() // PASS
        done()
      }),
        it('catching thrown errors (wrong param)', done => {
          chai.expect(() => AWOCTest.getCountryE164('Wrong Param')).to.throw() // PASS
          done()
        }),
        it('Expects to return a string.', done => {
          for (let country of AWOCTest.getCountriesList()) {
            const result = chai
              .expect(AWOCTest.getCountryE164(country))
              .to.be.a('string')
          }
          done()
        })
    }),
    describe('13. getCountryPhoneCode(countryName) ', () => {
      it('catching thrown errors (no param)', done => {
        chai.expect(() => AWOCTest.getCountryPhoneCode()).to.throw() // PASS
        done()
      }),
        it('catching thrown errors (wrong param)', done => {
          chai
            .expect(() => AWOCTest.getCountryPhoneCode('Wrong Param'))
            .to.throw() // PASS
          done()
        }),
        it('Expects to return a string.', done => {
          for (let country of AWOCTest.getCountriesList()) {
            const result = chai
              .expect(AWOCTest.getCountryPhoneCode(country))
              .to.be.a('string')
          }
          done()
        })
    }),
    describe('14. getCountryContinentName(countryName) ', () => {
      it('catching thrown errors (no param)', done => {
        chai.expect(() => AWOCTest.getCountryContinentName()).to.throw() // PASS
        done()
      }),
        it('catching thrown errors (wrong param)', done => {
          chai
            .expect(() => AWOCTest.getCountryContinentName('Wrong Param'))
            .to.throw() // PASS
          done()
        }),
        it('Expects to return a string.', done => {
          for (let country of AWOCTest.getCountriesList()) {
            const result = chai
              .expect(AWOCTest.getCountryContinentName(country))
              .to.be.a('string')
          }
          done()
        })
    }),
    describe('15. getCountryContinentCode(countryName) ', () => {
      it('catching thrown errors (no param)', done => {
        chai.expect(() => AWOCTest.getCountryContinentCode()).to.throw() // PASS
        done()
      }),
        it('catching thrown errors (wrong param)', done => {
          chai
            .expect(() => AWOCTest.getCountryContinentCode('Wrong Param'))
            .to.throw() // PASS
          done()
        }),
        it('Expects to return a string.', done => {
          for (let country of AWOCTest.getCountriesList()) {
            const result = chai
              .expect(AWOCTest.getCountryContinentCode(country))
              .to.be.a('string')
          }
          done()
        })
    }),
    describe('16. getCountryCapitalCity(countryName) ', () => {
      it('catching thrown errors (no param)', done => {
        chai.expect(() => AWOCTest.getCountryCapitalCity()).to.throw() // PASS
        done()
      }),
        it('catching thrown errors (wrong param)', done => {
          chai
            .expect(() => AWOCTest.getCountryCapitalCity('Wrong Param'))
            .to.throw() // PASS
          done()
        }),
        it('Expects to return a string.', done => {
          for (let country of AWOCTest.getCountriesList()) {
            const result = chai
              .expect(AWOCTest.getCountryCapitalCity(country))
              .to.be.a('string')
          }
          done()
        })
    }),
    describe('17. getCountryTimeZone(countryName) ', () => {
      it('catching thrown errors (no param)', done => {
        chai.expect(() => AWOCTest.getCountryTimeZone()).to.throw() // PASS
        done()
      }),
        it('catching thrown errors (wrong param)', done => {
          chai
            .expect(() => AWOCTest.getCountryTimeZone('Wrong Param'))
            .to.throw() // PASS
          done()
        }),
        it('Expects to return a string.', done => {
          const res = AWOCTest.getCountriesList()
          for (let country of res) {
            chai.expect(AWOCTest.getCountryTimeZone(country)).to.be.a('string')
          }
          done()
        })
    }),
    describe('18. getCountryCurrencyName(countryName) ', () => {
      it('catching thrown errors (no param)', done => {
        chai.expect(() => AWOCTest.getCountryCurrencyName()).to.throw() // PASS
        done()
      }),
        it('catching thrown errors (wrong param)', done => {
          chai
            .expect(() => AWOCTest.getCountryCurrencyName('Wrong Param'))
            .to.throw() // PASS
          done()
        }),
        it('Expects to return a string.', done => {
          const res = AWOCTest.getCountriesList()
          for (let country of res) {
            chai
              .expect(AWOCTest.getCountryCurrencyName(country))
              .to.be.a('string')
          }
          done()
        })
    }),
    describe('19. getCountriesListByCurrency(currencyName, continentName = false)', () => {
      it('catching thrown errors (no param)', done => {
        chai.expect(() => AWOCTest.getCountriesListByCurrency()).to.throw() // PASS
        done()
      }),
        it('Expects to return a non empty array of strings.', done => {
          const resultData = AWOCTest.getCountriesListByCurrency(
            'Dollar',
            'North America'
          )
          chai.expect(resultData).to.be.a('array')

          // Looping through results.
          for (let c of resultData) {
            chai.expect(c).to.be.a('string')
          }
          done()
        })
    }),
    describe('20. getCountriesDataByCurrency(currencyName, continentName = false)', () => {
      it('catching thrown errors (no param)', done => {
        chai.expect(() => AWOCTest.getCountriesDataByCurrency()).to.throw() // PASS
        done()
      }),
        it('Expects to return a non empty array of objects.', done => {
          const resultData = AWOCTest.getCountriesDataByCurrency(
            'Dollar',
            'North America'
          )
          chai.expect(resultData).to.be.a('array')

          // Looping through results.
          for (let c of resultData) {
            chai
              .expect(c)
              .to.be.a('object')
              .and.to.be.jsonSchema(countryDataSchema)
          }
          done()
        })
    }),
    describe('21. getCountryLanguages(countryName)', () => {
      it('catching thrown errors (no param)', done => {
        chai.expect(() => AWOCTest.getCountryLanguages()).to.throw() // PASS
        done()
      }),
        it('catching thrown errors (wrong param)', done => {
          chai
            .expect(() => AWOCTest.getCountryLanguages('Wrong Param'))
            .to.throw() // PASS
          done()
        }),
        it('Expects to return an array of strings.', function(done) {
          const res = AWOCTest.getCountriesList()
          for (let country of res) {
            chai.expect(AWOCTest.getCountryLanguages(country)).to.be.a('string')
          }
          done()
        })
    }),
    describe("22. getCountryArea(countryName, unit = 'km2')", () => {
      it('catching thrown errors (no param)', done => {
        chai.expect(() => AWOCTest.getCountryArea()).to.throw() // PASS
        done()
      }),
        it('catching thrown errors (wrong param)', done => {
          chai.expect(() => AWOCTest.getCountryArea('Wrong Param')).to.throw() // PASS
          done()
        }),
        it('Expects to return a string value.', function(done) {
          const res = AWOCTest.getCountriesList()
          for (let country of res) {
            chai.expect(AWOCTest.getCountryArea(country)).to.be.a('number')
          }
          done()
        })
    })
})
