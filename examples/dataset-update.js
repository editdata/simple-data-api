var api = require('../client')()

api.list(function (err, response, list) {
  var dataset = list[0]
  dataset.title = 'yeah, this is awesome'
  api.update(dataset, function (err, response, updated) {
    console.log(response.statusCode)
    console.log(updated)
  })
})
