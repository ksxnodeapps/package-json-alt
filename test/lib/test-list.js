'use strict'

const {stdout, stderr} = require('process')
const testmsg = (stream, description, state) => stream.write(`  :: ${description} -> ${state}\n`)

module.exports = (...units) => units
  .map(
    ([description, action]) => {
      try {
        const passed = action()
        passed
          ? testmsg(stdout, description, 'passed')
          : testmsg(stderr, description, 'failed')
        return passed
      } catch (error) {
        testmsg(stderr, description, `errored\n${error}`)
        return false
      }
    }
  )
  .filter(x => !x)
  .length
