const expect = require('chai').expect
const R = require('ramda')

describe('Builder', () => {
  this.subject = require('../lib/builders')

  it('you can supply a read function.', () => {
    let wasRead = false
    const fakeReader = (path) => wasRead = true

    const markdownRule = {
      name: 'markdown',
      match: R.test(/.*\.md$/),
      read: fakeReader
    }

    this.subject.register(markdownRule)

    this.subject.build({slidePath: 'slide.md'})

    expect(wasRead).to.be.true
  })

  it('you can supply a template function.', () => {
    // ARRANGE
    let wasCalled = false
    const fakeReader = (path) => { return 'output' }
    const fakeTemplate = (contents) => { wasCalled = true }

    const markdown = {
      name: 'markdown',
      match: R.test(/.*\.md$/),
      read: fakeReader,
      template: fakeTemplate
    }

    this.subject.register(markdown)

    // ACT
    this.subject.build({slidePath: 'slide.md'})

    // ASSERT
    expect(wasCalled).to.be.true
  })

  afterEach(() => {
    this.subject.reset()
  })
})
