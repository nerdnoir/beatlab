const expect = require("chai").expect
const R = require("ramda")

describe("When a renderer is added,", () => {

  it("you can supply a read function.", () => {

    // ARRANGE
    let wasRead = false
    const fakeReader = (path) => wasRead = true

    const markdownRule = {
      name: 'markdown',
      match: R.test(/.*\.md$/),
      read: fakeReader
    };

    const subject = require("../../lib/builders")
    subject.register(markdownRule)

    // ACT
    subject.build("slide.md")

    // ASSERT
    expect(wasRead).to.be.true;
  })

  xit("you can supply a template function.", () => {

    // ARRANGE
    let wasCalled = false
    const fakeReader = (path) => { return "output" }
    const fakeTemplate = (contents) => { wasCalled = true }

    const markdown = {
      name: 'markdown',
      match: R.test(/.*\.md$/),
      read: fakeReader,
      templateFunc: fakeTemplate
    };

    const subject = require("../../lib/builders")
    subject.register(markdown)

    // ACT
    subject.build("slide.md")

    // ASSERT
    expect(wasCalled).to.be.true
  })

  xit("there is a default view data function.", () => {

    // ARRANGE
    let contentValue = null
    const fakeReader = (path) => { return "foo" }
    const fakeTemplate = (data) => { contentValue = data.content; }

    const markdown = {
      name: 'markdown',
      match: R.test(/.*\.md$/),
      read: fakeReader,
      template: fakeTemplate
    };

    const subject = require("../../lib/builders")
    subject.register(markdown)

    // ACT
    subject.build("slide.md")

    // ASSERT
    expect(contentValue).to.equal("foo")
  })

  xit("you can override the default view data function.", () => {

    // ARRANGE
    let contentValue = null
    const fakeReader = (path) => { return "bar" }
    const fakeViewData = (fileContents) => { return { differentProp: fileContents } }
    const fakeTemplate = (data) => { contentValue = data.differentProp; }

    const markdown = {
      name: 'markdown',
      match: R.test(/.*\.md$/),
      read: fakeReader,
      viewData: fakeViewData,
      template: fakeTemplate
    };

    const builders = require("../../lib/builders")
    builders.register(markdown)

    // ACT
    builders.build("slide.md")

    // ASSERT
    expect(contentValue).to.equal("bar")
  })

})