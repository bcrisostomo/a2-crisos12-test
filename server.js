'use strict';

var express = require('express');
var bodyParser = require('body-parser');
var session = require('express-session');
var mongoose = require('mongoose');
var routes = require('./routes/index.routes');

var app = express();
app.use(express.static(__dirname + '/assets'));
app.use(express.static(__dirname + '/'));

//Set up default db connection and create error handlers
var mongoDB = 'mongodb://localhost/ratingApp';
mongoose.connect(mongoDB);
mongoose.connection.on('error', console.error.bind(console, 'MongoDB connection error:'));

//Database models
var Users = require('./models/User');
var Reviews = require('./models/Reviews');

// Serve directory for css/js/images
app.use(express.static(__dirname + '/assets'));
app.use(express.static(__dirname + '/'));

// Set views path, template engine, and default layout
app.engine('.html', require('ejs').__express);
app.set('views', __dirname);
app.set('view engine', 'html');

// Set up to use a session
app.use(session({
  secret: 'super_secret',
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false }
}));

// The request body is received on GET or POST.
// A middleware that just simplifies things a bit.
app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
    extended: true
}));

// Definition of Routing of back-end.
app.use('/api', routes);



app.listen(process.env.PORT || 3000);
console.log('Listening on port 3000');
