module.exports = function( grunt ) {

	grunt.initConfig({
		requirejs: {
			compile: {
				options: {
					// baseUrl: "",
					mainConfigFile: "config.js",
					out: "deploy/js"
				}
			}
		}
	});
	
	grunt.loadNpmTasks("grunt-requirejs");
	grunt.registerTask("default", ["requirejs"]);
};