
'use strict'

let Confidence = require('confidence')
let Config = require('./config')

var criteria = { env: process.env.NODE_ENV }

var manifest = {
  $meta: 'This file defines the plot device.',
  server: {
    debug: {
      request: ['error']
    },
    connections: {
      routes: {
         security: true
      },
      router: { stripTrailingSlash: true }
    }
  },
  connections: [{
    port: Config.get('/port'),
    labels: ['api']
  }],
  plugins: {
    nes: {},
    inert: {},
    blipp: {},
    'hapi-sequelized': Config.get('/db'),
    './api/static/static-routes': {},
    './api/threads/thread-routes': {},
    './api/comments/comment-routes': {}
  }
}

var store = new Confidence.Store(manifest)

exports.get = function (key) {
  return store.get(key, criteria)
}

exports.meta = function (key) {
  return store.meta(key, criteria)
}
