'use strict'
const {equal} = require('../lib/json-equal.js')
const searchContainer = require('../lib/search-container.js').search

require('process').exit(
  require('./lib/test-list.js')(
    [
      'lib/json-equal: simple equal',
      () => [
        [12, 12], ['foo', 'foo'], [{}, {}], [[], []],
        [NaN, NaN], [Infinity, Infinity], [undefined, undefined],
        [null, null], [false, false], [true, true]
      ].every(x => equal(...x))
    ],
    [
      'lib/json-equal: simple inequal',
      () => [
        [12, 34], ['foo', 'bar'], [{abc: 123}, {abc: 456}],
        [12, '12'], [undefined, 'undefined'], [null, 0], [null, 'null'],
        [null, ''], [null, false],
        ['abc', {toString: () => 'abc'}],
        [357, {valueOf: () => 357}]
      ].every(x => !equal(...x))
    ],
    [
      'lib/json-equal: complicated equal',
      () => [
        [
          {abc: 123, def: 456, foo: [...'foo', {foo: null}], bar: {a: 0, b: 1, c: 2}, bz: [...'baz']},
          {abc: 123, def: 456, foo: [...'foo', {foo: null}], bar: {a: 0, b: 1, c: 2}, bz: [...'baz']}
        ],
        [
          [{abc: 123, def: 456}, {hello: 'world', empty: null, undef: undefined}],
          [{abc: 123, def: 456}, {hello: 'world', empty: null, undef: undefined}]
        ]
      ].every(x => equal(...x))
    ],
    [
      'lib/json-equal: complicated inequal',
      () => [
        [
          {abc: 123, def: 456, foo: [...'foo', {foo: null}], bar: {a: 0, b: 1, c: 2}, bz: 'baz'},
          {abc: 123, def: 456, foo: ['foo', {foo: null}], bar: {a: 0, b: 1, c: 2}, bz: [...'baz']}
        ],
        [
          [{abc: 123, def: {valueOf: () => 456}}, {hello: 'world', empty: null, undef: undefined}],
          [{abc: 123, def: 456}, {hello: {toString: () => 'world'}, empty: null, undef: undefined}]
        ]
      ].every(x => !equal(...x))
    ],
    [
      'lib/search-container: .search(__dirname, "package.json")',
      () => {
        const {resolve} = require('path')
        const result = searchContainer(__dirname, 'package.json')
        const directory = resolve(__dirname, '..')
        const basename = 'package.json'
        const fullpath = resolve(directory, basename)
        if (!equal([fullpath, directory, basename], result)) return false
        return equal(
          {fullpath, directory, basename},
          {
            fullpath: result.fullpath,
            directory: result.directory,
            basename: result.basename
          }
        )
      }
    ]
  )
)
