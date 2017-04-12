'use strict'
const {isIterable} = require('x-iterable-utils')
const getOwnProperties = require('./all-properties.js')
const {is} = Object

function equal (left, right) {
  if (is(left, right)) return true
  const typeleft = typeof left
  const typeright = typeof right
  if (typeleft !== typeright) return false
  if (typeleft !== 'object') return false
  if (!left || !right) return false
  if (isIterable(left)) return isIterable(right) && equalArray(left, right)
  return equalObject(left, right)
}

function equalArray ([...left], [...right], compare = equal) {
  if (left.length !== right.length) return false
  for (const index in left) {
    if (!compare(left[index], right[index])) return false
  }
  return true
}

function equalObject (left, right, compare = equal) {
  const leftprops = getOwnProperties(left)
  const rightprops = getOwnProperties(right)
  if (!equalArray(leftprops, rightprops, is)) return false
  for (const property of leftprops) {
    if (!compare(left[property], right[property])) return false
  }
  return true
}

module.exports = {equal, equalArray, equalObject}
