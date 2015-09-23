
'use strict'

let Composer = require('./index')

Composer(function (err, server) {

  if (err) throw err

  let db = server.plugins['hapi-sequelized'].db
  let models = db.sequelize.models

  models.Thread.hasMany(models.Comment)
  models.User.hasMany(models.Comment)
  models.Comment.belongsTo(models.Thread)

  db.sequelize
    .sync()
    .then(server.start.bind(server, onServerStart))
    .catch(function(err) { throw err })

  function onServerStart() {
    console.log('The Ouija API has started on port ' + server.info.port)
  }
})
