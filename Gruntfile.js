module.exports = function( grunt ) {

	grunt.initConfig({

		pkg: grunt.file.readJSON('package.json'),

		// DEFAULT 
		requirejs: {
	    compile: {
	      options: {
	      	name: "main",
	        baseUrl: "js",
	        paths: {
	        	"poly": "polyfills"
	        },
	        mainConfigFile: "js/config.js",
	        out: "optimized.js"
	      }
	    }
	  }

	});
	
	grunt.loadNpmTasks("grunt-requirejs");
	grunt.registerTask("default", ["requirejs"]);
};