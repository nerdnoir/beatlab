const matchers = {
  markdown : /.*\.md$/,
  html : /.*\.html$/,
  image : /.*\.jpg$|\.jpeg$|\.png$|\.gif$/,
  svg : /.*\.svg$/,
  localModule : /@.*\/$/,
  gitRepo : /git\:\/\/.*$/
}

class Handler {
  constructor(kind, path) {
    this.kind = kind
    this.path = path
  }
}

class NoOpHandler extends Handler {
  constructor(kind, path) {
    super("NOOP", path)
  }
}

function factory(entry) {
  for (let key in matchers) {
    if (matchers[key].test(entry)) {
      return new Handler(key, entry)
    }
  }
}

module.exports = factory