var qs = require('querystring')
var request = require('request')

module.exports = function createAPIClient (config) {
  config = config || {}
  var client = {}
  client.host = config.host || 'http://127.0.0.1:3333'

  client.list = function api_dataset_list (options, callback) {
    if (typeof options === 'function') {
      callback = options
      options = {}
    }

    return request({
      url: client.host + '/',
      json: true
    }, callback)
  }

  client.create = function api_dataset_create (dataset, callback) {
    return request({
      url: client.host + '/',
      method: 'POST',
      json: true,
      body: dataset
    }, callback)
  }

  client.get = function api_dataset_get (key, callback) {
    return request({
      url: client.host + '/' + key,
      json: true
    }, callback)
  }

  client.update = function api_dataset_update (dataset, callback) {
    return request({
      url: client.host + '/' + dataset.key,
      method: 'PUT',
      json: true,
      body: dataset
    }, callback)
  }

  client.delete = function api_dataset_delete (key, callback) {
    if (typeof key === 'object') {
      key = key.key
    }

    return request({
      url: client.host + '/' + key,
      method: 'DELETE',
      json: true
    }, callback)
  }

  return client
}
