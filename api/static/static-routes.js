
'use strict'

exports.register = function (server, options, next) {

  server.route({
    method: 'GET',
    path: '/{param*}',
    handler: { directory: {  path: 'public', listing: true } }
  })

  next()

}

exports.register.attributes = { name: 'static' }