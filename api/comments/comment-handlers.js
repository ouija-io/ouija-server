
'use strict'

const _ = require('lodash')
const Boom = require('boom')

class CommentHandler {

  constructor (server, options) {
    this.models = server.plugins['hapi-sequelized'].db.sequelize.models

    this.createComment = this.createComment.bind(this)
    this.getComments = this.getComments.bind(this)
    this.getComment = this.getComment.bind(this)
    this.updateComment = this.updateComment.bind(this)
    this.deleteComment = this.deleteComment.bind(this)
  }

  createComment (request, reply) {

    this.models.Comment
      .create(request.payload)
      .then(function (comment) {
        reply(comment.get({ plain: true }))
      })
      .catch(function (err) {
        let error = Boom.badRequest(err.message)

        error.output.statusCode = 400;    // Assign a custom error code
        error.reformat()

        reply(error)
      })
  }

  getComments (request, reply) {

    let threadKey = request.params.threadKey
    let where = {}

    where.ThreadKey = threadKey
    // let where = _.pick(request.query, ['threadKey']) || {}

    this.models.Comment
      .findAll({ raw: true, where: where })
      .then(reply)
      .catch(function (err) {
        let error = Boom.badRequest(err.message)

        error.output.statusCode = 500;    // Assign a custom error code
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

  updateComment (request, reply) {
    reply({ title: 'Awesome Boilerplate Homepage' })
  }

  deleteComment (request, reply) {
    reply({ title: 'Awesome Boilerplate Homepage' })
  }
}

module.exports = CommentHandler