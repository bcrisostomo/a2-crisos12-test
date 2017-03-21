'use strict';

var express = require('express');
var bodyParser = require('body-parser');
var session = require('express-session');
var mongoose = require('mongoose');

var app = express();
app.use(express.static(__dirname + '/assets'));
app.use(express.static(__dirname + '/'));

//Set up default db connection and create error handlers
//var mongoDB = 'mongodb://127.0.0.1/bcrisostomoA2';
//var mongoDB = 'mongodb://localhost/tas';
//mongoose.connect(mongoDB);
//mongoose.connection.on('error', console.error.bind(console, 'MongoDB connection error:'));

//Database models
var Users = require('./models/User');

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

/*
============================================================================
Controller Functions
============================================================================
*/


/*========================
USERS
==========================
*/  
// The user name is stored in the session 
function getUsers(req, res) {
   
    //Query to find all the users that satisfy req.query
    //If req.query is empty, get all users    
    Users.find(req.query,function(err, result) {
        if (err) throw err;
        
        //res.render('index', {errors: {}, user: JSON.stringify(result)});
        
        //return a JSON object containing a field users which is an array of User Objects.
        return res.json({users: result});

                          
    }).sort({username: 1}); //Sort the query with username ascending

/* CAN DELETE LATER

   //If there is no query, push all users from db in the user array
   if (Object.keys(req.query).length === 0){
   //Get all users in an array under the key users (usernames ascending)
        Users.find({ "firstname": "Tom" 
            },

            //add the users to user array
            function (err, result) {
                if (err) throw err;
                //req.session.name = username;
                //Push it into the array if there is a result.length
                users.push(result);
                console.log("No query, but I got this from the query %s\n", result);
                console.log(users);
                });
    } else {

        
        Users.find({ $query:{username: req.query.username, firstname: req.query.firstname, 
        lastname: req.query.lastname}, sex: req.query.sex, age: req.query.age, $orderby: {username : 1} 
            },

            //add the users to user array
            function (err, result) {
                if (err) throw err;
                users.push(result);
                console.log("I got this from the query %s\n", result);
                console.log(users);
                });
    }
*/
}

//Doesnt go here for post request
// Add the username to the session
function setUsers(req, res) {
  console.log(req.body);
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


// Get the full list of messages
function getMessages(req, res) {
    res.send(JSON.stringify(msgs.slice(-req.query.number)));
}


/*
============================================================================
Routes Declaration
============================================================================
*/

app.get('/users', getUsers);

app.post('/users', setUsers);
app.get('/logout', logout);
app.get('/messages', getMessages);


app.listen(process.env.PORT || 3000);
console.log('Listening on port 3000');
