const yaml = require('js-yaml')
const fs = require('fs')
const path = require('path')
const process = require('process')
const handlers = require('./slide-handlers')

const readFile = (path) => fs.readFileSync(path, 'utf-8').toString()

function sectionFromModules(moduleDir) {
  const sections = []

  const modulePath = path.join(moduleDir, 'module.yml')
  const manifest = yaml.safeLoad(readFile(modulePath), 'utf8')

  for (let slide of manifest.slides) {
    const slidePath = path.join(moduleDir, slide)
    const render = handlers(slidePath).createPipe()
    console.log(slidePath)
    sections.push(render())
  }
  return sections
}

module.exports = sectionFromModules

console.log(sectionFromModules(process.argv[2]).join('\n'))