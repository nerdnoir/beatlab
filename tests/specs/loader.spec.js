const chai = require("chai")
const expect = chai.expect
chai.use(require('chai-string'))
const path = require('path')
const loader = require('../../lib/loader')

describe("Loading and paths", () => {

  it(`CWD returns the current working directory.
      (That is, where the script was called from.)`, () => {
    const actualCurrentWorkingDir = process.cwd()
    expect(loader.cwd()).to.equal(actualCurrentWorkingDir)
  })

  describe("Locating the module repository:", () => {

    describe('When BEATLAB_HOME is set,', () => {
      it ('that is the module repo path.', () => {
        process.env.BEATLAB_HOME = '/var/beatlab-modules'
        expect(loader.moduleRepo()).to.equal('/var/beatlab-modules')
        delete process.env.BEATLAB_HOME
      })
    })

    describe('When BEATLAB_HOME is not set,', () => {
      it ('assume module repo is in a "modules" sub-directory.', () => {
        expect(loader.moduleRepo()).to.equal(path.join(process.cwd(), 'modules'))
      })
    })

    it('A custom path always wins', () => {
      const actual = loader.moduleRepo('./custom/path')
      expect(actual).to.equal('./custom/path')

      process.env.BEATLAB_HOME = '/var/beatlab-modules'
      const actualWithEnvVar = loader.moduleRepo('./custom/path')
      expect(actualWithEnvVar).to.equal('./custom/path')
      delete process.env.BEATLAB_HOME
    })

  })

})