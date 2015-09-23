
'use strict'

const _ = require('lodash')
const jwt = require('jsonwebtoken')
const Boom = require('boom')

class AuthHandlers {

  constructor (server, options) {

    this.models = server.plugins['hapi-sequelized'].db.sequelize.models
    this.server = server

    this.login = this.login.bind(this)
    this.validate = this.validate.bind(this)
  }

  login (request, reply) {

    let server = this.server

    if (!request.auth.isAuthenticated) {
        return reply('Authentication failed due to: ' + request.auth.error.message);
    }

    let creds = request.auth.credentials
    let callback = creds.query.callback_url
    let profile = creds.profile.raw

    this.models.User
      .findOrCreate({
        where: { id: profile.id },
        defaults: profile
      })
      .spread(function(user, created) {
        let rawUser = user.get({ plain: true })
        let content = _.pick(rawUser, [ 'id', 'screen_name' ])
        let token = jwt.sign(content, 'cradle84')

        reply.redirect(`${callback}?ouija_token=${token}`)
      })
      .catch(function (err) {
        console.log(err)
        let error = Boom.badRequest(err.message)

        error.output.statusCode = 400;
        error.reformat()

        reply(error)
      })
  }

  validate (decoded, request, callback) {

    this.models.User
      .findOne({ raw: true, where: { id: decoded.id } })
      .then(function(user) {
        callback(null, true, user);
      })
      .catch(function() {
        let error = Boom.badRequest(err.message)

        error.output.statusCode = 400;
        error.reformat()

        callback(error)
      })
  }

}

module.exports = AuthHandlers