(function() {

	// Name libraries / plugins
	var config = {

		/** 
		 * DEVELOPMENT 
		 *
		 * The below lines should be commented before pushing to production
		 * - enforceDefine : causes error when modules are loaded that don't
		 *     use a define method. ie non AMD compliant libraries 
		 * - waitSeconds : Timeout for loading scripts
		 */ 

		// enforceDefine: true,

		// waitSeconds: 200,

		
		/** 
		 * PRODUCTION 
		 */ 
		paths: {
			"poly": "polyfills",
			// "backbone": "lib/backbone",
			// "jquery": "lib/jquery",
			// "raphael": "lib/raphael",
			// "require": "lib/require",
			// "underscore": "lib/underscore",
			// "usMap": "lib/usMap"
		}

	};


	// Search global for a "REQUIRE_NOCACHE" flag to enable cache-busting:
	if (typeof REQUIRE_NOCACHE != 'undefined' && REQUIRE_NOCACHE) {
		config.urlArgs = "bust="+(new Date()).getTime();
	}

	// Predefine Require setup, or configure existing library:
	if (typeof require == 'undefined') {
		require = config;
	} else if (typeof requirejs == 'function') {
		requirejs.config(config);
	}

}());