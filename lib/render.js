const fs = require('fs')
const datauri = require('datauri').sync
const R = require('ramda')
const Handlebars = require('handlebars')
const path = require('path')
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

let renderers = []

module.exports.TESTS = TESTS;
module.exports.HELPERS = HELPERS;

module.exports.register = (renderer) => {
  const defaults = {
    viewData: (r) => {return { content: r }}
  }
  const rendererWithDefaults = R.merge(defaults, renderer)
  renderers.push(rendererWithDefaults)
}

module.exports.render = (path) => {
  for(let renderer of renderers) {
    if (renderer.pattern.test(path)) {
      const pipe = R.pipe(renderer.read, renderer.viewData, renderer.template)
      return pipe(path)
    }
  }
}

module.exports.reset = () => renderers = []