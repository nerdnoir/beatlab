const chai = require('chai')
const expect = chai.expect
chai.use(require('chai-string'))
const path = require('path')
const Loader = require('../lib/loader')
const Module = require('../lib/module')

describe('Loader', () => {
  
  describe('Locates the module repository.', () => {
    describe('When BEATLAB_HOME is set,', () => {
      it('that is the module repo path.', () => {
        process.env.BEATLAB_HOME = '/var/beatlab-modules'
        expect(new Loader().moduleRepo()).to.equal('/var/beatlab-modules')
        delete process.env.BEATLAB_HOME
      })
    })

    describe('When BEATLAB_HOME is not set,', () => {
      it('assume module repo is in a "modules" sub-directory.', () => {
        expect(new Loader().moduleRepo()).to.equal(path.join(process.cwd(), 'modules'))
      })
    })

    it('the module path can be overridden.', () => {
      const actual = new Loader('./custom/path').moduleRepo()
      expect(actual).to.equal('./custom/path')

      process.env.BEATLAB_HOME = '/var/beatlab-modules'
      const actualWithEnvVar = new Loader('./custom/path').moduleRepo()
      expect(actualWithEnvVar).to.equal('./custom/path')
      delete process.env.BEATLAB_HOME
    })
  })
  
  describe("Loads module manifests.", () => {
    it("Manifests are used to re-hydrate Module objects.", () => {
      const manifest = new Loader().loadModuleManifest("main")
      expect(manifest).to.have.property('sections')
    })
    
    it("Will throw an error if the module cannot be found.", () => {
      expect(() => new Loader().loadModuleManifest("no-such-module")).to.throw("Module not found")
    })
  })
})
