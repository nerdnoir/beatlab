const R = require("ramda")
const path = require("path")
const process = require("process")
const fs = require("fs")
const yaml = require('js-yaml')
const loader = require('./loader')

class Module {

  constructor(modulePath) {

    this.manifestPath = path.join(modulePath, 'module.yml')

    if (!fs.existsSync(this.manifestPath)) throw "Module not found."

    this.sections = []

    const readFile = (path) => fs.readFileSync(path, 'utf-8').toString()
    const manifest = yaml.safeLoad(readFile(this.manifestPath), 'utf8')

    for (let section of manifest.sections) {
      const isModule = R.has('module')
      const isSlide = R.has('slide')

      if (isModule(section)) {
        const subModulePath = path.join(loader.moduleRepo(), section['module'])
        const subModule = new Module(subModulePath)
        this.sections = this.sections.concat(subModule.sections)
      }

      if (isSlide(section)) {
        const slidePath = path.join(modulePath, section['slide'])
        console.log(slidePath)
        this.sections.push({ path: slidePath, data: R.omit(['slides'], manifest) })
      }

    }
  }
}

module.exports = Module;