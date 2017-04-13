'use strict'
const {resolve} = require('path')
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
        [357, {valueOf: () => 357}],
        ['abcdef', 'fedabc'],
        [[...'abcdef'], [...'fedcba']]
      ].every(x => !equal(...x))
    ],
    [
      'lib/json-equal: complicated equal',
      () => [
        [
          {abc: 123, def: 456, foo: [...'foo', {foo: null}], bar: {a: 0, b: 1, c: 2}, bz: [...'baz']},
          {def: 456, abc: 123, foo: [...'foo', {foo: null}], bar: {a: 0, b: 1, c: 2}, bz: [...'baz']}
        ],
        [
          [{def: 456, abc: 123}, {hello: 'world', empty: null, undef: undefined}],
          [{abc: 123, def: 456}, {hello: 'world', empty: null, undef: undefined}]
        ]
      ].every(x => equal(...x))
    ],
    [
      'lib/json-equal: complicated inequal',
      () => [
        [
          {abc: 123, def: 456, foo: [...'foo', {foo: null}], bar: {a: 0, b: 1, c: 2}, bz: 'baz'},
          {def: 456, def: 456, foo: ['foo', {foo: null}], bar: {a: 0, b: 1, c: 2}, bz: [...'baz']}
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
    ],
    [
      'lib/search-container: .search(__dirname, randomHexaString)',
      () =>
        searchContainer(
          __dirname,
          require('crypto').randomBytes(32).toString('hex')
        ) === null
    ],
    [
      'overall',
      () => {
        const {spawnSync} = require('child_process')
        const {stdout, stderr} = spawnSync(
          resolve(__dirname, 'app', 'main.js'),
          {
            cwd: resolve(__dirname, 'app'),
            shell: true
          }
        )
        if (stderr && stderr.toString('utf8')) return false
        if (!stdout || !stdout.toString('utf8')) return false
        return equal(
          JSON.parse(stdout.toString('utf8')).dump,
          {
            name: 'hypothetical-package',
            version: '1.2.3',
            author: 'Hypothetical Author',
            main: 'index.js',
            last: 'tested'
          }
        )
      }
    ]
  )
)
