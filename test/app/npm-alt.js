#! /usr/bin/env node
'use strict'

const {resolve} = require('path')
const {readFileSync, writeFileSync} = require('fs')
const filename = resolve(
  require('process').cwd(),
  'package.json'
)

writeFileSync(
  filename,
  JSON.stringify(
    Object.assign(
      {
        last: 'tested'
      },
      JSON.parse(
        readFileSync(filename, 'utf8')
      )
    ),
    undefined,
    2
  )
)
