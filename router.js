var qs = require('querystring')
var Router = require('match-routes')
var response = require('response')
var body = require('body/json')
var JSONStream = require('JSONStream')
var log = require('bole')('simple-data-server:router')

module.exports = function createRouter (datasets, options) {
  var router = Router()

  router.on('/', function (req, res, url) {
    var query = qs.parse(url.query)
    query.keys = query.keys || false
    log.info('query', query)

    if (req.method === 'GET') {
      var account = query.account
      var stream = account ? datasets.find(account, query) : datasets.createReadStream(query)
      stream.pipe(JSONStream.stringify()).pipe(res)
    } else if (req.method === 'POST') {
      body(req, res, function parseBody (err, body) {
        if (err) return errorResponse(res, 500, err.message)
        datasets.create(body, function (err, newDataset) {
          if (err) return errorResponse(res, 500, err.message)
          log.info('dataset created', newDataset.key)
          response.json(newDataset).pipe(res)
        })
      })
    } else {
      errorResponse(res, 405, 'Method not allowed')
    }
  })

  router.on('/:key', function (req, res, url) {
    var key = url.params.key
    if (req.method === 'GET') {
      datasets.get(key, function (err, dataset) {
        if (err) return errorResponse(res, 500, err.message)
        log.info('dataset retrieved', dataset.key)
        response.json(dataset).pipe(res)
      })
    } else if (req.method === 'PUT') {
      body(req, res, function parseBody (err, body) {
        if (err) return errorResponse(res, 500, err.message)
        datasets.update(key, body, function (err, dataset) {
          if (err) return errorResponse(res, 500, err.message)
          log.info('dataset updated', dataset.key)
          response.json(dataset).pipe(res)
        })
      })
    } else if (req.method === 'DELETE') {
      datasets.delete(key, function (err) {
        if (err) return errorResponse(res, 500, err.message)
        log.info('dataset deleted', key)
        response.json({ deleted: key }).status(200).pipe(res)
      })
    } else {
      errorResponse(res, 405, 'Method not allowed')
    }
  })

  return router
}

function errorResponse (res, status, message) {
  log.error(status, message)
  return response.json({ error: message }).status(status).pipe(res)
}
