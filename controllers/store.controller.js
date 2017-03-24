var Stores = require('../models/Store');
var Reviews = require('../models/Reviews');

/*Get store based on id specified*/
function getStore(req, res) {
   
    
        //If user provided id, check if it exists in the db   
        if (!req.query.id){
        		
        	return res.json({ error: 'Invalid: Id not specified' });    
                     
        } else { //User provided id, get it from db, 404 if it does not exist
            
            Stores.findOne({"_id":req.query.id},

              function(err, result) {
                  if (err) throw err;
                
                  if(result){
                     //console.log(result);
                     return res.json(result);
                  } else {
                    res.statusCode = 404;
                    return res.json({ error: 'Invalid: Id does not exist' });
                  }
              });
       }
}


/*Add the store into the db if valid*/
function addStore(req, res) {
        
        //If storename is not provided or is blank return 403 status
        if (!req.body.storename || req.body.storename == ""){ 

            res.statusCode = 403;
            return res.json({ error: 'Invalid: No storename specified' });

        } else { //Make a new store
         
        
            var store = new Stores(req.body, {versionKey: false});
            //console.log(req.body);
            store.save(function(err, users) {
            if(err) throw err;

            res.statusCode = 200;
            return res.json(store);
            });

            //Check if the user is added -- testing purposes
            /*Stores.find(function(err, users) {
              if(err) {
              console.log("err")
              }
              
         });*/
     }
}
                  


/*Delete the store with storeid as well as all of their reviews*/
function deleteStore(req, res) {
  //Check if the id is valid and exists in db
   
   Stores.findOne({"_id": req.query.id},

        function(err, result) {
            if (err){
              console.log(err);

            } 
            //console.log(result);
            //If the user exists, delete the user and his/her reviews
            if(result){
                //Remove the user from the db
                Stores.remove({"_id": req.query.id}, function(err, result){
                      res.status(200);
                      res.json({message: 'Store and Reviews Deleted!'});
                });

                //Remove all the stores reviews
                Reviews.remove({"storeID": req.query.id}, function(err, result){
                      //res.json({message: 'Reviews Deleted!'});
                });

                //res.json({message: 'Store and Reviews Deleted!'});            
                
               
            } else { //return 404 status if userid does not exist
                res.statusCode = 404;
                return res.json({ error: 'Invalid: User does not exist' });
            }
        });    

}


/*Update the stores with specified id*/
function updateStore(req, res){
    
    Stores.findOne({"_id":req.query.id},

        function(err, store) {
            if (err) throw err;
          
            if(store){
                //Note: Can't change username!
                
                //Check if they gave a change for each parameter, change the value accordingly
                if (typeof req.body.storename != "undefined"){
                    store.storename = req.body.storename;
                 }
                
                if (typeof req.body.category != "undefined"){
                    store.category = req.body.category;
                }
                
                if (typeof req.body.address != "undefined"){
                    store.address = req.body.address;
                }

                //Save the store into the database
                store.save(function(err, store){
                      if (err) throw err;
                      res.statusCode = 200;
                      return res.json(store);
                    });



               //console.log("Updated %s\n", user);
            } else { //return 404 status if storeid does not exist
              res.statusCode = 404;              
              return res.json({ error: 'Invalid: Store does not exist: Cannot update' });
            }
    });

  }





module.exports = {getStore, addStore, deleteStore, updateStore};