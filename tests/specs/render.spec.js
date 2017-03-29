const renderers = require("../../lib/render")
const expect = require("chai").expect
const R = require("ramda")

describe("When a renderer is added,", () => {

  it("you can supply a read function.", () => {

    // ARRANGE
    let wasRead = false
    const fakeReader = (path) => wasRead = true

    const markdownRule = {
      name: 'markdown',
      pattern: renderers.TESTS.markdown,
      read: fakeReader,
      template: (viewData) => {}
    };
    renderers.register(markdownRule)

    // ACT
    renderers.render("slide.md")

    // ASSERT
    expect(wasRead).to.be.true;
  })

  it("you can supply a template function.", () => {

    // ARRANGE
    let wasCalled = false
    const fakeReader = (path) => { }
    const fakeTemplate = (contents) => wasCalled = true

    const markdown = {
      name: 'markdown',
      pattern: renderers.TESTS.markdown,
      read: fakeReader,
      template: fakeTemplate
    };

    renderers.register(markdown)

    // ACT
    renderers.render("slide.md")

    // ASSERT
    expect(wasCalled).to.be.true
  })

  it("there is a default view data function.", () => {

    // ARRANGE
    let contentValue = null
    const fakeReader = (path) => { return "foo" }
    const fakeTemplate = (data) => { contentValue = data.content; }

    const markdown = {
      name: 'markdown',
      pattern: renderers.TESTS.markdown,
      read: fakeReader,
      template: fakeTemplate
    };

    renderers.register(markdown)

    // ACT
    renderers.render("slide.md")

    // ASSERT
    expect(contentValue).to.equal("foo")
  })

  it("you can override the default view data function.", () => {

    // ARRANGE
    let contentValue = null
    const fakeReader = (path) => { return "bar" }
    const fakeViewData = (fileContents) => { return { differentProp: fileContents } }
    const fakeTemplate = (data) => { contentValue = data.differentProp; }

    const markdown = {
      name: 'markdown',
      pattern: renderers.TESTS.markdown,
      read: fakeReader,
      viewData: fakeViewData,
      template: fakeTemplate
    };

    renderers.register(markdown)

    // ACT
    renderers.render("slide.md")

    // ASSERT
    expect(contentValue).to.equal("bar")
  })

  afterEach(() => {
    renderers.reset()
  })

})