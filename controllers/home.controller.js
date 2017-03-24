function loadHome(req, res) {
   
    //Can only query with storename and/or category

    res.render("index");

}


module.exports = {loadHome};