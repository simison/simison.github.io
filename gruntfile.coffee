#global module:false

"use strict"

module.exports = (grunt) ->
  grunt.loadNpmTasks "grunt-bower-task"
  grunt.loadNpmTasks "grunt-contrib-connect"
  grunt.loadNpmTasks "grunt-contrib-concat"
  grunt.loadNpmTasks "grunt-contrib-uglify"
  grunt.loadNpmTasks "grunt-contrib-watch"
  grunt.loadNpmTasks "grunt-exec"

  grunt.initConfig

    exec:
      jekyll:
        cmd: "jekyll build --trace"

    watch:
      options:
        livereload: true
      jekyllsources:
        files: [
          "_drafts/**/*"
          "_includes/**/*"
          "_templates/**/*"
          "_layouts/**/*"
          "_posts/**/*"
          "_sass/**/*"
          "cv/*"
          "volunteering/*"
          "portfolio/*"
          "media/*"
          "blog/*"
          "blog/**/*"
          "css/**/*"
          "_config.yml"
          "*.html"
          "*.md"
        ]
        tasks: [
          "exec:jekyll"
        ]
      js:
        files: [
          "_js/*"
          "_js/**/*"
        ]
        tasks: [
          "concat"
          "uglify"
          "exec:jekyll"
        ]

    concat:
      build:
        src: [
          'bower_components/jquery/dist/jquery.js'
          'bower_components/angular/angular.js'
          'bower_components/angular-animate/angular-animate.js'
          'bower_components/angular-sanitize/angular-sanitize.js'
          'bower_components/angular-route/angular-route.js'
          'bower_components/angular-deckgrid/angular-deckgrid.js'
          'bower_components/flexslider/jquery.flexslider.js'
          'bower_components/angular-flexslider/angular-flexslider.js'
          'bower_components/fancybox/source/jquery.fancybox.js'
          'bower_components/angular-ui-utils/modules/keypress/keypress.js'
          '_js/*'
          '_js/**/*'
        ]
        dest: 'js/app.js'

    uglify:
      options:
        mangle: false, # Angular doesn't like mangling...
        banner: '/*! <%= grunt.template.today("yyyy-mm-dd") %> */\n'
      build:
        files:
          'js/app.min.js': ['js/app.js']

    connect:
      server:
        options:
          port: 4000
          base: '_site'
          livereload: true

  grunt.registerTask "build", [
    "concat"
    "uglify"
    "exec:jekyll"
  ]

  grunt.registerTask "serve", [
    "build"
    "connect:server"
    "watch"
  ]

  grunt.registerTask "default", [
    "serve"
  ]
