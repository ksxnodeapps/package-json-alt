'use strict'
const {getOwnPropertyNames, getOwnPropertySymbols} = Object
module.exports = object =>
  [...getOwnPropertyNames(object), ...getOwnPropertySymbols(object)]
