const expect = require("chai").expect
const R = require("ramda")

describe("Builder", () => {

  this.subject = require("../../lib/builders")

  it("you can supply a read function.", () => {
    let wasRead = false
    const fakeReader = (path) => wasRead = true

    const markdownRule = {
      name: 'markdown',
      match: R.test(/.*\.md$/),
      read: fakeReader
    };

    this.subject.register(markdownRule)

    this.subject.build("slide.md")

    expect(wasRead).to.be.true
  })

  it("you can supply a template function.", () => {
    // ARRANGE
    let wasCalled = false
    const fakeReader = (path) => { return "output" }
    const fakeTemplate = (contents) => { wasCalled = true }

    const markdown = {
      name: 'markdown',
      match: R.test(/.*\.md$/),
      read: fakeReader,
      template: fakeTemplate
    };

    this.subject.register(markdown)

    // ACT
    this.subject.build("slide.md")

    // ASSERT
    expect(wasCalled).to.be.true
  })

  it("there is a default view data function.", () => {

    // ARRANGE
    let contentValue = null
    const fakeReader = (path) => { return "foo" }
    const fakeTemplate = (data) => {
      contentValue = data.content
    }

    const markdown = {
      name: 'markdown',
      match: R.test(/.*\.md$/),
      read: fakeReader,
      template: fakeTemplate
    };

    this.subject.register(markdown)

    // ACT
    this.subject.build("slide.md")

    // ASSERT
    expect(contentValue).to.equal("foo")
  })

  it("you can override the default view data function.", () => {

    // ARRANGE
    let contentValue = null
    const fakeReader = (path) => { return "bar" }
    const fakeViewData = (fileContents) => { return { differentProp: fileContents } }
    const fakeTemplate = (data) => { contentValue = data.differentProp }

    const markdown = {
      name: 'markdown',
      match: R.test(/.*\.md$/),
      read: fakeReader,
      viewData: fakeViewData,
      template: fakeTemplate
    }

    this.subject.register(markdown)

    // ACT
    this.subject.build("slide.md")

    // ASSERT
    expect(contentValue).to.equal("bar")
  })

  afterEach(() => {
    this.subject.reset();
  })

})