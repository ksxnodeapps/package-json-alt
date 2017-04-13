#! /usr/bin/env node
'use strict'

require('./index.js')({
  dump (object) {
    console.log(JSON.stringify({dump: object}))
    return require('fs')
      .readFileSync(
        require('path')
          .resolve(__dirname, 'package.js')
      )
      .toString('utf8')
  }
})
