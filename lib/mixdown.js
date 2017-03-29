// Let's setup our rules
const renderers = require('./renderers')

renderers.register({
  name: "markdown",
  pattern: renderers.TESTS.markdown,
  read: renderers.HELPERS.readFileIntoString,
  template: renderers.HELPERS.createTemplate('markdown')})

renderers.register({
  name: "image",
  pattern: renderers.TESTS.image,
  read: renderers.HELPERS.readFileIntoDataURI,
  template: renderers.HELPERS.createTemplate('image')})

renderers.register({
  name: "svg",
  pattern: renderers.TESTS.svg,
  read: renderers.HELPERS.readFileIntoDataURI,
  template: renderers.HELPERS.createTemplate('svg')})

renderers.register({
  name: "html",
  pattern: renderers.TESTS.html,
  read: renderers.HELPERS.readFileIntoString,
  template: renderers.HELPERS.createTemplate('html')})


const Module = require('./module')

// Load a module
const record = new Module("example-module")

for (let section of record.sections) {
  console.log(renderers.render(section))
}