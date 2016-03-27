# simple-data-api

For when you work with a bunch of small tabular datasets (<= 100 rows) and need a very simple CRUD API.

## Install

```
npm i --save simple-data-api
```

Alternately you can clone this repository.

## Example

In your index.js file:

```js
var createServer = require('simple-data-api')
var server = createServer()

server.listen(3333, function () {
  console.log('started server at http://127.0.0.1:3333')
})
```

## API client examples

Look at the [examples directory](examples/).

## Start the server

```
node index.js
```

## License
[MIT](LICENSE.md)
