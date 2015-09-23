
'use strict'

const Handler = require('./thread-handlers')

exports.register = function (server, options, next) {

  let handler = new Handler(server, options)

  server.route([
    {
      method: 'GET',
      path: '/threads',
      config: {
        auth: { scope: 'guest' },
        handler: handler.getThreads,
        id: 'getThreads'
      }
    },
    {
      method: 'POST',
      path: '/threads',
      config: {
        auth: { scope: [ 'member', 'admin' ] },
        handler: handler.createThread,
        id: 'createThread'
      }
    },
    {
      method: 'GET',
      path: '/threads/{threadKey}',
      config: {
        auth: { scope: [ 'guest' ,'member', 'admin' ] },
        handler: handler.getThread,
        id: 'getThread'
      }
    },
    {
      method: 'PUT',
      path: '/threads/{threadKey}',
      config: {
        auth: { scope: [ 'admin' ] },
        handler: handler.updateThread,
        id: 'updateThread'
      }
    },
    {
      method: 'DELETE',
      path: '/threads/{threadKey}',
      config: {
        auth: { scope: [ 'admin' ] },
        handler: handler.deleteThread,
        id: 'deleteThread'
      }
    }
  ])

  next()
}

exports.register.attributes = { name: 'threads' }