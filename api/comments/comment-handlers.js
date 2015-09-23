
'use strict'

const _ = require('lodash')
const Boom = require('boom')

class CommentHandler {

  constructor (server, options) {

    this.models = server.plugins['hapi-sequelized'].db.sequelize.models
    this.server = server

    this.createComment = this.createComment.bind(this)
    this.getComments = this.getComments.bind(this)
    this.getComment = this.getComment.bind(this)
    this.updateComment = this.updateComment.bind(this)
    this.deleteComment = this.deleteComment.bind(this)
  }

  createComment (request, reply) {

    let server = this.server
    let userKey = request.auth.credentials.key

    _.merge(request.payload, { UserKey: userKey })

    this.models.Comment
      .create(request.payload)
      .then(function (comment) {
        let rawComment = comment.get({ plain: true })

        server.publish(`/threads/${rawComment.ThreadKey}/comments`, rawComment)
        reply(rawComment)
      })
      .catch(function (err) {
        let error = Boom.badRequest(err.message)

        error.output.statusCode = 400
        error.reformat()

        reply(error)
      })
  }

  getComments (request, reply) {

    let threadKey = request.params.threadKey
    let where = {}

    where.ThreadKey = threadKey

    this.models.Comment
      .findAll({ raw: true, where: where })
      .then(reply)
      .catch(function (err) {
        let error = Boom.badRequest(err.message)

        error.output.statusCode = 500
        error.reformat()

        reply(error)
      })
  }

  getComment (request, reply) {

    let commentKey = request.params.commentKey

    this.models.Comment
      .findOne({ where: { key: commentKey }, raw: true })
      .then(function(comment) {
        if (comment) return reply(comment)

        let error = Boom.badRequest(`No Comment with key: ${commentKey}` )

        error.output.statusCode = 404
        error.reformat()

        reply(error)
      })
      .catch(function (err) {
        let error = Boom.badRequest(err.message)

        error.output.statusCode = 500
        error.reformat()

        reply(error)
      })
  }

  updateComment (request, reply) {
    reply({ title: 'Awesome Boilerplate Homepage' })
  }

  deleteComment (request, reply) {
    reply({ title: 'Awesome Boilerplate Homepage' })
  }
}

module.exports = CommentHandler