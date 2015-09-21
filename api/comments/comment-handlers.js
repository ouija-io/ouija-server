
'use strict'

exports.createComment = function (request, reply) {
  reply({ title: 'Awesome Boilerplate Homepage' })
}

exports.getComments = function (request, reply) {
  reply({ title: 'here comes a comment ' + request.params.threadKey })
}

exports.getComment = function (request, reply) {
  reply({ title: 'Awesome Boilerplate Homepage' })
}

exports.updateComment = function (request, reply) {
  reply({ title: 'Awesome Boilerplate Homepage' })
}

exports.deleteComment = function (request, reply) {
  reply({ title: 'Awesome Boilerplate Homepage' })
}