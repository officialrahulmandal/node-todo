// set up ======================================================================
// main server file with all those required configuration
//Express 3.x is a light-weight web application framework to help organize your web application into an MVC architecture on the server side. You can use a variety of choices for your templating language (like EJS, Jade, and Dust.js).
var express = require('express');
var app = express(); 						// create our app w/ express
// We use a database like MongoDB with Mongoose (for modeling) to provide a backend for your Node.js application. Express.js basically helps you manage everything, from routes, to handling requests and views.
var mongoose = require('mongoose'); 				// mongoose for mongodb
var port = process.env.PORT || 8080; 				// set the port
var database = require('./config/database'); 			// load the database config
// morgan is a HTTP request logger middleware for node.js . so that we can can maintain a log of our project.
var morgan = require('morgan');    // importing morgan library
//body parser is used to parse incoming request bodies in a middleware before your handlers, available under the req.body property.
var bodyParser = require('body-parser');  // using body-parser library to extract information from body
var methodOverride = require('method-override'); // importing method-overide module

// configuration ===============================================================
mongoose.connect(database.remoteUrl); 	// Connect to local MongoDB instance. A remoteUrl is also available (modulus.io)

app.use(express.static('./public')); 		// set the static files location /public/img will be /img for users
app.use(morgan('dev')); // log every request to the console
app.use(bodyParser.urlencoded({'extended': 'true'})); // parse application/x-www-form-urlencoded
app.use(bodyParser.json()); // parse application/json
app.use(bodyParser.json({type: 'application/vnd.api+json'})); // parse application/vnd.api+json as json
app.use(methodOverride('X-HTTP-Method-Override')); // override with the X-HTTP-Method-Override header in the request


// routes ======================================================================
require('./app/routes.js')(app);

// listen (start app with node server.js) ======================================
app.listen(port);
// printing the port over the console where server is listening to
console.log("App listening on port " + port);
