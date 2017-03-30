const fs = require('fs')
const path = require('path')
const datauri = require('datauri').sync
const R = require('ramda')
const Handlebars = require('handlebars')
const Module = require('./module')

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

module.exports.HELPERS = HELPERS;

module.exports.register = (builder) => {
  const builderName = builder.name
  const defaults = {
    viewData: (r) => {return { content: r }},
    templateFunc: HELPERS.createTemplate(builderName)
  }
  const withDefaults = R.merge(defaults, builder)
  builders.push(withDefaults)
}

module.exports.build = (path) => {
  for(let builder of builders) {
    if (builder.match(path)) {
      const pipeline = R.pipe(builder.read, builder.viewData, builder.templateFunc)
      return pipeline(path)
    }
  }
}

module.exports.reset = () => builders = []