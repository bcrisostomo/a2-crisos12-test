const express = require('express');
const router = express.Router();
const userCtrl = require('../controllers/user.controller');


router.get('/', function(req, res, next){
    res.render("pages/user");
});

router.get('/', function(req, res, next){
    userCtrl.getUser(req, res);
});

router.post('/', function(req, res, next){  
    userCtrl.addUser(req, res);
});


router.delete('/', function(req, res, next){
	userCtrl.deleteUser(req, res);
});

//router.delete('/', userCtrl.deleteUser, userCtrl.deleteReviews);

router.put('/', function(req, res, next){
	userCtrl.updateUser(req, res);
});


module.exports = router;



