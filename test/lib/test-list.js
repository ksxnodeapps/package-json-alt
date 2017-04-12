'use strict'

const {stdout, stderr} = require('process')

module.exports = (...units) => units
  .map(
    ([description, action]) => {
      stdout.write(description + '... ')
      try {
        const passed = action()
        passed ? stdout.write('passed\n') : stderr.write('failed\n')
        return passed
      } catch (error) {
        stderr.write(`errored\nerror`)
        return false
      }
    }
  )
  .filter(x => !x)
  .length
