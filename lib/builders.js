const fs = require('fs')
const path = require('path')
const datauri = require('datauri').sync
const R = require('ramda')
const Handlebars = require('handlebars')
const Module = require('./module')

const TESTS = {
  markdown : new RegExp(/.*\.md$/),
  html : new RegExp(/.*\.html$/),
  image : new RegExp(/.*\.jpg$|\.jpeg$|\.png$|\.gif$/),
  svg : new RegExp(/.*\.svg$/),
  localModule : new RegExp(/\+.*\/$/)
}

const HELPERS = {
  readFileIntoString: (filePath) => fs.readFileSync(filePath).toString(),
  readFileIntoDataURI: (filePath) => datauri(filePath),
  readModule: (path) => new Module(path).sections,
  createTemplate: (name) => {
    const templatePath = path.join(__dirname, `./template/${name}.handlebars`)
    const rawFile = HELPERS.readFileIntoString(templatePath)
    return Handlebars.compile(rawFile)
  }
}

let builders = []

module.exports.TESTS = TESTS;
module.exports.HELPERS = HELPERS;

module.exports.register = (builder) => {
  const defaults = {
    viewData: (r) => {return { content: r }}
  }
  const withDefaults = R.merge(defaults, builder)
  builders.push(withDefaults)
}

module.exports.build = (path) => {
  for(let builder of builders) {
    if (builder.pattern.test(path)) {
      const pipe = R.pipe(builder.read, builder.viewData, builder.template)
      return pipe(path)
    }
  }
}

module.exports.reset = () => builders = []