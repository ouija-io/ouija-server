
'use strict'

const Confidence = require('confidence')

let criteria = {
  env: 'development'
}

let config = {
  $meta: 'This file configures the plot device.',
  projectName: 'ouija-api',
  port: {
    $filter: 'env',
    test: 9090,
    staging: parseInt(process.env.PORT, 10),
    production: parseInt(process.env.PORT, 10),
    $default: 3000
  },
  sequelize: {
    dialect: 'postgres',
    protocol: 'postgres',
    logging: false,
    dialectOptions: { ssl: true }
  }
}

let store = new Confidence.Store(config)

exports.get = function (key) {
  return store.get(key, criteria)
}

exports.meta = function (key) {
  return store.meta(key, criteria)
}
