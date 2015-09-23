
'use strict'

let Confidence = require('confidence')
let Config = require('./config')

let criteria = { env: process.env.NODE_ENV }

let manifest = {
  $meta: 'ouija-api manifest',
  server: {
    debug: {
      request: ['error']
    },
    connections: {
      routes: { security: true },
      router: { stripTrailingSlash: true }
    }
  },
  connections: [{
    port: Config.get('/port'),
    labels: ['api']
  }],
  plugins: {
    bell: {},
    'hapi-auth-jwt2': {},
    nes: {},
    inert: {},
    blipp: {},
    'hapi-sequelized': Config.get('/db'),
    './api/auth/auth-routes': Config.get('/strategies'),
    './api/static/static-routes': {},
    './api/threads/thread-routes': {},
    './api/comments/comment-routes': {}
  }
}

let store = new Confidence.Store(manifest)

exports.get = function (key) {
  return store.get(key, criteria)
}

exports.meta = function (key) {
  return store.meta(key, criteria)
}
