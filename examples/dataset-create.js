var api = require('../client')()

var title = process.argv[2]

api.create({
  title:  title,
  data: [
    { a: 1 },
    { b: 2 },
    { c: 3 }
  ]
}, function (err, response, dataset) {
  if (err) return console.log(err)
  console.log('created dataset', dataset)
})
