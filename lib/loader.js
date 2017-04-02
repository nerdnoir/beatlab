const path = require('path')

class Loader {
  cwd () {
    return process.cwd()
  }

  moduleRepo (customPath = '') {
    if (customPath !== '') return customPath
    return process.env.BEATLAB_HOME || path.join(process.cwd(), 'modules')
  }
}

module.exports = new Loader()
