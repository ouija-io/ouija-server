
'use strict'

var Nes = require('nes')

var client = new Nes.Client('ws://localhost:3000')

client.connect(function (err) {
  if (err) console.log('err', err)
  // client.subscribe('/item/5', function (err, update) {
  //   console.log(update)
  //   // update -> { id: 5, status: 'complete' }
  //   // Second publish is not received (doesn't match)
  // })

  client.request('/threads/1', function (err, payload) {
    console.log('whats', err, payload)
  })

  client.subscribe('/threads/1/comments', function (err, update) {
    console.log('new comment!!!!', update, err)
  })


    client.request({
      method: 'POST',
      path: '/comments',
      payload: { body: 'her it is', ThreadKey: 1 }
    }, function (err, payload) {
      console.log(err, payload)
    })

  // client.request('/comments')

})