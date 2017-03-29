const R = require("ramda")
const path = require("path")
const process = require("process")
const fs = require("fs")
const yaml = require('js-yaml')

class Module {

  constructor(fromPath) {

    const sanitizedPath = fromPath.replace('@','')
    this.baseDir = process.env.BEATLAB_MODULES || path.join(process.cwd(), "modules")
    this.moduleDir = path.join(this.baseDir, sanitizedPath)
    this.fullPath = path.join(this.moduleDir, "module.yml")

    if (!fs.existsSync(this.fullPath)) throw "Module not found."

    this.sections = []

    const readFile = (path) => fs.readFileSync(path, 'utf-8').toString()
    const manifest = yaml.safeLoad(readFile(this.fullPath), 'utf8')

    for (let section of manifest.sections) {
      const isModule = R.has('module')
      const isSlide = R.has('slide')

      if (isModule(section)) {
        const modulePath = section['module']
        const subModule = new Module(modulePath)
        this.sections = this.sections.concat(subModule.sections)
      }

      if (isSlide(section)) {
        const slidePath = path.join(this.moduleDir, section['slide'])
        this.sections.push({ path: slidePath, data: R.omit(['slides'], manifest) })
      }

    }
  }
}

module.exports = Module;