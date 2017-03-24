var Reviews = require('../models/Reviews');

/*Get all users that match the query, and all if there is no query*/
function getReviews(req, res) {
   
    //Can only query with storename and/or category

    Reviews.find(req.query,function(err, result) {
            if (err) throw err;
          
          //res.render('index', {errors: {}, user: JSON.stringify(result)});
        
          //return a JSON object containing a field users which is an array of User Objects.
          return res.json({stores: result});

                            
        }).sort({__id: 1}); //Sort the query with username ascending

}


module.exports = {getReviews};