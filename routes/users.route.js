const express = require('express');
const router = express.Router();
const usersCtrl = require('../controllers/users.controller');



router.get('/', function(req, res, next){
    usersCtrl.getUsers(req, res);
});



module.exports = router;