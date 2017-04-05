// eslint-disable-next-line no-unused-vars
const mocha = require('mocha')

const chai = require('chai')
chai.use(require('chai-string'))

const R = require('ramda')

module.exports.describe = mocha.describe
module.exports.it = mocha.it
module.exports.before = mocha.before
module.exports.after = mocha.after
module.exports.beforeEach = mocha.beforeEach
module.exports.afterEach = mocha.afterEach
module.exports.expect = mocha.expect
module.exports.R = mocha.R
