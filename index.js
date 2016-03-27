var log = require('bole')('simple-data-api')
var createServer = require('./server')
var server = createServer()



server.listen(3333, function () {
  log.info('started server at http://127.0.0.1:3333')
})
