'use strict'
const {join} = require('path')
const searchContainer = require('./lib/search-container.js').search
const equal = require('./lib/json-equal.js')
const {parse, stringify} = JSON

function main ({
  fs: {writeFileSync, readFileSync} = require('fs'),
  child_process: {spawn} = require('child_process'),
  process: {exit, argv, stdin, stdout, stderr, cwd} = require('process'),
  executor: {npm = 'npm', shell = true} = {},
  entry: {name = 'package', ext = '.json', base = name + ext, load, dump}
} = {}) {
  const start = cwd()
  const searchResult = searchContainer(start, base)
  if (!searchResult) {
    stderr.write(`Cannot find any ancestor of ${start} contains file ${base}\n`)
    exit(1)
  }

  const {fullpath, directory} = searchResult
  const npmbase = join(directory, 'package.json')
  const object = load(readFileSync(fullpath).toString('utf8'))
  writeFileSync(npmbase, stringify(object, undefined, 2))

  const child = spawn(npm, argv.slice(2), {cwd: directory, shell})
  child.on('exit', onNpmExit)
  child.stdout.on('data', data => stdout.write(data))
  child.stderr.on('data', data => stderr.write(data))

  function onNpmExit (status) {
    if (dump === undefined) return exit(status)
    if (typeof dump !== 'function') throw new TypeError(`${dump} is not a function`)
    const newobject = parse(readFileSync(npmbase).toString('utf8'))
    if (!equal(object, newobject)) writeFileSync(fullpath, dump(newobject))
    exit(status)
  }
}

module.exports = main
