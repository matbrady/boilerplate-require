module.exports = function( grunt ) {

	grunt.initConfig({

		pkg: grunt.file.readJSON('package.json'),

		config: {
			prod: {
				options: {
					variables: {
						"dist_dir": "dist"
					}
				}
			}
		},

		requirejs: {
			compile: {
				options: {
					name: "main",
					baseUrl: "js",
					paths: {
						"poly": "polyfills"
					},
					wrap: true,
					mainConfigFile: "js/main.js",
					out: "<%= grunt.config.get('dist_dir') %>/js/main.js"
				}
			}
		},

		// wipes the dist 
		clean: ["dist"],

		copy: {
			dist: {
				files: [
					{ 
						expand: true,
						src: ['index.html', 'css/*', 'js/lib/require.js'], 
						dest: '<%= grunt.config.get("dist_dir") %>'
					}
				]
			}
		}

	});
	
	grunt.loadNpmTasks('grunt-config');
	grunt.loadNpmTasks("grunt-contrib-requirejs");
	grunt.loadNpmTasks("grunt-contrib");
	grunt.loadNpmTasks("grunt-contrib-clean");
	grunt.loadNpmTasks("grunt-contrib-copy");

	grunt.registerTask("default", []);

	// grunt.registerTask("build", [ "clean", "requirejs", "copy" ]);
	grunt.registerTask("destroy", ["clean"] );

	grunt.registerTask("build", [ "config:prod", "clean", "requirejs", "copy" ]);
};