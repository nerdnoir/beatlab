const chai = require("chai")
const expect = chai.expect
chai.use(require('chai-string'))
const path = require("path")
const loader = require('../../lib/loader')

const Module = require('../../lib/module')

describe("Module", () => {

  describe("Creating", () => {

    this.subject = new Module(path.join(loader.moduleRepo(), "example-module"))

    it("assumes modules are in a subdir 'modules'", () => {
      expect(this.subject.manifestPath).to.startWith(path.join(process.cwd(), "modules"))
    })

    it("appends 'module.yml' to the path", () => {
      expect(this.subject.manifestPath).to.endWith("example-module/module.yml")
    })

    it("copies module data to the slide entry.", () => {
      expect(this.subject.sections[0].data.title).to.equal('Git/GitHub Best Practices')
      expect(this.subject.sections[7].data.title).to.equal('Test Sub Sub Module')
    })

    it("copied module data DOES NOT contain slides", () => {
      expect(this.subject.sections[0].data.slides).to.be.undefined;
    })

    describe("is done on the defense!", () => {

      it("Throw an error when the module path does not exist.", () => {
        let bogusPath = path.join(loader.moduleRepo(), "example2-module");
        expect(() => new Module(bogusPath).to.throw("Module not found."))
      })

    })

  })

  describe("Sections", () => {
    it ("pulls in sections from referenced modules", () => {
      const subject = new Module(path.join(loader.moduleRepo(), "example-module"))
      expect(subject.sections.length).to.equal(9)
    })
  })
})