'use strict'

/**
 * ------------------------------------------
 *        *** A WORLD OF COUNTRIES ***
 * ------------------------------------------
 *
 * @description A comprehensive library API to retrieve collections of data about continents & countries, as defined by the ISO Standard 3166-1.
 * @author Luca Grandicelli <https://github.com/lucagrandicelli>
 * @version 1.0.0
 *
 * @license
 * Released under MIT license <https://github.com/lucagrandicelli/a-world-of-countries/blob/master/LICENSE>
 * Heavily based on lodash <https://lodash.com/>
 */

// Importing the core 'fs' module.
const fs = require('fs')

// Importing the core 'path' module.
const path = require('path')

// In order to avoid loading the whole 'lodash' package, let's split it up in multiple only-needed parts.
const _a = require('lodash/array')
const _c = require('lodash/collection')
const _l = require('lodash/lang')
const _o = require('lodash/object')
const _s = require('lodash/string')

// Loading the thirdy-party 'convert-units' module to help the Geopgraphy.js library to handle unit convertions.
const convert = require('convert-units')

// The path to the Global World Object Data file.
const GWODPath = path.join(__dirname, '/data/world.json')

/**
 * The AWOC (A World of Countries) class.
 *
 * This library relies on a central world.json (Global World Object Data) file which includes all the informations about continents and countries.
 * All the several methods included in this class just perform dynalic filtering of such data.
 *
 * Index
 * - CONTINENTS METHODS
 * - COUNTRIES METHODS
 *
 */
class AWOC {
  /**
   * The class constructor.
   * Here we load the Global World Object Data for first, then set up some of the class properties.
   */
  constructor() {
    // Reading and making the Global World Object Data available throughout the entire class.
    this.GWOD = this.readJSONData(GWODPath)

    // Setting up the limit of units after which a float number must be truncated.
    this._decimalFloor = 2
  }

  /**
   * --------------------------------------------------------
   * CONTINENTS METHODS
   * List of all AWOC.js methods about world continents.
   * --------------------------------------------------------
   *
   * Index
   * 1. getContinentsList(): a list of continent names.
   * 2. getContinents(): a list of continent objects.
   * --------------------------------------------------------
   */

  /**
   * 1. This method returns an array of continent names as strings.
   * @returns {Array}
   */
  getContinentsList() {
    return _a.uniq(_c.map(this.GWOD, 'Continent Name')).sort()
  }

  /**
   * 2. This method returns an array of continent objects.
   * A single continent is described as: {"Continent Code": [String], "Continent Name": [String]}
   * @returns {Array}
   */
  getContinents() {
    return _c.sortBy(
      _a.uniqBy(
        _c.map(this.GWOD, i =>
          _o.pick(i, ['Continent Code', 'Continent Name'])
        ),
        'Continent Code'
      ),
      [
        function(o) {
          return o['Continent Name']
        }
      ]
    )
  }

  /**
   * --------------------------------------------------------
   * COUNTRIES
   * List of all AWOC.js methods about world countries.
   * --------------------------------------------------------
   *
   * Index
   * 1. getCountries(): all countries data.
   * 2. getCountryData(countryName): the whole data package for a specified country.
   *    It can also return a specific key field, if exists, returning an array /w a single value.
   * 3. getCountriesList(): a list of country names.
   * 4. getCountriesListOf(continentName): a list of country names for a specific continent.
   * 5. getCountriesDataOf(): a list of country objects for a specific continent.
   * 6. getCountryISO2(countryName): the ISO2 code for the specified country.
   * 7. getCountryISO3(countryName): the ISO3 code for the specified country.
   * 8. getCountryTLD(countryName): the Top Level Domain (TLD) for the specified country.
   * 9. getCountryFIPS(countryName): the FIPS country code for the specified country.
   * 10. getCountryISONumeric(countryName): the ISO Numeric code for the specified country.
   * 11. getCountryGeoNameID(countryName): the GEO Name ID for the specified country.
   * 12. getCountryE164(countryName): the E164 code for the specified country.
   * 13. getCountryPhoneCode(countryName): the Phone Code for the specified country.
   * 14. getCountryContinentName(countryName): the continent data the specified country belongs to.
   * 15. getCountryContinentCode(countryName): the continent code the specified country belongs to.
   * 16. getCountryCapitalCity(countryName): the capital city of the specified country.
   * 17. getCountryTimeZone(countryName): a time zone value for the specific country.
   * 18. getCountryCurrencyName(countryName): the currency name for the specified country.
   * 19. getCountriesListByCurrency(currencyName, continentName = false):
   *     a list of countries filtered by a specific currency.
   * 20. getCountriesDataByCurrency(currencyName, continentName = false):
   *     one or multiple country object data for a specific currency.
   * 21. getCountryLanguages(countryName): a list of languages for the specific country.
   * 22. getCountryArea(countryName, unit = 'km2'): a non formatted value for the country area in km2 or mi2.
   * --------------------------------------------------------
   */

  /**
   * 1. getCountries()
   * This method extracts all the countries data from the GWOD.
   * It performs an additional sort to ensure the correct result alphabetical order,
   * regardless of the GWOD json objects order (which might fail).
   *
   * @returns {Array}
   */
  getCountries() {
    return _c.sortBy(_c.map(this.GWOD), ['Country Name'])
  }

  /**
   * 2. getCountryData(countryName, field = false)
   * This method returns a single country object data.
   * If a 'field' parameter is specified, then the method will return its value.
   * For a list of available fields, please check the example below:
   *
   * "Country Name": "Italy",
   * "ISO2": "IT",
   * "ISO3": "ITA",
   * "TLD": "it",
   * "FIPS": "IT",
   * "ISO Numeric": 380,
   * "GeoNameID": 3175395,
   * "E164": 39,
   * "Phone Code": 39,
   * "Continent Name": "Europe",
   * "Continent Code": "eu",
   * "Capital": "Rome",
   * "Time Zone in Capital": "Europe/Rome",
   * "Currency Name": "Euro",
   * "Languages": "Italian (official), German (parts of Trentino-Alto Adige region are predominantly German-speaking), French (small French-speaking minority in Valle d'Aosta region), Slovene (Slovene-speaking minority in the Trieste-Gorizia area)",
   * "Area KM2": 301230
   *
   * @param {String} countryName
   * @param {String} field
   * @returns {Object}
   */
  getCountryData(countryName, field = false) {
    // Parameters validation.
    if ('undefined' === typeof countryName) {
      throw new Error(`You must provide a country name.`)
    }

    // Sanitizing input fields.
    countryName = this.sanitizeCountryName(countryName)

    // Fetching full country data.
    const countryData = _c.find(this.GWOD, [
      'Country Name',
      _s.trim(countryName)
    ])

    // Let's make sure the countryData ain't empty.
    if (_l.isEmpty(countryData, true)) {
      throw new Error(
        `The specified Country Name "${countryName}" does not exist.`
      )
    }

    // If no key field has been provided, return the whole data object.
    if (!field || 'string' !== typeof field) {
      return countryData
    }

    // If the provided field exists, return it. Otherwise throw an error.
    if (_o.hasIn(countryData, field)) {
      // The langiage field must be returned as a list.
      return 'Languages' == field
        ? _s.split(countryData[field], ',')
        : countryData[field]
    } else {
      throw new Error('The specified country data property does not exist.')
    }
  }

  /**
   * 3. getCountriesList()
   * This method returns a list of country names sorted alphabetically.
   *
   * @returns {Array}
   */
  getCountriesList() {
    return _c.sortBy(_c.map(this.GWOD, 'Country Name'), ['Country Name'])
  }

  /**
   * 4. getCountriesListOf(continentName)
   * This method returns a list of country names sorted alphabetically for a specific continent.
   *
   * @param {String} continentName
   * @returns {Array}
   */
  getCountriesListOf(continentName) {
    // Parameters validation.
    if ('undefined' === typeof continentName) {
      throw new Error(
        'You must provide a continent name in order to use the getCountriesListOf() method.'
      )
    }

    // Sanitizing continent name
    continentName = this.sanitizeContinentName(continentName)

    // Filtering data.
    const res = _c.sortBy(
      _c.map(
        _c.filter(this.GWOD, { 'Continent Name': _s.trim(continentName) }),
        'Country Name'
      ),
      ['Country Name']
    )

    // If the returned data is an empty array, a wrong continent name has been provided.
    if (0 == res.length) {
      throw new Error(`${continentName} is not a valid continent name.`)
    }

    // Returning data.
    return res
  }

  /**
   * 5. getCountriesDataOf(continentName)
   * This method returns a list of country objects alphabetically sorted per each country name for a specific continent.
   *
   * @param {String} continentName
   * @returns {Array}
   */
  getCountriesDataOf(continentName) {
    // Parameters validation.
    if ('undefined' === continentName) {
      throw new Error(
        'You must provide a continent name in order to use the getCountriesDataOf() method.'
      )
    }

    // Sanitizing continent name
    continentName = this.sanitizeContinentName(continentName)

    // Returning data.
    return _c.sortBy(
      _c.filter(this.GWOD, { 'Continent Name': _s.trim(continentName) }),
      ['Country Name']
    )
  }

  /**
   * 6. This method returns the ISO2 code for the specified country.
   *
   * @param {String} countryName
   * @returns {String}
   */
  getCountryISO2(countryName) {
    return this.getCountryData(countryName, 'ISO2')
  }

  /**
   * 7. This method returns the ISO3 code for the specified country.
   *
   * @param {String} countryName
   * @returns {String}
   */
  getCountryISO3(countryName) {
    return this.getCountryData(countryName, 'ISO3')
  }

  /**
   * 8. This method returns the Top Level Domain code for the specified country.
   *
   * @param {String} countryName
   * @returns {String}
   */
  getCountryTLD(countryName) {
    return this.getCountryData(countryName, 'TLD')
  }

  /**
   * 9. This method returns the FIPS (Federal Information Processing Standard Publication) code for the specified country.
   *
   * @param {String} countryName
   * @returns {String}
   */
  getCountryFIPS(countryName) {
    return this.getCountryData(countryName, 'FIPS')
  }

  /**
   * 10. This method returns the ISO Numeric code for the specified country.
   *
   * @param {String} countryName
   * @returns {Number}
   */
  getCountryISONumeric(countryName) {
    return this.getCountryData(countryName, 'ISO Numeric')
  }

  /**
   * 11. This method returns the E164 code for the specified country.
   *
   * @param {String} countryName
   * @returns {Number}
   */
  getCountryGeoNameID(countryName) {
    return this.getCountryData(countryName, 'GeoNameID')
  }

  /**
   * 12. This method returns the E164 code for the specified country.
   *
   * @param {String} countryName
   * @returns {Number}
   */
  getCountryE164(countryName) {
    return this.getCountryData(countryName, 'E164')
  }

  /**
   * 13. This method returns the Phone Coden code for the specified country.
   *
   * @param {String} countryName
   * @returns {Number}
   */
  getCountryPhoneCode(countryName) {
    return this.getCountryData(countryName, 'Phone Code')
  }

  /**
   * 14. This method returns the continent name the specified country belongs to.
   *
   * @param {String} countryName
   * @returns {Number}
   */
  getCountryContinentName(countryName) {
    return this.getCountryData(countryName, 'Continent Name')
  }

  /**
   * 15. This method returns the continent code the specified country belongs to.
   *
   * @param {String} countryName
   * @returns {Number}
   */
  getCountryContinentCode(countryName) {
    return this.getCountryData(countryName, 'Continent Code')
  }

  /**
   * 16. This method returns the Capital City for the specified country.
   *
   * @param {String} countryName
   * @returns {String}
   */
  getCountryCapitalCity(countryName) {
    return this.getCountryData(countryName, 'Capital')
  }

  /**
   * 17. This method returns the time zone value for a specific country.
   *
   * @param {String} countryName
   * @returns {String}
   */
  getCountryTimeZone(countryName) {
    return this.getCountryData(countryName, 'Time Zone in Capital')
  }

  /**
   * 18. This method returns the currency name for the specified country.
   *
   * @param {String} countryName
   * @returns {Number}
   */
  getCountryCurrencyName(countryName) {
    return this.getCountryData(countryName, 'Currency Name')
  }

  /**
   * 19. This function return a list of countries filtered by the specific currency value.
   * An additional parameter 'continentName' is available to limit the search to a specific continent.
   *
   * @param {String} currencyName
   * @param {String} continentName
   * @returns {Array}
   */
  getCountriesListByCurrency(currencyName, continentName = false) {
    // Parameters validation.
    if ('undefined' === typeof currencyName) {
      throw new Error(
        'You must provide a currency name in order to use the getCountriesListByCurrency() method.'
      )
    }

    // Setting up conditions.
    let conditions = { 'Currency Name': _s.trim(currencyName) }

    // Checking if a continent name has been provided.
    if (continentName) {
      // Sanitizing input fields.
      continentName = this.sanitizeContinentName(continentName)

      // Trimming and assigning value to the conditions object.
      conditions['Continent Name'] = _s.trim(continentName)
    }

    // Filtering GWOD and return.
    return _c.sortBy(_c.map(_c.filter(this.GWOD, conditions), 'Country Name'), [
      'Country Name'
    ])
  }

  /**
   * 20. This function return a list of country data filtered by the specific currency value.
   * An additional parameter 'continentName' is available to limit the search to a specific continent.
   *
   * @param {String} currencyName
   * @param {String} continentName
   * @returns {Array}
   */
  getCountriesDataByCurrency(currencyName, continentName = false) {
    // Parameters validation.
    if ('undefined' === typeof currencyName) {
      throw new Error(
        'You must provide a currency name in order to use the getCountriesDataByCurrency() method.'
      )
    }

    // Setting up conditions.
    let conditions = { 'Currency Name': _s.trim(currencyName) }

    // Checking if a continent name has been provided.
    if (continentName) {
      // Sanitizing input fields.
      continentName = this.sanitizeContinentName(continentName)

      // Trimming and assigning value to the conditions object.
      conditions['Continent Name'] = _s.trim(continentName)
    }

    // Filtering GWOD and return.
    return _c.sortBy(_c.filter(this.GWOD, conditions), ['Country Name'])
  }

  /**
   * 21. This method returns a list of languages for the specified country.
   *
   * @param {String} countryName
   * @returns {Array}
   */
  getCountryLanguages(countryName) {
    // Parameters validation.
    if ('undefined' === typeof countryName) {
      throw new Error(
        'You must provide a country name in order to use the getCountryLanguages() method.'
      )
    }

    // Sanitizing input fields.
    countryName = this.sanitizeCountryName(countryName)

    // Get country language code(s)
    const res = _l.toString(
      _c.map(
        _c.filter(this.GWOD, { 'Country Name': _s.trim(countryName) }),
        'Languages'
      )
    )

    // If the returned data is an empty array, a wrong country name has been provided.
    if (0 == res.length) {
      throw new Error(`${countryName} is not a valid country name.`)
    }

    // Return an array of languages.
    return res
  }

  /**
   * 22. This method returns the geographic area in km2 || mi2 for the specified country.
   * The return value is unformatted. Parse it as you wish.
   *
   * @param {String} countryName
   * @param {String (km2|mi2)} unit
   */
  getCountryArea(countryName, unit = 'km2') {
    // Parameters validation.
    if ('undefined' === typeof countryName) {
      throw new Error(
        'You must provide a country name in order to use the getCountryLanguages() method.'
      )
    }

    // Sanitizing input fields.
    countryName = this.sanitizeCountryName(countryName)

    const res = _l.toNumber(
      _c.map(
        _c.filter(this.GWOD, { 'Country Name': _s.trim(countryName) }),
        'Area KM2'
      )
    )

    // If the returned data is an empty array, a wrong country name has been provided.
    if (0 == res) {
      throw new Error(`${countryName} is not a valid country name.`)
    }

    return unit == 'mi2'
      ? this.km2ToMi2(res)
      : parseFloat(res.toFixed(this._decimalFloor))
  }

  /**
   * --------------------------------------------------------
   * HELPERS
   * A list of methods used to perform internal operations.
   * --------------------------------------------------------
   *
   * Index.
   * 1. readJSONData(file): opens and streams the Global World JSON Data Object.
   * 2. km2ToMi2(km2Val): convert square kilometers to square miles.
   * 3. miles2ToKm2(ml2Val): convert square miles to square kilometers.
   * 4. sanitizeContinentName(inputField): sanitizes input values for continent names.
   * 5. sanitizeCountryName(inputField): sanitizes input values for country names.
   * --------------------------------------------------------
   */

  /**
   * 1. This helper opens and streams the Global World Data Object
   * @param {String} file
   */
  readJSONData(file) {
    try {
      // Read the Global World Data Object source file.
      const fileContents = fs.readFileSync(file, 'utf8')

      // Parse the Global World Data Object source file.
      return JSON.parse(fileContents)
    } catch (err) {
      // If any error was found, throw it.
      throw new Error(err)
    }
  }

  /**
   * 2. This helper convert square kilometers to square miles
   * @param {float} km2Val
   */
  km2ToMi2(km2Val) {
    return parseFloat(
      convert(km2Val)
        .from('km2')
        .to('mi2')
        .toFixed(this._decimalFloor)
    )
  }

  /**
   * 3. This helper convert square miles to square kilometers
   * @param {float} ml2Val
   */
  miles2ToKm2(ml2Val) {
    return parseFloat(
      convert(ml2Val)
        .from('mi2')
        .to('km2')
        .toFixed(this._decimalFloor)
    )
  }

  /**
   * 4. This method sanitizes any string used as continent name.
   * For example, if you use 'africa', or 'south AMERICA', or 'NorTH ameRICA'... everything will be ok.
   * @param {String} inputField
   */
  sanitizeContinentName(inputField) {
    // Let's break down the input data into an array of words.
    const wordsList = _s.split(inputField, ' ')

    // Looping words.
    _c.forEach(wordsList, (el, index) => {
      // Let's put el lowercase for first.
      el = _s.toLower(el)
      wordsList[index] = _s.upperFirst(el)
    })

    // Return sanitized string.
    return _a.join(wordsList, ' ')
  }

  /**
   * 5. This method sanitizes any string used as country name.
   * For example, if you use 'italy', or 'united kingdom', or 'UniTED kinGDOM'... everything will be ok.
   * @param {String} inputField
   */
  sanitizeCountryName(inputField) {
    // Some words must not be included in any kind of string transformation.
    const excludedWordsFromCapitalization = ['of', 'and', 'the', '.', 'U.S.']

    // Let's break down the input data into an array of words.
    const wordsList = _s.split(inputField, ' ')

    // Looping words.
    _c.forEach(wordsList, (el, index) => {
      // Making Start Case /w everything except some defined words.
      if (!excludedWordsFromCapitalization.includes(el)) {
        // Let's put el lowercase for first.
        el = _s.toLower(el)

        // Check if the current word is a multi-word with the '-' char in it.
        if (el.includes('-')) {
          let tempSubWords = _s.split(el, '-')

          _c.forEach(tempSubWords, (el, index) => {
            tempSubWords[index] = _s.upperFirst(el)
          })
          el = _a.join(tempSubWords, '-')
        }
        wordsList[index] = _s.upperFirst(el)
      }
    })

    // Return sanitized string.
    return _a.join(wordsList, ' ')
  }
}

// Exporting class.
module.exports = AWOC
