const express = require('express');
const router = express.Router();
const homeCtrl = require('../controllers/home.controller');



router.get('/', function(req, res, next){
    homeCtrl.loadPage(req, res);
});



module.exports = router;
