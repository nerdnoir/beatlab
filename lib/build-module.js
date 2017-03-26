const yaml = require('js-yaml')
const fs = require('fs')
const path = require('path')
const templates = require('./templates')
const process = require('process')
const R = require('ramda')

const readFile = (path) => fs.readFileSync(path, 'utf-8').toString()

function sectionFromModules(moduleDir) {
  const sections = []

  const modulePath = path.join(moduleDir, 'module.yml')
  const manifest = yaml.safeLoad(readFile(modulePath), 'utf8')

  for (let slide of manifest.slides) {

    const slidePath = path.join(moduleDir, slide)

    for (let matcher of templates) {

      if (matcher[0](slidePath)) {

        const pipeline = matcher[1]

        const assembleViewData = (content) => {
          return {
            id: 'XYZ',
            content: content
          }
        }

        const renderSlideSection = R.pipe(pipeline.read, assembleViewData, pipeline.render)

        sections.push(renderSlideSection(slidePath))
      }
    }
  }
  return sections
}

module.exports = sectionFromModules

console.log(sectionFromModules(process.argv[2]).join('\n'))
