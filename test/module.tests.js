const chai = require('chai')
const expect = chai.expect
chai.use(require('chai-string'))
const path = require('path')
const Loader = require('../lib/loader')

const Module = require('../lib/module')

describe('Module', () => {
  describe('Creating', () => {
    
    this.manifest = new Loader().loadModuleManifest('main')
    this.subject = new Module(this.manifest)

    it('copies module data to the slide entry.', () => {
      expect(this.subject.sections[0].module.title).to.equal('Git/GitHub Best Practices')
      expect(this.subject.sections[10].module.title).to.equal('Test Sub Sub Module')
    })

    it('copied module data DOES NOT contain sections', () => {
      expect(this.subject.sections[0].module.sections).to.be.undefined
    })
  })

  describe('Sections', () => {
    it('pulls in sections from referenced modules', () => {
      const loader = new Loader()
      const manifest = loader.loadModuleManifest('main')
      const subject = new Module(manifest)
      expect(subject.sections.length).to.equal(16)
    })
  })
})
