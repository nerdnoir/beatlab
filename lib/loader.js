const path = require('path')
const fs = require('fs')
const yaml = require('js-yaml')

class Loader {
  constructor (customPath = null) {
    this.customPath = customPath
  }

  moduleRepo () {
    return this.customPath || process.env.BEATLAB_HOME || path.join(process.cwd(), 'modules')
  }
  
  loadModuleManifest (moduleName) {
    const moduleFullPath = this.resolveModulePath(moduleName)
    const manifestPath = path.join(moduleFullPath, 'module.yml')
  
    if (!fs.existsSync(manifestPath)) throw new Error(`Module not found: /"${moduleName}/".`)
    
    const readFile = (path) => fs.readFileSync(path, 'utf-8').toString()
    const manifest = yaml.safeLoad(readFile(manifestPath), 'utf8')
   
    manifest.moduleName = moduleName
    
    return manifest
  }
  
  resolveModulePath (moduleName) {
    return path.join(this.moduleRepo(), moduleName)
  }
  
  resolveSlidePath (moduleName, slideName) {
    const moduleFullPath = this.resolveModulePath(moduleName)
    const slideFullPath = path.join(moduleFullPath, slideName)
    if (!fs.existsSync(slideFullPath)) throw new Error('Slide not found.')
    return slideFullPath
  }
}

module.exports = Loader
