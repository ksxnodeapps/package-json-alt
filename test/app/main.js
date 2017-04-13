#! /usr/bin/env node
'use strict'

const load = require('./index.js')
let out

load({
  dump (object) {
    out = object
    return require('fs')
      .readFileSync(
        require('path')
          .resolve(__dirname, 'package.js')
      )
      .toString('utf8')
  }
})

console.log(JSON.stringify({out}))
