
'use strict'

var Nes = require('nes')

var client = new Nes.Client('ws://localhost:3000')

client.connect(function (err) {

  // client.subscribe('/items', function (err, update) {
  //   console.log(update)
  // })

  client.subscribe('/item/5', function (err, update) {
    console.log(update)
      // update -> { id: 5, status: 'complete' }
      // Second publish is not received (doesn't match)
  })

  client.request('/hello', function (err, payload) {   // Can also request '/h'
    console.log(err, payload)
      // payload -> 'world!'
  })

})