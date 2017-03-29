// Let's setup our rules
const builders = require('./builders')

builders.register({
  name: "markdown",
  pattern: builders.TESTS.markdown,
  read: builders.HELPERS.readFileIntoString,
  template: builders.HELPERS.createTemplate('markdown')})

builders.register({
  name: "image",
  pattern: builders.TESTS.image,
  read: builders.HELPERS.readFileIntoDataURI,
  template: builders.HELPERS.createTemplate('image')})

builders.register({
  name: "svg",
  pattern: builders.TESTS.svg,
  read: builders.HELPERS.readFileIntoDataURI,
  template: builders.HELPERS.createTemplate('svg')})

builders.register({
  name: "html",
  pattern: builders.TESTS.html,
  read: builders.HELPERS.readFileIntoString,
  template: builders.HELPERS.createTemplate('html')})


const Module = require('./module')

// Load a module
const record = new Module("example-module")

for (let section of record.sections) {
  console.log(builders.render(section))
}