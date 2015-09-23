
'use strict'

const Handler = require('./comment-handlers')

exports.register = function (server, options, next) {

  let handler = new Handler(server, options)

  server.subscription('/threads/{threadKey}/comments')

  server.route([
    {
      method: 'GET',
      path: '/threads/{threadKey}/comments',
      config: {
        auth: { scope: [ 'guest', 'member', 'admin' ] },
        handler: handler.getComments,
        id: 'getComments'
      }
    },
    {
      method: 'POST',
      path: '/comments',
      config: {
        auth: { scope: [ 'member', 'admin' ] },
        handler: handler.createComment,
        id: 'createComment'
      }
    },
    {
      method: 'GET',
      path: '/comments/{commentKey}',
      config: {
        auth: { scope: [ 'guest', 'member', 'admin' ] },
        handler: handler.getComment,
        id: 'getComment'
      }
    },
    {
      method: 'PUT',
      path: '/comments/{commentKey}',
      config: {
        auth: { scope: [ 'admin' ] },
        handler: handler.updateComment,
        id: 'updateComment'
      }
    },
    {
      method: 'DELETE',
      path: '/comments/{commentKey}',
      config: {
        auth: { scope: [ 'admin' ] },
        handler: handler.deleteComment,
        id: 'deleteComment'
      }
    }
  ])

  next()
}

exports.register.attributes = { name: 'comments' }