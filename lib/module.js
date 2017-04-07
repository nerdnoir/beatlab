const R = require('ramda')
const Loader = require('./loader')

class Module {
  constructor (manifest, loader = new Loader()) {
    this.manifest = manifest;
    this.name = manifest.moduleName;
    this.sections = []
    
    for (let section of manifest.sections) {
      const isModule = R.has('module')
      const isSlide = R.has('slide')

      if (isModule(section)) {
        const referencedModuleManifest = loader.loadModuleManifest(section['module'])
        const referencedModule = new Module(referencedModuleManifest)
        this.sections = this.sections.concat(referencedModule.sections)
      }

      if (isSlide(section)) {
        const slidePath = loader.resolveSlidePath(this.name, section.slide)
        this.sections.push({ slidePath: slidePath, module: R.omit(['sections'], this.manifest) })
      }
    }
  }
}

module.exports = Module
