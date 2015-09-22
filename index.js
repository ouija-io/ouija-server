
'use strict'

let Glue = require('glue');
let Manifest = require('./api/manifest')

let composeOptions = { relativeTo: __dirname }

module.exports = Glue.compose.bind(Glue, Manifest.get('/'), composeOptions)
