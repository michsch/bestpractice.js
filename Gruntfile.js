module.exports = function(grunt) {
  'use strict';

  /* Grunt configuration */
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    // Project metadata, used by some directives, helpers and tasks.
    meta: {
      banner: '/*! <%= pkg.title || pkg.name %> - v<%= pkg.version %> - ' +
        '<%= grunt.template.today("yyyy-mm-dd") + "\\n" %>' +
        '<%= pkg.homepage ? "* " + pkg.homepage + "\\n" : "" %>' +
        '* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>;' +
        ' Licensed <%= _.pluck(pkg.licenses, "type").join(", ") %> */\n'
    },
    qunit: {
      all: [ 'qunit/tests/**/*.html' ]
    },
    clean: {
      js: [
        '**/*.map',
        '!node_modules/**/*',
        '!Gruntfile.js'
      ]
    },
    coffee: {
      options: {
        bare: true
      },
      src: {
        expand: true,
        cwd: 'coffee/',
        src: [
          '**/*.coffee',
          '!**/_nu/**/*.coffee',
          '!node_modules/**/*'
        ],
        dest: 'js/',
        rename: function( destPath, srcPath ) {
          var dest;
          dest = destPath + srcPath.replace(/\.coffee$/,".js");
          return dest;
        },
        //ext: '.js',
        options: {
          sourceMap: false
        }
      }
    },
    jshint: {
      gruntfile: {
        options: {
          jshintrc: '.jshintrc'
        },
        src: 'Gruntfile.js'
      },
      js: {
        options: {
          jshintrc: '.jshintrc'
        },
        src: [
          'js/**/*.js'
        ]
      }
    },
    watch: {
      js: {
        files: [
          'Gruntfile.js',
          '**/*.coffee'
        ],
        tasks: ['clean', 'coffee', 'jshint']
      }
    }
  });

    // Load grunt-compass plugin
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-coffee');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.registerTask('default', [ 'build' ]);
  grunt.registerTask('build', [
    'clean',
    'coffee',
    'jshint'
  ]);

  grunt.registerTask( 'travis', [
    'build'
  ]);
};
