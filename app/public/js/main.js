(function() {
  'use strict';

  /**
   * Application Setup and Bootstrap
   *
   * @require
   *   detection : non-jquery id/class detection
   */
  define(['poly/detection'], function( detection ) {

    function setup() {
        var mods = [];
        
        if (!window.JSON) {      // << test for native JSON support.
            mods.push('poly/json3');  // << fill in with shim if missing.
        }
        
        require(mods, bootstrap);
    }

    function bootstrap() {
        var mods = [];

        if ( detection.has('#main') ) {
            console.log("We've go a MAIN div");
            mods.push('components/app'); 
        }

        require(mods);
    }

    setup();


  });
  
}());