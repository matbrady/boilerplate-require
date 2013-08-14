module.exports = function( grunt ) {

  grunt.initConfig({

    pkg: grunt.file.readJSON('package.json'),

    config: {

        app: 'app/public/',
        dist: {
            debug: 'dist/debug',
            release: 'dist/release'
        },
        port: 3000
    },

    // VALIDATION
    // Run the application Javascript through JSHint with the defaults.
    jshint: {
      files: ['<%= config.app%>/js/**/*.js'],
      options: {
          ignores: [
            '<%= config.app%>js/polyfills/*',
            '<%= config.app%>js/vendor/*',
            '<%= config.app%>js/lib/*'
          ]
      }
    },

    requirejs: {
        release: {
            options: {
                name: 'main',
                baseUrl: '<%= config.app %>js/',
                mainConfigFile: '<%= config.app %>js/config.js',
                // insertRequire: ['main'],
                paths: {
                    'poly': 'polyfills'
                },
                out: 'dist/js/<%= pkg.name %>.js'
            }
        }
    },

    useminPrepare: {
        dev: {
          html: ['app/public/index.html']
        },
        build: {
          html: ['dist/index.html']
        }
    },

    usemin: {
        dev: {
          html: ['app/public/index.html']
        },
        build: {
          html: ['dist/index.html']
        }
    },

    clean: {
        release: {
            src: ['dist']
        }
    },

    copy: {
      release: {
        expand: true,
        src: ['**/*', '!js/**', 'js/lib/**'],
        cwd: '<%= config.app %>',
        dest: 'dist/'
      },
      rails: {
      }
    },

    express: {
        dev: {
            options: {
                script: 'app/server.js'
                // background: false, // prevents server from closing
            }
        },
        prod: {
            options: {
                script: 'app/server.js',
                node_env: 'production'
            }
        }
    },

    open: {
        dev: {
            path: 'http://127.0.0.1:<%= config.port %>',
            app: 'Google Chrome'
        }
    },

    watch: {
        // scripts: {
        //  files: ['<%= config.app %>js/**/*.js'],
        //  tasks: ['jshint'],
        //  options: {
        //      livereload: true
        //  }
        // }
        express: {
            files: ['app/public/**'],
            tasks: ['express:dev'],
            options: {
                livereload: true,
                nospawn: true
            }
        }
    }
  });


  // NPM Tasks ================================================>
  // Confirmed
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-requirejs');
  grunt.loadNpmTasks('grunt-usemin');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-express-server');
  grunt.loadNpmTasks('grunt-contrib-sass');

  // Potential
  grunt.loadNpmTasks('grunt-open');


  // Registered Tasks =========================================>
  grunt.registerTask('default', [
      'jslint'
  ]);

  // SERVERS

  /** Server - DEV
   * 
   */
  grunt.registerTask('server', [
      'open',
      'express:dev',
      'watch'
  ]); 

  // BUILDS

  /** Build - Standard
   * Creates a standard build with no influence from any BE
   * asset pipeline
   * - 'clean': clears all content from the config.dist.??? directory
   * - 'copy:release':
   * - 'userminPrepare'   
   * - 'usemin'
   * - 'requiresjs': // BUG?! Forced to call requirejs again because the output file is not being generated
   */
  grunt.registerTask('build', [
      'clean', 
      'copy:release',
      'useminPrepare', 
      'usemin', 
      'requirejs'
  ]);

  /** Build - Rails   
   * Creates a build for easy integration into a Rails BE
   */
  grunt.registerTask('build:rails', [
      'copy:rails'
  ]);
};