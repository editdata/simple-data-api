var http = require('http')
var bole = require('bole')
var level = require('level')
var createRouter = require('./router')
var createDatasets = require('./datasets')

bole.output({
  level: 'debug',
  stream: process.stdout
})

var log = bole('simple-data-api:server')

module.exports = function createServer (options) {
  var db = level('db')
  var datasets = createDatasets(db)
  var router = createRouter(datasets, options)

  return http.createServer(function (req, res) {
    log.info(req.method, req.url)
    if (router.match(req, res)) return
    log.debug('Not found', req.method, req.url)
  })
}
