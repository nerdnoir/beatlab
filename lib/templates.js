const fs = require('fs')
const path = require('path')
const Handlebars = require('handlebars')
const datauri = require('datauri').sync
const matcher = require('./matchers')

const readFileIntoString = (filePath) => fs.readFileSync(filePath).toString()
const readFileIntoDataURI = (filePath) => datauri(filePath)

const createTemplate = (name) => {
  const templatePath = path.join(__dirname, `./template/${name}.handlebars`)
  const rawFile = readFileIntoString(templatePath)
  return Handlebars.compile(rawFile)
}

let templates = []

const addTemplate = (matcher, template) => {
  let matchPredicate = function (slide) { return matcher.test(slide) }
  templates.push([matchPredicate, template])
}

addTemplate(matcher.markdown, {read: readFileIntoString, render: createTemplate('markdown')})
addTemplate(matcher.html, {read: readFileIntoString, render: createTemplate('html')})
addTemplate(matcher.image, {read: readFileIntoDataURI, render: createTemplate('image')})
addTemplate(matcher.pdf, {read: readFileIntoDataURI, render: createTemplate('pdf')})
addTemplate(matcher.svg, {read: readFileIntoDataURI, render: createTemplate('svg')})

module.exports = templates