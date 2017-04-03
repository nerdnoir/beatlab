// Let's setup our rules
const builders = require('./builders')
const R = require('ramda')
const path = require('path')

builders.register({
  name: 'markdown',
  match: R.test(/.*\.md$/),
  read: builders.HELPERS.readFileIntoString})

builders.register({
  name: 'image',
  match: R.test(/.*\.jpg$|\.jpeg$|\.png$|\.gif$/),
  read: builders.HELPERS.readFileIntoDataURI })

builders.register({
  name: 'svg',
  match: R.test(/.*\.svg$/),
  read: builders.HELPERS.readFileIntoDataURI })

builders.register({
  name: 'html',
  match: R.test(/.*\.html$/),
  read: builders.HELPERS.readFileIntoString })

builders.register({
  name: 'video',
  match: R.test(/.*\.webm$/),
  read: builders.HELPERS.readFileIntoDataURI})

builders.register({
  name: 'youtube',
  match: R.test(/.*\.youtube$/),
  read: (section) => {
    section.content = path.basename(section.slidePath.replace('.youtube', ''))
    return section
  }})

module.exports = function (moduleAbsolutePath) {
  const Module = require('./module')

  const targetModule = new Module(moduleAbsolutePath)

  const sections = []
  for (let section of targetModule.sections) {
    sections.push(builders.build(section))
  }

  return sections
}
