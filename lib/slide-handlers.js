const fs = require('fs')
const datauri = require('datauri').sync
const R = require('ramda')
const Handlebars = require('handlebars')
const path = require('path')

const readFileIntoString = (filePath) => fs.readFileSync(filePath).toString()
const readFileIntoDataURI = (filePath) => datauri(filePath)

const createTemplate = (name) => {
  const templatePath = path.join(__dirname, `./template/${name}.handlebars`)
  const rawFile = readFileIntoString(templatePath)
  return Handlebars.compile(rawFile)
}

const noOpReader = (entry) => {}

const matchers = {
  markdown : [/.*\.md$/, readFileIntoString],
  html : [/.*\.html$/, readFileIntoString],
  image : [/.*\.jpg$|\.jpeg$|\.png$|\.gif$/, readFileIntoDataURI],
  svg : [/.*\.svg$/, readFileIntoDataURI],
  localModule : [/@.*\/$/, noOpReader],
  gitRepo : [/git\:\/\/.*$/, noOpReader]
}

class Renderer {
  constructor(kind, path, reader) {
    this.kind = kind
    this.path = path
    this.readerFunc = reader;
  }

  createPipe(viewDataFunc = (content) => { return {content: content} }) {
    const templateFunc = createTemplate(this.kind)
    return R.pipe(()=>this.readerFunc(this.path), viewDataFunc, templateFunc)
  }
}

class NoRender extends Renderer {
  constructor(path) {
    super("NOOP", path, noOpReader)
  }

  createPipe(contentBuilder) {
    return noOpReader;
  }
}

function factory(entry) {
  for (let key in matchers) {
    if (matchers[key][0].test(entry)) {
      return new Renderer(key, entry, matchers[key][1])
    }
  }
  return new NoRender(entry)
}

module.exports = factory