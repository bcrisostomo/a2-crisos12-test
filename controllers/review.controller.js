var Users = require('../models/User');
var Reviews = require('../models/Reviews');

function getReview(req, res) {
   
    //If they provided a query which does not include any of the required fields
    if (req.query.id){

         Reviews.findOne({$or:[{"_id": req.query.id}, {"storeID":req.query.storeid}, {"userID":req.query.userid}]},

              function(err, result) {
                if (err) throw err;
                
                //check if the username or id exists, if not -- set statuscode to 404
                if(result){
                   //console.log("1" + result);
                   return res.json(result);
                }else{
                  res.statusCode = 404;
                  return res.json({ error: 'Invalid: userID, storeID, or id does not exist' });
                }

            });
    
    } else if (req.query.storeid){

          Reviews.find({$or:[{"_id": req.query.id}, {"storeID":req.query.storeid}, {"userID":req.query.userid}]},
       
              function(err, result) {
                if (err) throw err;
        
              //return a JSON object containing a field users which is an array of User Objects.
              return res.json({reviews: result});

                            
        }).sort({rating: 1});//, id: 1});

    } else if (req.query.userid){

         Reviews.find({$or:[{"_id": req.query.id}, {"storeID":req.query.storeid}, {"userID":req.query.userid}]},
       
              function(err, result) {
                if (err) throw err;
        
              //return a JSON object containing a field users which is an array of User Objects.
              return res.json({reviews: result});

                            
        }).sort({rating: 1});//,_id: 1});


    } else {

        //do we have to return a status?
        return res.json({ error: 'Invalid: Did not get store or userid or storeid'});




    } 


}

/*Add the review into the db if valid*/
function addReview(req, res) {
        
        //If userId, storeId, and/or rating was not provided, send 403 status code
        if (!req.body.userID || !req.body.storeID || !req.body.rating){ 
        
            res.statusCode = 403;
            return res.json({ error: 'Invalid: userID and/or storeID and/or rating missing' });

        } else { 
             
            //If rating is not between 0 or 10, send 403 status
            if (req.body.rating > 10 || req.body.rating < 0){
               res.statusCode = 403;
               return res.json({error: 'Rating is not between 0 or 10'});
            }

            //Check if a combination of storeID and userID review already exists -- send 403 status if yes
            Reviews.findOne({$and:[{"storeID": req.body.storeID},{"userID":req.body.userID}]},
                function(err, result) {
                  
                    if(err) {
                      console.log(err);
                    }

                    //console.log("Result:" +result);
                    if(result != null){
                       res.statusCode = 403;
                       return res.json({ error: 'Invalid: Combination of userID and storeID already exists!' });
                    } else {

                        //Create and save the new review
                        var review = new Reviews(req.body, {versionKey: false});
                       
                        review.save(function(err, review) {
                        if(err) {
                          console.log(err);
                        }

                        res.statusCode = 200;
                        return res.json(review);
                        });

                        //Check if the review is added -- testing purposes
                        /*Reviews.find(function(err, review) {
                          if(err) {
                          console.log("err")
                          }
                          
                     });*/
                    }
                 });
        }
}




/*Delete the review with id specified*/
function deleteReview(req, res) {
  //Check if the id is valid and exists in db
  
      //If they provided a query which does not include any of the required fields
    if (req.query.id){

        Reviews.findOne({"_id": req.query.id},

            function(err, result) {
                if (err) throw err;
                //console.log(result);
                //If the user exists, delete the user and his/her reviews
                if(result){
                    //Remove the user from the db
                    Reviews.remove({"_id": req.query.id}, function(err, result){
                          res.json({message: 'Review Deleted!'});
                    });  
                    
                   
                } else { //return 404 status if userid does not exist
                    res.statusCode = 404;
                    return res.json({ error: 'Invalid: Id does not exist' });
                }
            });    
        
    } else if (req.query.storeid){

          Reviews.findOne({"storeID":req.query.storeid},
       
              function(err, result) {
                if (err) throw err;
                //console.log(result);
                //If the user exists, delete the user and his/her reviews
                if(result){
                    //Remove the user from the db
                    Reviews.remove({"storeID": req.query.storeid}, function(err, result){
                          res.json({message: 'Store Reviews Deleted!'});
                    });  
                    
                   
                } else { //return 404 status if userid does not exist
                    res.statusCode = 404;
                    return res.json({ error: 'Invalid: Store does not have a review' });
                }
            });    


    } else if (req.query.userid){

         Reviews.findOne({"userID":req.query.userid},
       
              function(err, result) {
                if (err) throw err;
                  
                //console.log(result);
                //If the user exists, delete the user and his/her reviews
                if(result){
                    //Remove the user from the db
                    Reviews.remove({"userID": req.query.userid}, function(err, result){
                          res.json({message: 'User Reviews Deleted!'});
                    });  
                    
                   
                } else { //return 404 status if userid does not exist
                    res.statusCode = 404;
                    return res.json({ error: 'Invalid: User does not exist' });
                }
            }); 


    } else {

        //do we have to return a status?
        return res.json({ error: 'Invalid: Did not get store or userid or storeid'});

    } 


}   



/*Update the user with specified id*/
function updateReview(req, res){
    
    Reviews.findOne({"_id":req.query.id},

        function(err, review) {
            if (err) throw err;
          
            if(review){
                //Note: Can't change storeID or userID!
                
                //Check if they gave a change for each parameter, change the value accordingly
                if (typeof req.body.comment != "undefined"){
                    review.comment = req.body.comment;
                 }                
               
                if (typeof req.body.rating != "undefined"){
                    review.rating = req.body.rating;
                }

                //Save the user into the database
                review.save(function(err, review){
                      if (err) throw err;
                      res.statusCode = 200;
                      return res.json(review);
                    });



               //console.log("Updated %s\n", user);
            } else { //return 404 status if id does not exist
              res.statusCode = 404;              
              return res.json({ error: 'Invalid: Review does not exist: Cannot update' });
            }
    });

}





module.exports = {getReview, deleteReview, addReview, updateReview};
