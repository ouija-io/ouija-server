
'use strict'

const Handler = require('./thread-handlers')

exports.register = function (server, options, next) {

  let handler = new Handler(server, options)

  server.route([
    {
      method: 'GET',
      path: '/threads',
      config: { handler: handler.getThreads, id: 'getThreads' }
    },
    {
      method: 'POST',
      path: '/threads',
      config: { handler: handler.createThread, id: 'createThread' }
    },
    {
      method: 'GET',
      path: '/threads/{threadKey}',
      config: { handler: handler.getThread, id: 'getThread' }
    },
    {
      method: 'PUT',
      path: '/threads/{threadKey}',
      config: { handler: handler.updateThread, id: 'updateThread' }
    },
    {
      method: 'DELETE',
      path: '/threads/{threadKey}',
      config: { handler: handler.deleteThread, id: 'deleteThread' }
    }
  ])

  next()
}

exports.register.attributes = { name: 'threads' }