
'use strict'

const _ = require('lodash')
const Boom = require('boom')

class ThreadHandler {

  constructor (server, options) {

    this.models = server.plugins['hapi-sequelized'].db.sequelize.models

    this.createThread = this.createThread.bind(this)
    this.getThreads = this.getThreads.bind(this)
    this.getThread = this.getThread.bind(this)
    this.updateThread = this.updateThread.bind(this)
    this.deleteThread = this.deleteThread.bind(this)
  }

  createThread (request, reply) {

    this.models.Thread
      .create(request.payload)
      .then(function (thread) {
        reply(thread.get({ plain: true }))
      })
      .catch(function (err) {
        let error = Boom.badRequest(err.message)

        error.output.statusCode = 400;    // Assign a custom error code
        error.reformat()

        reply(error)
      })
  }

  getThreads (request, reply) {

    console.log('doing stuff?')

    let where = _.pick(request.query, ['postKey']) || {}

    this.models.Thread
      .findAll({ raw: true, where: where })
      .then(reply)
      .catch(function (err) {
        let error = Boom.badRequest(err.message)

        error.output.statusCode = 500;    // Assign a custom error code
        error.reformat()

        reply(error)
      })
  }

  getThread (request, reply) {

    let threadKey = request.params.threadKey

    this.models.Thread
      .findOne({ where: { key: threadKey }, raw: true })
      .then(function(thread) {
        if (thread) return reply(thread)

        let error = Boom.badRequest(`No Thread with key: ${threadKey}` )

        error.output.statusCode = 404;    // Assign a custom error code
        error.reformat()

        reply(error)
      })
      .catch(function (err) {
        let error = Boom.badRequest(err.message)

        error.output.statusCode = 500;    // Assign a custom error code
        error.reformat()

        reply(error)
      })
  }

  updateThread (request, reply) {
    reply({ title: 'Awesome Boilerplate Homepage' })
  }

  deleteThread (request, reply) {
    reply({ title: 'Awesome Boilerplate Homepage' })
  }
}

module.exports = ThreadHandler