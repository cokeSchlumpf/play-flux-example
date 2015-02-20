// `main.js` is the file that sbt-web will use as an entry point
(function (requirejs) {
  'use strict';

  // -- RequireJS config --
  requirejs.config({
    // Packages = top-level folders; loads a contained file named 'main.js"
	packages: ['actions', 'components', 'constants', 'dispatcher', 'store', 'utils'],
    
    shim: {
      'jsRoutes': {
        deps: [],
        // it's not a RequireJS module, so we have to tell it what var is returned
        exports: 'jsRoutes'
      },
      'bootstrap': ['jquery']
    },
    paths: {
      'bootstrap': ['../lib/bootstrap/js/bootstrap'],
      'eventemitter': ['./lib/eventemitter'],
      'flux': ['./lib/flux'],
      'jquery': ['../lib/jquery/jquery'],
      'jsRoutes': ['/jsroutes'],
      'requirejs': ['../lib/requirejs/require'],
      'react': ['../lib/react/react']
    }
  });

  requirejs.onError = function (err) {
    console.log(err);
  };

  // Load the app. This is kept minimal so it doesn't need much updating.
  require( ['./websocket', 'components'], function () { } );
})(requirejs);