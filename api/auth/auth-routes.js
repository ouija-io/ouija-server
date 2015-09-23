
'use strict'

const Handler = require('./auth-handlers')
const _  = require('lodash')

exports.register = function (server, options, next) {

  let handler = new Handler(server, options)

  server.auth.strategy('twitter', 'bell', options.twitter)
  server.auth.strategy('jwt', 'jwt', {
    key: 'cradle84',
    validateFunc: handler.validate
  })

  server.route([
    {
      method: ['GET', 'POST'],
      path: '/auth/login',
      config: { auth: 'twitter', handler: handler.login }
    }
  ])

  server.route({
      method: ['GET', 'POST'],
      path: '/done',
      config: {
          auth: 'jwt',
          handler: function (request, reply) {
              return reply(request.auth.credentials)
          }
      }
  });

  next()

}

exports.register.attributes = { name: 'auth' }