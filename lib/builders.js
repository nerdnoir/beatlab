const fs = require('fs')
const path = require('path')
const R = require('ramda')
const datauri = require('datauri').sync
const Handlebars = require('handlebars')

const HELPERS = {
  readFileIntoString: (section) => {
    section.content = fs.readFileSync(section.slidePath).toString()
    return section
  },
  readFileIntoDataURI: (section) => {
    section.content = datauri(section.slidePath)
    return section
  },
  createTemplate: (name) => {
    const templatePath = path.join(__dirname, `../template/${name}.handlebars`)
    const rawFile = fs.readFileSync(templatePath).toString()
    return Handlebars.compile(rawFile)
  }
}

let builders = []

module.exports.HELPERS = HELPERS

module.exports.register = (builder) => {
  const builderName = builder.name
  const defaults = {
    template: HELPERS.createTemplate(builderName)
  }
  const withDefaults = R.merge(defaults, builder)
  builders.push(withDefaults)
}

module.exports.build = (section) => {
  for (let builder of builders) {
    if (builder.match(section.slidePath)) {
      const pipeline = R.pipe(builder.read, builder.template)
      return pipeline(section)
    }
  }
}

module.exports.reset = () => builders = []
