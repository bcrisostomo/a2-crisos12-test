var Users = require('../models/User');
var Reviews = require('../models/Reviews');

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
        
        if (!req.body.username){ //If username is not provided return 403 status
        
            res.statusCode = 403;
            return res.json({ error: 'Invalid: No username specified' });

        } else { //Check if it already exists, if yes, error, if not, add it
         
             Users.findOne({"username": req.body.username},
                  function(err, result) {
                    
                        if(err) {
                          console.log(err);
                        }
                      
                        if(result != null){
                           res.statusCode = 403;
                           return res.json({ error: 'Invalid: Username already exists!' });
                        } else {


                            var user = new Users(req.body, {versionKey: false});
                            //console.log(req.body);
                            user.save(function(err, users) {
                            if(err) {
                              console.log(err);
                            }

                            res.statusCode = 200;
                            return res.json(user);
                            });

                            //Check if the user is added -- testing purposes
                            /*Users.find(function(err, users) {
                              if(err) {
                              console.log("err")
                              }
                              
                         });*/
                      }
                 });
        }
}




/*Delete the user with userid as well as all of their reviews*/
function deleteUser(req, res) {
  //Check if the id is valid and exists in db
   Users.find({"_id": req.query.id},

        function(err, result) {
            if (err){
              console.log(err);

            } 
            
            //If the user exists, delete the user and his/her reviews
            if(result != null){
                //Remove the user from the db
                Users.remove({"_id": req.query.id}, function(err, result){
                      res.json({message: 'Accounts Deleted!'});
                });

                //Remove all the users reviews
                Reviews.remove({"userID": req.query.id}, function(err, result){
                      //res.json({message: 'Reviews Deleted!'});
                });            
                
               
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
                      return res.json(user);
                    });



               //console.log("Updated %s\n", user);
            } else { //return 404 status if userid does not exist
              res.statusCode = 404;              
              return res.json({ error: 'Invalid: User does not exist: Cannot update' });
            }
    });

  }





module.exports = {getUser, deleteUser, addUser, updateUser};
