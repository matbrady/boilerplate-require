/**
 * RequireJS Configuration
 *
 * Contains configuration controls for both development 
 * and production 
 */
(function() {

  // Sets Global NoCache 
  REQUIRE_NOCACHE = window.REQUIRE_NOCACHE || false;

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
    enforceDefine: true,

    waitSeconds: 200,
    
    /** 
     * PRODUCTION 
     */ 
    urlArgs: !!REQUIRE_NOCACHE ? "bust="+(new Date()).getTime() : '',

    paths: {
      "poly": "polyfills"
      // "backbone": "lib/backbone",
      // "jquery": "lib/jquery",
      // "raphael": "lib/raphael",
      // "require": "lib/require",
      // "underscore": "lib/underscore",
      // "usMap": "lib/usMap"
    }

  };

  // Predefine Require setup, or configure existing library:
  if (typeof require == 'undefined') {
    require = config;
  } 
  else if (typeof requirejs == 'function') {
    requirejs.config(config);
  }

  /* End RequireJS Configuration */

}());