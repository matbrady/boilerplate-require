module.exports = function( grunt ) {

  // Load Grunt tasks declared in the package.json file
  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

  grunt.initConfig({

    pkg: grunt.file.readJSON('package.json'),

    config: {

        app: 'app/public',
        dist: {
            debug: 'dist/debug',
            release: 'dist/release'
        },
        port: 3000
    },

    // VALIDATION
    // Run the application Javascript through JSHint with the defaults.
    jshint: {
      files: ['<%= config.app %>/js/**/*.js'],
      options: {
          ignores: [
            '<%= config.app %>/js/polyfills/*',
            '<%= config.app %>/js/vendor/*',
            '<%= config.app %>/js/lib/*'
          ]
      }
    },

    requirejs: {
        release: {
            options: {
                name: 'main',
                baseUrl: 'dist/js',
                mainConfigFile: 'dist/js/config.js',
                // optimize: 'none',
                // include: [
                //   'components/app'
                // ],
                findNestedDependencies: true,
                paths: {
                    'poly': 'polyfills'
                },
                out: 'dist/js/main.js' || 'dist/js/<%= pkg.name %>.js'
            }
        }
    },

    uglify: {
      my_target: {
        files: {
          'dist/**/*.min.js': ['dist/js/**/*.js']
        }
      }
    },

    useminPrepare: {
        html: ['dist/index.html']
    },

    usemin: {
        html: ['dist/index.html']
    },

    clean: {
        release: {
            src: ['dist']
        }
    },

    copy: {
      release: {
        expand: true,
        src: ['**/*'],
        cwd: '<%= config.app %>',
        dest: 'dist/'
      },
      rails: {}
    },

    // grunt-express will serve the files from the folders listed in `bases`
    // on specified `port` and `hostname`
    express: {
      all: {
        options: {
          port: '<%= config.port %>',
          hostname: "0.0.0.0",
          bases: ['app/public'],
          server: 'app/server.js',
          livereload: true
        }
      }
    },
    
    // grunt-open will open your browser at the project's URL
    open: {
      all: {
        // Gets the port from the connect configuration
        path: 'http://localhost:<%= express.all.options.port%>',
        app: 'Google Chrome'
      }
    },

    sass: {
      dev: {
        src: ['<%= config.app %>/styles/*.scss'],
        dest: '<%= config.app %>/styles/main.css'
      }
    },

    watch: {
      livereload: {
        files: ['<%= config.app %>/style/main.css'],
        options: {
          livereload: false
        }
      },

      sass: {
        files: ['<%= config.app %>/styles/**/*.scss'],
        tasks: ['sass']
      }
    }
  }); 


  // Registered Tasks =========================================>
  grunt.registerTask('default', [
      'jslint'
  ]);

  // SERVERS

  /** Server - DEV
   */
  grunt.registerTask('server', [
    'express',
    'open',
    'watch'
  ]); 

  // BUILDS

  /** Build - Standard
   * Creates a standard build with no influence from any BE
   * asset pipeline
   * - 'clean': clears all content from the config.dist.??? directory
   * - 'jshint': lints js before creating dist build
   * - 'copy:release':
   * - 'userminPrepare': parses the index file for build comments
   * - 'usemin': 
   *      'index.html': replace script tag with optimized scripts
   *                    removes cache busting reference
   * - 'requiresjs': // BUG?! Forced to call requirejs again because the output file is not being generated
   */
  grunt.registerTask('build', [
    'clean',
    'jshint',
    'copy:release',
    'useminPrepare',
    'usemin', 
    'requirejs:release',
    'uglify'
  ]);
};