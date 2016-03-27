var api = require('../client')()

api.list(function (err, response, list) {
  api.get(list[0].key, function (err, response, dataset) {
    console.log(dataset)
  })
})
