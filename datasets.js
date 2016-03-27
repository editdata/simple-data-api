var inherits = require('util').inherits
var Model = require('level-model')
var extend = require('xtend')
var log = require('bole')('simple-data-api:datasets')

module.exports = Datasets
inherits(Datasets, Model)

function Datasets (levelup, options) {
  if (!(this instanceof Datasets)) return new Datasets(levelup, options)

  options = extend({
    modelName: 'Dataset',
    properties: {
      title: { type: 'string' },
      description: { type: 'string' },
      source: { type: 'string' },
      account: { type: 'string' },
      data: { type: 'array' }
    },
    indexKeys: ['title', 'account'],
    required: ['data'],
    additionalProperties: false
  }, options)

  Model.call(this, levelup, options)
}

Datasets.prototype.beforeCreate = function (data) {
  log.info('Datasets.beforeCreate', data.key)
  return data
}

Datasets.prototype.beforeUpdate = function (data) {
  log.info('Datasets.beforeUpdate', data.key)
  return data
}
