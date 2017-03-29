const chai = require("chai")
const expect = chai.expect
chai.use(require('chai-string'))
const path = require("path")

const Module = require('../../lib/module.js')

describe("Module", () => {

  describe("Creation", () => {

    it("assumes modules are in a subdir 'modules'", () => {
      const subject = new Module("example-module")
      expect(subject.fullPath).to.startWith(path.join(process.cwd(), "modules"))
    })

    it("appends 'module.yml' to the path", () => {
      const subject = new Module("example-module")
      expect(subject.fullPath).to.endWith("example-module/module.yml")
    })

    it("will sanitize module references beginning with '@'", () => {
      const subject = new Module("@example-module")
      expect(subject.fullPath).to.endWith("/example-module/module.yml")
    })

    it("will throw an error if the module path does not exist", () => {
      expect(() => new Module("@example2-module")).to.throw("Module not found.")
    })

    it("can get base path from the environment variable, 'BEATLAB_MODULES'", () => {
      process.env.BEATLAB_MODULES = "./modules"
      const subject = new Module("example-module")
      expect(subject.fullPath).to.startWith("modules/example-module/")
    })

    it("copies module data to the slide entry.", () => {
      const subject = new Module("example-module")
      expect(subject.sections[0].data.title).to.equal('Git/GitHub Best Practices')
      expect(subject.sections[7].data.title).to.equal('Test Sub Sub Module')
    })

    it("copied module data DOES NOT contain slides", () => {
      const subject = new Module("example-module")
      expect(subject.sections[0].data.slides).to.be.undefined;
    })

    afterEach(() => {
      delete process.env.BEATLAB_MODULES
    })

  })

  describe("Sections", () => {
    it ("pulls in sections from referenced modules", () => {
      const subject = new Module("example-module")
      expect(subject.sections.length).to.equal(9)
    })
  })
})