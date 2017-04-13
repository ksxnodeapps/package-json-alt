# package-alt — Alternate form of `package.json`
This package is a helper module for creating programs that compile file to `package.json` and invoke `npm`

## Requirements

* Node.js >= 6.0.0 and npm

## Usage

```javascript
const packageAlt = require('package-alt')
packageAlt(options)
```

### `options.executor`

* Type: Object
* Optional

#### `options.executor.npm`

* Type: String
* Optional
* Default to `'npm'`

#### `options.executor.shell`

* Type: Boolean or String
* Optional
* Default to `true`

### `options.entry`

* Type: Object
* Mandatory

#### `options.entry.name`

* Type: String
* Useless if `options.entry.base` is provided
* Default to `package`

#### `options.entry.ext`

* Type: String
* Useless if `options.entry.base` is provided
* Default to `.json`

#### `options.entry.base`

* Type: String
* Optional
* Default to `options.entry.name + options.entry.ext`

### More

Read [`index.js`](https://github.com/ksxnodemodules/package-alt/blob/v0.0.3/index.js#L7-L13)
