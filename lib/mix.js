// Let's setup our rules
const builders = require('./builders')
const R = require('ramda')

builders.register({
  name: "markdown",
  match: R.test(/.*\.md$/),
  read: builders.HELPERS.readFileIntoString,
  template: builders.HELPERS.createTemplate('markdown')})

builders.register({
  name: "image",
  match: R.test(/.*\.jpg$|\.jpeg$|\.png$|\.gif$/),
  read: builders.HELPERS.readFileIntoDataURI,
  template: builders.HELPERS.createTemplate('image')})

builders.register({
  name: "svg",
  match: R.test(/.*\.svg$/),
  read: builders.HELPERS.readFileIntoDataURI,
  template: builders.HELPERS.createTemplate('svg')})

builders.register({
  name: "html",
  match: R.test(/.*\.html$/),
  read: builders.HELPERS.readFileIntoString,
  template: builders.HELPERS.createTemplate('html')})

module.exports = function(moduleAbsolutePath) {

  const Module = require('./module')

  const targetModule = new Module(moduleAbsolutePath)

  const sections = []
  for (let section of targetModule.sections) {
    sections.push(builders.build(section.path))
  }

  return sections
}

