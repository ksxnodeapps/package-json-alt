'use strict'
const {resolve} = require('path')
const {runInNewContext} = require('vm')
const load = require('../../index.js')

module.exports = ({dump}) => load({
  executor: {
    npm: resolve(__dirname, 'npm-alt.js')
  },
  entry: {
    ext: '.js',
    load: runInNewContext,
    dump
  }
})
