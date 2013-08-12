module.exports = function( grunt ) {

	grunt.initConfig({

		config: {

			main: "public",
			dist: {
				debug: "dist/debug",
				release: "dist/release"
			}
		},


		// Run the application Javascript through JSHint with the defaults.
		jshint: {
      files: [
	      '<%= config.main%>/js/**/*.js',
      ],
      options: {
          ignores: [
          	'<%= config.main%>/js/polyfills/*',
          	'<%= config.main%>/js/vendor/*',
          	'<%= config.main%>/js/lib/*'
          ,]
      }
    },

    copy: {
      release: {
        src: '**',
        cwd: "public/",
        dest: 'dist/'
      },
    },
	});

	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-copy');
	// grunt.loadNpmTasks('grunt-contrib-clean');

	grunt.registerTask("default", [
		"jshint"
	]);

	grunt.registerTask("build", [
		"copy:release"
	])
};