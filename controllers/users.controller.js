var Users = require('../models/User');

/*Get all users that match the query, and all if there is no query*/
function getUsers(req, res) {
   
    //If they provided a query which does not include username and id, query normally 
    if (!req.query.username && !req.query.id){ //Might not need to check this
  
        Users.find(req.query,function(err, result) {
            if (err) throw err;
          
          //res.render('index', {errors: {}, user: JSON.stringify(result)});
        
          //return a JSON object containing a field users which is an array of User Objects.
            return res.json({users: result});

                            
        }).sort({username: 1}); //Sort the query with username ascending

    } else {

       return res.json({ error: 'Invalid: Gave a username or id' });
    }

}


module.exports = {getUsers};