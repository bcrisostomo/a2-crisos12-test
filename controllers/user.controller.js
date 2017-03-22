var Users = require('../models/User');

function getUser(req, res) {
   
    //If they provided a query which does not include username and id, 
    if (!req.query.username && !req.query.id){
        
        //do we have to return a status?
        return res.json({ error: 'Invalid: Did not get username or id' });
        

    } else {  //If not, have to check if user id exists (return 404 status if not)
        
        //console.log("Got username: %s or user_id: %s\n", req.query.username, req.query.id);

        //If user provided eiher username or id, check if it exists in the db   
        if (!req.query.username || !req.query.id){    
            Users.findOne({$or:[{"username": req.query.username}, {"_id":req.query.id}]},

              function(err, result) {
                if (err) throw err;
                
                //check if the username or id exists, if not -- set statuscode to 404
                if(result){
                   //console.log("1" + result);
                   return res.json(result);
                }else{
                  res.statusCode = 404;
                  return res.json({ error: 'Invalid: Username or id does not exist' });
                }

            }).sort({username: 1}); 

        
        } else { //User provided both username and id, check if both exist in the same user
            
            Users.findOne({ $and:[{"username": req.query.username},{"_id":req.query.id}]},

              function(err, result) {
                  if (err) throw err;
                
                  if(result){
                     //console.log("2" + result);
                     return res.json(result);
                  } else {
                    res.statusCode = 404;
                    return res.json({ error: 'Invalid: Username and id does not exist' });
                  }
              }).sort({username: 1});

       }
    }

}

/*Add the user into the db if valid*/
function addUser(req, res) {
    
    //Return 403 status if username provided exists or is not provided
    if (!req.body.username){ //If username is not provided return 403 status
        res.statusCode = 403;
        return res.json({ error: 'Invalid: No username specified' });

    } else { //Check if it already exists, if yes, error, if not, add it

      Users.findOne({"username": req.body.username},
          function(err, result) {
                  if (err) throw err;
                
                  if(result){
                     res.statusCode = 403;
                     return res.json({ error: 'Invalid: Username already exists!' });
                  } else {
                    //Add the user into the db and return status code 200 and the new user
                    var user = new Users();
                    user.username = req.body.username,
                    user.firstname = req.body.firstname,
                    user.lastname = req.body.lastname,
                    user.sex = req.body.sex,
                    user.age = req.body.age
                    user.save(function(err) {
                        if (err) throw err;
                        res.statusCode = 200;
                        return res.json(user);
                    });


                  }
        });

      
    }
    
  
}

/*Delete the user with userid as well as all of their reviews*/
function deleteUser(req, res) {
  
  //Check if the id is valid and exists in db
   Users.findOne({"_id":req.query.id},

        function(err, result) {
            if (err) throw err;
          
            if(result){
                //Remove the user from the db
                Users.remove({"_id": req.query.id}, {justOne: true});
                //Remove all the users reviews
                Reviews.remove({"userID": req.query.id});
               return res.json("Deleted user %s\n", result);
            } else { //return 404 status if userid does not exist
              res.statusCode = 404;
              return res.json({ error: 'Invalid: User does not exist' });
            }
    });
    
   

 

}

function updateUser(req, res){
    Users.findOne({"_id":req.query.id},

        function(err, user) {
            if (err) throw err;
          
            if(user){
                //Note: Can't change username!
                
                //Check if they gave a change for each parameter, change the value accordingly
                if (typeof req.body.firstname != "undefined"){
                    user.firstname = req.body.firstname;
                 }
                
                if (typeof req.body.lastname != "undefined"){
                    user.lastname = req.body.lastname;
                }
                
                if (typeof req.body.sex != "undefined"){
                    user.sex = req.body.sex;
                }

                if (typeof req.body.age != "undefined"){
                    user.age = req.body.age;
                }

                //Save the user into the database
                user.save(function(err, user){
                      if (err) throw err;
                      res.statusCode = 200;
                      return res.json("Updated user to %s\n", user);
                    });



               return res.json("Deleted user %s\n", result);
            } else { //return 404 status if userid does not exist
              res.statusCode = 404;              
              return res.json({ error: 'Invalid: User does not exist: Cannot update' });
            }
    });

  }





module.exports = {getUser, deleteUser, addUser, updateUser};
