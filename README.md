# get-css-variables

> Import CSS variables into a JavaScript Object

## Usage

`npm install --save-dev get-css-variables`

### Node Api

In your code

```Javascript
const { getVariables } = require("get-css-variables");

console.log(getVariables(":root { --dummy-color: blue }"));
```

### Output

```JSON
{ '--dummy-color': 'blue' }
```

### CLI

Will create an output file containing a exported javascript module.

```
$ get-css-variables inputFile.txt output.js
```

### Limits

-   Only variables on the :root selector are supported.

## Development

```bash
$ npm install
$ npm run build
$ npm test
```

## Note

> Original code and credit to
>
> https://github.com/Dashlane/css-variables-loader
>
> Reason for this plugin was to remove Webpack depedency and add CLI tool.
