var Stores = require('../models/Store');

/*Get all users that match the query, and all if there is no query*/
function getStores(req, res) {
   
    //Can only query with storename and/or category
    if (!req.query.address && !req.query.id){ //Might not need to check this
  
        Stores.find(req.query,function(err, result) {
            if (err) throw err;
          
          //res.render('index', {errors: {}, user: JSON.stringify(result)});
        
          //return a JSON object containing a field users which is an array of User Objects.
            return res.json({stores: result});

                            
        }).sort({__id: 1}); //Sort the query with username ascending

    } else {

       return res.json({ error: 'Invalid: Gave an address or id' });
    }

}


module.exports = {getStores};