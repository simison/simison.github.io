#global module:false

"use strict"

module.exports = (grunt) ->
  grunt.loadNpmTasks "grunt-bower-task"
  grunt.loadNpmTasks "grunt-contrib-connect"
  grunt.loadNpmTasks "grunt-contrib-concat"
  grunt.loadNpmTasks "grunt-contrib-uglify"
  grunt.loadNpmTasks "grunt-contrib-watch"
  grunt.loadNpmTasks "grunt-contrib-jshint"
  grunt.loadNpmTasks "grunt-exec"
  grunt.loadNpmTasks "grunt-ng-annotate"

  jsFiles = [
    "_js/libs/*.js"
    "_js/config.js"
    "_js/init.js"
    "_js/*.module.js"
    "_js/services/*.js"
    "_js/directives/*.js"
    "_js/controllers/*.js"
  ]

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
        files: jsFiles
        tasks: [
          "jshint"
          "ngAnnotate"
          "concat"
          "uglify"
          "exec:jekyll"
        ]
    jshint:
      build: jsFiles
    ngAnnotate:
      options:
        # true helps add where @ngInject is not used. It infers.
        # Doesn't work with resolve, so we must be explicit there
        add: true
        singleQuotes: true
      build:
        files:
          'js/app.annotated.js': jsFiles
    concat:
      build:
        options:
          stripBanners: true
          #separator: ';'
          #sourceMap: true
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
          'js/app.annotated.js'
        ]
        dest: 'js/app.js'

    uglify:
      options:
        mangle: false, # Angular doesn't like mangling...
        banner: '/*! <%= grunt.template.today("yyyy-mm-dd") %> */\n'
        sourceMap: true
        preserveComments: false
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
    "jshint"
    "ngAnnotate"
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
