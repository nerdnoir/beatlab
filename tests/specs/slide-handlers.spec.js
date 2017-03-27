const slideHandlers = require("../../lib/slide-handlers")
const expect = require("chai").expect
const R = require("ramda")

describe("Handle paths with a known extension", () => {

  it("markdown", () => {
    const path = 'test.md'
    const handler = slideHandlers(path)
    expect(handler.kind).to.equal("markdown")
    expect(handler.path).to.equal("test.md")
  })

  it("html", () => {
    const path = 'test.html'
    const handler = slideHandlers(path)
    expect(handler.kind).to.equal("html")
    expect(handler.path).to.equal("test.html")
  })

  it("images (jpg, jpeg, gif, png)", () => {
    const paths = ['test.jpg', 'test.jpeg', 'test.gif', 'test.png']
    const theTest = (path) => expect(slideHandlers(path).kind).to.equal('image')
    R.forEach(theTest, paths)
  })

  it("svg", () => {
    const path = 'test.svg'
    const handler = slideHandlers(path)
    expect(handler.kind).to.equal("svg")
    expect(handler.path).to.equal("test.svg")
  })

  it("local modules (includes)", () => {
    const path = '@workshops/testing/'
    const handler = slideHandlers(path)
    expect(handler.kind).to.equal("localModule")
    expect(handler.path).to.equal("@workshops/testing/")
  })

  it("a git repo (includes)", () => {
    const path = 'git://github.com/laribee/workshops/'
    const handler = slideHandlers(path)
    expect(handler.kind).to.equal("gitRepo")
    expect(handler.path).to.equal("git://github.com/laribee/workshops/")
  })
})