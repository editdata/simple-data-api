var api = require('../client')()

api.list(function (err, response, data) {
  console.log(data)
})
