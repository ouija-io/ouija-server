
'use strict'

const Handler = require('./comment-handlers')

exports.register = function (server, options, next) {

  let handler = new Handler(server, options)

  server.route([
    {
      method: 'GET',
      path: '/threads/{threadKey}/comments',
      config: { handler: handler.getComments, id: 'getComments' }
    },
    {
      method: 'POST',
      path: '/comments',
      config: { handler: handler.createComment, id: 'createComment' }
    },
    {
      method: 'GET',
      path: '/comments/{commentKey}',
      config: { handler: handler.getComment, id: 'getComment' }
    },
    {
      method: 'PUT',
      path: '/comments/{commentKey}',
      config: { handler: handler.updateComment, id: 'updateComment' }
    },
    {
      method: 'DELETE',
      path: '/comments/{commentKey}',
      config: { handler: handler.deleteComment, id: 'deleteComment' }
    }
  ])

  next()
}

exports.register.attributes = { name: 'comments' }