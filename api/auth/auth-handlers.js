
'use strict'

const _ = require('lodash')
const jwt = require('jsonwebtoken')
const Boom = require('boom')

class AuthHandlers {

  constructor (server, options) {

    this.models = server.plugins['hapi-sequelized'].db.sequelize.models
    this.server = server

    this.register = this.register.bind(this)
    this.login = this.login.bind(this)
    this.validate = this.validate.bind(this)
  }

  register (request, reply) {
    let token = jwt.sign({
      scope: ['guest'],
      screen_name: 'Guest',
      id: 0
    }, 'cradle84')

    var cookie_options = {
      ttl: 365 * 24 * 60 * 60 * 1000, // expires a year from today
      encoding: 'none',    // we already used JWT to encode
      isSecure: true,      // warm & fuzzy feelings
      isHttpOnly: true,    // prevent client alteration
      clearInvalid: false, // remove invalid cookies
      strictHeader: true   // don't allow violations of RFC 6265
    }

    reply({ token: token })
      .header("Authorization", token)
      .state("token", token, cookie_options)
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
    if (_.contains(decoded.scope, 'guest')) {
      return callback(null, true)
    }

    console.log(decoded)

    this.models.User
      .findOne({ raw: true, where: { id: decoded.id } })
      .then(function(user) {
        if (!user) {
          let error = Boom.badRequest('Authentication failed')

          error.output.statusCode = 401;
          error.reformat()

          return callback(error)
        }

        user.scope = ['admin']
        callback(null, true, user);
      })
      .catch(function(err) {
        let error = Boom.badRequest(err.message)

        error.output.statusCode = 400;
        error.reformat()

        callback(error)
      })
  }

}

module.exports = AuthHandlers