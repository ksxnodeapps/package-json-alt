'use strict'
const {join, dirname} = require('path')
const {readdirSync} = require('fs')

class SearchResult extends Array {
  constructor (directory, basename) {
    super(join(directory, basename), directory, basename)
  }

  get fullpath () {
    return this[0]
  }

  get directory () {
    return this[1]
  }

  get basename () {
    return this[2]
  }
}

function search (directory, basename, previous) {
  return readdirSync(directory).includes(basename)
    ? new SearchResult(directory, basename)
    : (
      previous !== directory
        ? search(dirname(directory), basename, directory)
        : null
    )
}

module.exports = {search, SearchResult}
