
'use strict'

const Confidence = require('confidence')

let DATABASE_URL = 'postgres://jfradfejwmwlel:hY7MixjFV6E4i3zi216xGauYLY@ec2-50-16-238-141.compute-1.amazonaws.com:5432/d3uih9t8b6br6k'

let postgres = DATABASE_URL.match(/postgres:\/\/([^:]+):([^@]+)@([^:]+):(\d+)\/(.+)/)

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
  db: {
    models: 'api/**/*-model.js',
    database: postgres && postgres[5],
    user: postgres && postgres[1],
    pass: postgres && postgres[2],
    port: postgres && postgres[4],
    host: postgres && postgres[3],
    sequelize: {
      dialect: 'postgres',
      protocol: 'postgres',
      logging: false,
      dialectOptions: { ssl: true }
    }
  }
}

let store = new Confidence.Store(config)

exports.get = function (key) {
  return store.get(key, criteria)
}

exports.meta = function (key) {
  return store.meta(key, criteria)
}
