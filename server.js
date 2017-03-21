var express = require('express');
var bodyParser = require('body-parser');
var session = require('express-session');
var mongoose = require('mongoose');

var app = express();
app.use(express.static(__dirname + '/assets'));
app.use(express.static(__dirname + '/'));

//Set up default db connection and create error handlers
var mongoDB = 'mongodb://127.0.0.1/bcrisostomoA2';
mongoose.connect(mongoDB);
mongoose.connection.on('error', console.error.bind(console, 'MongoDB connection error:'));

//Database models
var Users = require('./models/User');

// Serve directory for css/js/images
app.use(express.static(__dirname + '/assets'));
app.use(express.static(__dirname + '/'));

// Set views path, template engine, and default layout
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

/*
============================================================================
Controller Functions
============================================================================
*/
// An array to store chat messages.  We will only store messages
// as long as the server is running.
var msgs = [];

// The user name is stored in the session 
function getName(req, res) {
  if (req.session.name) {
    return res.json({ name: req.session.name });
  }
  else {
    return res.json({ name: '' });
  }
}

// Add the username to the session
function setName(req, res) {
  if(!req.body.hasOwnProperty('name')) {
    res.statusCode = 400;
    return res.json({ error: 'Invalid message' });
  }
  else {
      req.session.name = req.body.name;
      console.log(req.session);
    return res.json({ name: req.body.name });
  }
}

// Set the username to empty by clearing the session
function logout(req, res) {
  console.log('logging out ' + req.session.name);
  req.session.destroy(function(err) {
    if (!err) {
      return res.json({});
    }
  })
}

// Get a message from a user
function addMessage(req, res) {
    // We find the message using the "text" key in the JSON object
    var msg = req.body.text;
    console.log("addmsg:" + req.body.text + " " + Date() + " " +req.session.name);
    msgs.push(req.body.text + " " + Date() + " " + req.session.name);
    res.send('Success'); 
}

// Get the full list of messages
function getMessages(req, res) {
    res.send(JSON.stringify(msgs.slice(-req.query.number)));
}


/*
============================================================================
Routes Declaration
============================================================================
*/

app.get('/name', getName);
app.post('/name', setName);
app.get('/logout', logout);
app.post('/addmsg', addMessage);
app.get('/messages', getMessages);


app.listen(process.env.PORT || 3000);
console.log('Listening on port 3000');
