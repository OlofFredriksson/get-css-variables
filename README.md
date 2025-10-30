# Get CSS variables

> Convert your CSS variables into a JavaScript Object

[![Build](https://github.com/OlofFredriksson/get-css-variables/workflows/Build/badge.svg)](https://github.com/OlofFredriksson/get-css-variables/actions)
[![npm](https://img.shields.io/npm/v/get-css-variables)](https://www.npmjs.com/package/get-css-variables)

## Run CLI via npx

`npx get-css-variables inputFile.css output.js`

## Usage

`npm install --save-dev get-css-variables`

### Node Api

Convert css variables into a JSON object:

#### ESM

```Javascript
import { getVariables } from "get-css-variables";

console.log(getVariables(":root { --dummy-color: blue }"));
```

#### CJS (Deprecated)

```Javascript
const { getVariables } = require("get-css-variables");

console.log(getVariables(":root { --dummy-color: blue }"));
```

### Output

```JSON
{ "--dummy-color": "blue" }
```

### CLI

Will create an output file containing a exported javascript module.

```
$ get-css-variables inputFile.css output.js
```

## Limits

- Only variables on the :root selector are supported.

## Development

```bash
$ npm install
$ npm run build
$ npm test
```

## Note

- Original code and credit to [Dashlane/css-variables-loader](https://github.com/Dashlane/css-variables-loader)
  Reason for this plugin was to remove Webpack depedency and add CLI tool.
- One use case for this plugin is together with [dvitamin/postcss-var-func-fallback](https://github.com/dvitamin/postcss-var-func-fallback).
