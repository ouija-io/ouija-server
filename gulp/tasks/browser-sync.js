'use strict'

/**
 * @fileOverview
 * Browser Sync Task
 * Live-reload & cross-device synchronization
 */

var browserSync = require('browser-sync')
var gulp = require('gulp')

gulp.task('browserSync', ['build'], function () {
  browserSync({
    files: [
      './public/*.html',
      './public/bundle.css',
      './public/bundle.js'
    ],
    proxy: 'localhost:3000/'
  })
})
