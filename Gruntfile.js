'use strict';

module.exports = function (grunt) {
  // load all grunt tasks
  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

  grunt.initConfig({
    uglify: {
      build: {
        files: {
          'postmessage-little-helper.min.js': [
            'postmessage-little-helper.js'
          ]
        }
      }
    }
  });

  grunt.registerTask('build', [
    'uglify'
  ]);

  grunt.registerTask('default', [
    'build'
  ]);

};
