// Module dependencies.
var application_root = __dirname,
    express   = require('express'), //Web framework
    path      = require('path'); //Utilities for dealing with file paths

//Create server
var app = express();

// console.log( app.settings.env );

//parses request body and populates request.body
app.use( express.bodyParser() );

//checks request.body for HTTP method overrides
app.use( express.methodOverride() );

//perform route lookup based on url and HTTP method
app.use( app.router );

//Where to serve static content
app.use( express.static( path.join( application_root, 'public') ) );

//Show all errors in development
app.use( express.errorHandler({ dumpExceptions: true, showStack: true }));


//Start server
var port = process.env.PORT || 3001;
app.listen( port, function() {
  console.log( 'Express server listening on port %d in %s mode', port, app.settings.env );
});

// Routes
app.get( '/api', function( request, response) {
  return response.send('Library API is running');
});

// Exporting Express Application 
module.exports = app;