const R = require("ramda")
const path = require("path")
const process = require("process")
const fs = require("fs")
const yaml = require('js-yaml')
const getHandler = require('./slide-handlers')

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

    for (let slide of manifest.slides) {

      // Check for referenced module
      if (slide.startsWith('+')) {
        const modulePath = slide.replace('+', '')
        const module = new Module(modulePath);
        this.sections = this.sections.concat(module.sections)
      } else {
        const slidePath = path.join(this.moduleDir, slide)
        this.sections.push(slidePath)
      }

    }
  }

}

module.exports = Module;